import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Message from "./Message";
import Search from "./Search";
import MembersList from "./MembersList";

const useStyles = makeStyles({
  messageArea: {
    height: "60vh",
    overflowY: "auto",
  },
  header: {
    padding: "10px",
    backgroundColor: "#9c27b0",
    color: "white",
  },
});

function ChannelBox({
  bannerData,
  user,
  messages,
  divRef,
  sendMsgChannel,
  openChannelId,
}) {
  const classes = useStyles();
  const [text, setText] = useState("");

  return (
    <>
      <Paper className={classes.header}>
        <Grid container>
          <Grid item sm={4} xs={12}>
            <Typography variant="h6" gutterBottom className="mt-1">
              {bannerData.name}
            </Typography>
          </Grid>
          <Grid item sm={4} xs={12}>
            <MembersList members={bannerData.members} />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Search openChannelId={openChannelId} />
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
        <Grid item xs={10}>
          <TextField
            color="secondary"
            id="outlined-basic-email"
            label="Send Message"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
          />
        </Grid>
        <Grid item xs={2} align="right">
          <Fab
            color="secondary"
            aria-label="add"
            onClick={(e) => {
              e.preventDefault();
              if (text === "") return;
              sendMsgChannel(text);
              setText("");
            }}
            className="mx-2"
          >
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}

export default ChannelBox;
