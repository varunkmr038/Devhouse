import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ChatList from "../components/Chats/ChatList";
import ChatBox from "../components/Chats/ChatBox";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Alert from "../components/Common/Alert";

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

  const [chats, setChats] = useState(chatsData);

  useEffect(() => {
    // when I open messages redirect me to first chat if there is
    if (chats.length > 0 && !router.query.message) {
      router.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
        shallow: true,
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.title = `Clubhouse | Messages`;
    }, 0);
  });

  return (
    <Grid container component={Paper} className={classes.chatSection}>
      <Grid item sm={3} xs={12} className={classes.chatList}>
        <ChatList chats={chats} setChats={setChats} />
      </Grid>

      <Grid item sm={9} xs={12}>
        {chats.length > 0 ? (
          <ChatBox />
        ) : (
          <Alert message="Search User and start Chatting 🙃" />
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
