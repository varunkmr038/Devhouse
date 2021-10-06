import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
  message: {
    backgroundColor: "#ff5722",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    display: "inline-block",
  },
});

function ChatBox() {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.header}>
        <Grid container>
          <Grid item className="mx-3">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom className="mt-1">
              Varun Kumar
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <List className={classes.messageArea}>
        <ListItem key="1">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText
                align="right"
                primary={
                  <div
                    className={classes.message}
                    style={{ backgroundColor: "#439ba0" }}
                  >
                    Hey man whatss uop
                  </div>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                align="right"
                secondary="Yesterday 12:35 Pm"
              ></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="2">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText
                align="left"
                primary={
                  <span className={classes.message}>Hey man whatss uop</span>
                }
              ></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="left" secondary="Yesterday 12:35 Pm" />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText
                align="right"
                primary={
                  <div
                    className={classes.message}
                    style={{ backgroundColor: "#439ba0" }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum placeat rerum autem earum repudiandae nam voluptates
                    exercitationem minima! Soluta qui vero quisquam facilis
                    provident, voluptates odit repudiandae molestias sit iusto
                    beatae molestiae ullam placeat blanditiis? Minus neque
                    adipisci sapiente perferendis? Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Ipsa quis iure quod tempore
                    labore doloremque perspiciatis mollitia amet nihil vero
                    architecto error soluta iste dolore voluptate totam,
                    reprehenderit aliquid itaque a nemo vitae facere odit
                    sapiente! Quas aliquid adipisci soluta?
                  </div>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      </List>
      <Divider />
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={11}>
          <TextField id="outlined-basic-email" label="Send Message" fullWidth />
        </Grid>
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add">
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}

export default ChatBox;
