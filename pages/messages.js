import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ChatList from "../components/Chats/ChatList";
import ChatBox from "../components/Chats/ChatBox";

const useStyles = makeStyles({
  chatSection: {
    width: "100%",
  },
  chatList: {
    borderRight: "1px solid #e0e0e0",
  },
});

function Messages() {
  const classes = useStyles();

  return (
    <>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item sm={3} xs={12} className={classes.chatList}>
          <ChatList />
        </Grid>
        <Grid item sm={9} xs={12}>
          <ChatBox />
        </Grid>
      </Grid>
    </>
  );
}

export default Messages;
