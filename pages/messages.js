import React, { useEffect, useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ChatList from "../components/Chats/ChatList";
import ChatBox from "../components/Chats/ChatBox";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import io from "socket.io-client";
import Alert from "../components/Common/Alert";
import { UserContext } from "../components/Layout/Layout";
import getUserInfo from "../utils/getUserInfo";
import newMsgSound from "../utils/newMsgSound";
import { toast } from "react-toastify";
import cookie from "js-cookie";

const scrollDivToBottom = (divRef) =>
  divRef.current !== null &&
  divRef.current.scrollIntoView({ behaviour: "smooth" });

const useStyles = makeStyles({
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  chatList: {
    borderRight: "1px solid #e0e0e0",
  },
});

function Messages({ chatsData, errorLoading }) {
  const classes = useStyles();
  const router = useRouter();

  const socket = useRef();
  const divRef = useRef();
  // This ref is for persisting the state of query string in url throughout re-renders.
  // This ref is the value of query string inside url
  const openChatId = useRef("");

  const { user } = useContext(UserContext);

  const [chats, setChats] = useState(chatsData);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [bannerData, setBannerData] = useState({ name: "", profilePicUrl: "" }); //chat header

  //  Mark the messages as read
  useEffect(() => {
    const messageRead = async () => {
      try {
        //  I have read all the notifications, So mark them as read in database
        await axios.post(
          `${baseUrl}/api/chats`,
          {},
          { headers: { Authorization: cookie.get("token") } }
        );
      } catch (error) {
        toast.error(error);
      }
    };
    messageRead();
  }, []);

  // Connecting the socket
  useEffect(() => {
    if (!socket.current) {
      // trigerred the connection event
      socket.current = io(baseUrl); // connecting with server
    }

    if (socket.current) {
      socket.current.emit("join", { userId: user._id });

      socket.current.on("connectedUsers", ({ users }) => {
        users.length > 0 && setConnectedUsers(users);
      });

      // when I open messages redirect me to first chat if there is
      if (chats.length > 0 && !router.query.message) {
        router.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
          shallow: true,
        });
      }
    }
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current.off();
      }
    };
  }, []);

  // Confirming msg is sent and receving the messages
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msgSent", ({ newMsg }) => {
        //  If we are on the chat whom we sent the msg
        if (newMsg.receiver === openChatId.current) {
          setMessages((prev) => [...prev, newMsg]);

          //  For most recent msg to appear in chatlist
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMsg.receiver
            );
            previousChat.lastMessage = newMsg.msg;
            previousChat.date = newMsg.date;

            return [...prev];
          });
        }
      });

      socket.current.on("newMsgReceived", async ({ newMsg }) => {
        // WHEN CHAT WITH SENDER IS CURRENTLY OPENED INSIDE YOUR BROWSER
        if (newMsg.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMsg]);

          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMsg.sender
            );
            previousChat.lastMessage = newMsg.msg;
            previousChat.date = newMsg.date;

            return [...prev];
          });
        }
        // chat is not open
        else {
          const ifPreviouslyMessaged =
            chats.filter((chat) => chat.messagesWith === newMsg.sender).length >
            0;

          if (ifPreviouslyMessaged) {
            setChats((prev) => {
              const previousChat = prev.find(
                (chat) => chat.messagesWith === newMsg.sender
              );
              previousChat.lastMessage = newMsg.msg;
              previousChat.date = newMsg.date;

              return [
                previousChat,
                ...prev.filter((chat) => chat.messagesWith !== newMsg.sender),
              ];
            });
          }

          //IF NO PREVIOUS CHAT WITH THE SENDER
          else {
            const { name, profilePicUrl } = await getUserInfo(newMsg.sender);
            const newChat = {
              messagesWith: newMsg.sender,
              name,
              profilePicUrl,
              lastMessage: newMsg.msg,
              date: newMsg.date,
            };
            setChats((prev) => [newChat, ...prev]);
          }
        }

        newMsgSound();
      });
    }
  }, []);

  // page title
  useEffect(() => {
    setTimeout(() => {
      document.title = `Clubhouse | Messages`;
    }, 0);
  });

  // LOAD MESSAGES
  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit("loadMessages", {
        userId: user._id,
        messagesWith: router.query.message,
      });

      socket.current.on("messagesLoaded", async ({ chat }) => {
        setMessages(chat.messages);
        setBannerData({
          name: chat.messagesWith.name,
          profilePicUrl: chat.messagesWith.profilePicUrl,
        });

        openChatId.current = chat.messagesWith._id; // saving curent message value in url
        divRef.current && scrollDivToBottom(divRef);
      });

      socket.current.on("noChatFound", async () => {
        const userInfo = await getUserInfo(router.query.message);

        if (!userInfo) {
          router.push("/messages");
          toast.error("No User Found");
          return;
        }

        const { name, profilePicUrl } = userInfo;

        setBannerData({ name, profilePicUrl });
        setMessages([]);

        openChatId.current = router.query.message;
      });
    };

    if (socket.current && router.query.message) loadMessages();
  }, [router.query.message]);

  //  scroll to bottom msg
  useEffect(() => {
    messages.length > 0 && scrollDivToBottom(divRef);
  }, [messages]);

  const sendMsg = (msg) => {
    if (socket.current) {
      socket.current.emit("sendNewMsg", {
        userId: user._id,
        msgSendToUserId: openChatId.current,
        msg,
      });
    }
  };

  return (
    <Grid container component={Paper} className={classes.chatSection}>
      <Grid item sm={3} xs={12} className={classes.chatList}>
        <ChatList
          chats={chats}
          setChats={setChats}
          connectedUsers={connectedUsers}
        />
      </Grid>

      <Grid item sm={9} xs={12}>
        {router.query.message ? (
          <ChatBox
            bannerData={bannerData}
            user={user}
            messages={messages}
            divRef={divRef}
            sendMsg={sendMsg}
          />
        ) : (
          <Alert message="No Chat Selected" />
        )}
      </Grid>
    </Grid>
  );
}

Messages.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/chats`, {
      headers: { Authorization: token },
    });

    return { chatsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Messages;
