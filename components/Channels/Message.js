import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import calculateTime from "../../utils/calculateTime";
import Typography from "@material-ui/core/Typography";

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
  const ifYouSender = message.sender._id == user._id;

  React.useEffect(() => {
    console.log(
      calculateTime(message.date),
      typeof calculateTime(message.date)
    );
  }, []);

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
                {message.msg}
              </div>
            }
          />
        </Grid>
        <Grid item xs={12}>
          {ifYouSender ? (
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              align="right"
            >
              {calculateTime(message.date)}
            </Typography>
          ) : (
            <Typography variant="caption" display="block" gutterBottom>
              {message.sender.name} - {calculateTime(message.date)}
            </Typography>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Message;
