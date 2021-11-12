import React, { useEffect, useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ChatList from "../components/Channels/ChatList";
import ChatBox from "../components/Channels/ChatBox";
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
  connectedUsersListener,
  messagesLoadedListener,
  msgSentListener,
  newMsgReceivedListener,
  noChatFoundListener,
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

function Channels() {
  const classes = useStyles();
  const router = useRouter();

  // page title
  useEffect(() => {
    setTimeout(() => {
      document.title = `Devhouse | Channels`;
    }, 0);
  });

  return (
    <Grid container component={Paper} className={classes.chatSection}>
      <Grid item sm={3} xs={12} className={classes.chatList}>
        <ChatList
        // chats={chats}
        // setChats={setChats}
        />
      </Grid>

      <Grid item sm={9} xs={12}>
        {router.query.channel ? (
          <ChatBox
          // bannerData={bannerData}
          // user={user}
          // messages={messages}
          // divRef={divRef}
          // sendMsg={sendMsg}
          />
        ) : (
          <Alert message="No Channel Selected" />
        )}
      </Grid>
    </Grid>
  );
}

export default Channels;
