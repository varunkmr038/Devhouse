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
    marginTop: 30,
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

export default function Following({
  user,
  loggedUserFollowStats,
  setLoggedUserFollowStats,
  profileUserId,
}) {
  const classes = useStyles();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        // fetching following from backend
        const res = await axios.get(
          `${baseUrl}/api/profile/following/${profileUserId}`,
          {
            headers: { Authorization: cookie.get("token") },
          }
        );

        setFollowing(res.data);
      } catch (error) {
        toast.error("Error Loading following");
      }
    };

    getFollowing();
  }, []);

  return (
    <>
      {following.length > 0 &&
        following.map((profileFollowing) => {
          const isFollowing =
            loggedUserFollowStats.following.length > 0 &&
            loggedUserFollowStats.following.filter(
              (following) => following.user === profileFollowing.user._id
            ).length > 0;

          return (
            <List
              dense
              className={classes.root}
              key={profileFollowing.user._id}
            >
              <ListItem button className="my-3">
                <ListItemAvatar>
                  <Avatar
                    alt={profileFollowing.user.name}
                    src={profileFollowing.user.profilePicUrl}
                  />
                </ListItemAvatar>
                <Link href={`/profile/${profileFollowing.user.username}`}>
                  <a className={classes.link}>
                    {profileFollowing.user.username}
                  </a>
                </Link>
                <ListItemSecondaryAction>
                  {profileFollowing.user._id !== user._id && (
                    <Button
                      variant="outlined"
                      color={isFollowing ? "primary" : "secondary"}
                      size="small"
                      className="m-auto mt-3"
                      fullWidth
                      onClick={async () => {
                        isFollowing
                          ? await unfollowUser(
                              profileFollowing.user._id,
                              setLoggedUserFollowStats
                            )
                          : await followUser(
                              profileFollowing.user._id,
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
        })}
    </>
  );
}
