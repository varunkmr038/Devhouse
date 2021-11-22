import React, { useEffect, useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ChannelList from "../components/Channels/ChannelList";
import ChannelBox from "../components/Channels/ChannelBox";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import io from "socket.io-client";
import Alert from "../components/Common/Alert";
import { UserContext } from "../components/Layout/Layout";
import { toast } from "react-toastify";
import cookie from "js-cookie";
import {
  channelMessagesLoadedListener,
  msgSentChannelListener,
  newMsgReceivedChannelListener,
} from "../utils/socketClient";

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

function Channels({ channelsData }) {
  const classes = useStyles();
  const router = useRouter();

  const { user } = useContext(UserContext);

  const socket = useRef();
  const divRef = useRef();
  const openChannelId = useRef("");

  const [channels, setChannels] = useState(channelsData);
  const [bannerData, setBannerData] = useState({
    name: "",
    members: [],
  });
  const [messages, setMessages] = useState([]);

  // page title
  useEffect(() => {
    setTimeout(() => {
      document.title = `Devhouse | Channels`;
    }, 0);
  });

  // Connecting the socket
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    socket.current.emit("join-channels");

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current.off();
      }
    };
  }, []);

  // LOAD MESSAGES
  useEffect(() => {
    openChannelId.current = router.query.channel;

    const loadMessages = () => {
      socket.current.emit("loadChannelMessages", {
        userId: user._id,
        channelId: openChannelId.current,
      });

      socket.current.on("channelMessagesLoaded", async ({ channel }) => {
        channelMessagesLoadedListener(
          channel,
          setMessages,
          setBannerData,
          divRef,
          scrollDivToBottom
        );
      });

      socket.current.on("noChannelFound", async () => {
        router.push("/channels");
        toast.error("No channel Found");
      });
    };

    if (socket.current && router.query.channel) loadMessages();
  }, [router.query.channel]);

  // Confirming msg is sent and receving the messages
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msgSentChannel", ({ newMsg }) =>
        msgSentChannelListener(newMsg, setMessages, setChannels, openChannelId)
      );

      socket.current.on(
        "newMsgReceivedChannel",
        async ({ newMsg, channelId }) =>
          newMsgReceivedChannelListener(
            newMsg,
            channelId,
            setMessages,
            setChannels,
            openChannelId
          )
      );
    }
  }, []);

  useEffect(() => {
    messages.length > 0 && scrollDivToBottom(divRef);
  }, [messages]);

  const sendMsgChannel = (msg) => {
    if (socket.current) {
      socket.current.emit("sendNewMsgChannel", {
        userId: user._id,
        channelId: openChannelId.current,
        msg,
      });
    }
  };

  return (
    <Grid container component={Paper} className={classes.chatSection}>
      <Grid item sm={3} xs={12} className={classes.chatList}>
        <ChannelList channels={channels} setChannels={setChannels} />
      </Grid>

      <Grid item sm={9} xs={12}>
        {router.query.channel ? (
          <ChannelBox
            bannerData={bannerData}
            user={user}
            messages={messages}
            divRef={divRef}
            sendMsgChannel={sendMsgChannel}
            openChannelId={openChannelId}
          />
        ) : (
          <Alert message="No Channel Selected" />
        )}
      </Grid>
    </Grid>
  );
}

Channels.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/channels`, {
      headers: { Authorization: token },
    });

    return { channelsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Channels;
