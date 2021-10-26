import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Alert from "../components/Common/Alert";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import calculateTime from "../utils/calculateTime";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 860,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    wordSpacing: "3px",
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      color: "blue",
      textDecoration: "underline",
    },
  },
}));

function NotificationList({ notification }) {
  const classes = useStyles();

  return (
    <>
      <ListItem button className="mt-4">
        <ListItemAvatar>
          <Avatar
            alt={notification.user.name}
            src={notification.user.profilePicUrl}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body1" color="textPrimary">
              <Link href={`/profile/${notification.user.username}`}>
                <a className={classes.link}>{notification.user.name}</a>
              </Link>
              {notification.type === "newLike"
                ? `  Liked your Post`
                : notification.type === "newComment"
                ? `  Commented on your Post`
                : `  Started Following you`}
            </Typography>
          }
          secondary={calculateTime(notification.date)}
        />
      </ListItem>

      {notification.type !== "newFollower" &&
        notification.post && ( // Post should exist
          <Grid container className="mb-3">
            <Grid item sm={3} xs={12} style={{ paddingLeft: 10 }}>
              <Avatar
                variant="square"
                src={notification.post.picUrl}
                className="ms-5"
                style={{ width: "100px", height: "100px" }}
              />
            </Grid>

            {notification.type === "newComment" && ( // If it is comment notification then only im going to show comment
              <Grid item sm={9} xs={12}>
                <Typography variant="caption" color="textPrimary">
                  {notification.text}
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
    </>
  );
}

function Notifications({ notifications, errorLoading }) {
  const classes = useStyles();

  useEffect(() => {
    const notificationRead = async () => {
      try {
        //  I have read all the notifications, So mark them as read in database
        await axios.post(
          `${baseUrl}/api/notifications`,
          {},
          { headers: { Authorization: cookie.get("token") } }
        );
      } catch (error) {
        toast.error(error);
      }
    };

    notificationRead();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.title = `Devhouse | Notifications`;
    }, 0);
  });

  return (
    <>
      {notifications.length > 0 && !errorLoading ? (
        <List dense className={classes.root}>
          {notifications.map((notification, index) => (
            <NotificationList key={index} notification={notification} />
          ))}
        </List>
      ) : (
        <Alert message="No Notifications 🔔" />
      )}
    </>
  );
}

Notifications.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);

    //  Get the notifications of user
    const res = await axios.get(`${baseUrl}/api/notifications`, {
      headers: { Authorization: token },
    });

    return { notifications: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Notifications;
