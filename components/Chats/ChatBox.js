import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Message from "./Message";

const useStyles = makeStyles({
  messageArea: {
    height: "60vh",
    overflowY: "auto",
  },
  header: {
    padding: "10px",
    backgroundColor: "#43a047",
    color: "white",
  },
});

function ChatBox({ bannerData, user, messages, divRef, sendMsg }) {
  const classes = useStyles();
  const [text, setText] = useState("");

  return (
    <>
      <Paper className={classes.header}>
        <Grid container>
          <Grid item className="mx-3">
            <Avatar alt={bannerData.name} src={bannerData.profilePicUrl} />
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom className="mt-1">
              {bannerData.name}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <List className={classes.messageArea}>
        {messages.length > 0 &&
          messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              user={user}
              divRef={divRef}
            />
          ))}
      </List>
      <Divider />

      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Send Message"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab
            color="primary"
            aria-label="add"
            onClick={(e) => {
              e.preventDefault();
              if (text === "") return;
              sendMsg(text);
              setText("");
            }}
          >
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}

export default ChatBox;
