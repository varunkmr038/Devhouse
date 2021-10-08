import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import calculateTime from "../../utils/calculateTime";

const useStyles = makeStyles({
  message: {
    padding: "10px",
    borderRadius: "10px",
    display: "inline-block",
  },
});

function Message({ message, user, divRef }) {
  const classes = useStyles();
  //  If you sends this message
  const ifYouSender = message.sender === user._id;

  return (
    <ListItem ref={divRef}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText
            align={ifYouSender ? "right" : "left"}
            primary={
              <div
                className={classes.message}
                style={{
                  backgroundColor: ifYouSender ? "rgb(187 238 189)" : "#43a047",
                  color: ifYouSender ? "black" : "white",
                }}
              >
                {message.msg}
              </div>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            align={ifYouSender ? "right" : "left"}
            secondary={calculateTime(message.date)}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Message;
