import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import cookie from "js-cookie";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import Alert from "../Common/Alert";
import { followUser, unfollowUser } from "../../utils/profileActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    marginTop: 10,
  },
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "blue",
      textDecoration: "underline",
    },
  },
}));

export default function Followers({
  user,
  loggedUserFollowStats,
  setLoggedUserFollowStats,
  profileUserId,
}) {
  const classes = useStyles();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        // fetching followers from backend
        const res = await axios.get(
          `${baseUrl}/api/profile/followers/${profileUserId}`,
          {
            headers: { Authorization: cookie.get("token") },
          }
        );

        setFollowers(res.data);
      } catch (error) {
        toast.error("Error Loading Followers");
      }
    };

    getFollowers();
  }, []);

  return (
    <>
      {followers.length > 0 ? (
        followers.map((profileFollower) => {
          const isFollowing =
            loggedUserFollowStats.following.length > 0 &&
            loggedUserFollowStats.following.filter(
              (following) => following.user === profileFollower.user._id
            ).length > 0;

          return (
            <List dense className={classes.root} key={profileFollower.user._id}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar
                    alt={profileFollower.user.name}
                    src={profileFollower.user.profilePicUrl}
                  />
                </ListItemAvatar>
                <Link href={`/profile/${profileFollower.user.username}`}>
                  <a className={classes.link}>
                    {profileFollower.user.username}
                  </a>
                </Link>
                <ListItemSecondaryAction>
                  {profileFollower.user._id !== user._id && (
                    <Button
                      variant="outlined"
                      color={isFollowing ? "primary" : "secondary"}
                      size="small"
                      className="m-auto mt-3"
                      fullWidth
                      onClick={async () => {
                        isFollowing
                          ? await unfollowUser(
                              profileFollower.user._id,
                              setLoggedUserFollowStats
                            )
                          : await followUser(
                              profileFollower.user._id,
                              setLoggedUserFollowStats
                            );
                      }}
                    >
                      {isFollowing ? "Following ✅" : "Follow "}
                    </Button>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          );
        })
      ) : (
        <Alert message="User does not have followers " />
      )}
    </>
  );
}
