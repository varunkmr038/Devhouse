import React from "react";
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
  // const ifYouSender = 1 || message.sender === user._id;
  const ifYouSender = 1;

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
                  backgroundColor: ifYouSender ? "rgb(213 176 220)" : "#9c27b0",
                  color: ifYouSender ? "black" : "white",
                }}
              >
                Hello Brothers i have a project idea
              </div>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            align={ifYouSender ? "right" : "left"}
            secondary={
              ifYouSender ? "Today 9:08 AM" : "varunkmr038  -   Today 9:08 AM"
            }
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Message;
