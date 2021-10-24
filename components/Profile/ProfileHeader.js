import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GitHubIcon from "@mui/icons-material/GitHub";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { followUser, unfollowUser } from "../../utils/profileActions";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    paddingRight: "0px",
    flexGrow: 1,
    marginBottom: 60,
    marginTop: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  media: {
    textAlign: "center",
    height: "200px",
    width: "200px",
    border: "dotted",
    cursor: "pointer",
    margin: "auto",
    backgroundColor: "white",
  },
  bio: {
    overflowY: "auto",
    maxHeight: "200px",
    marginTop: 10,
    marginBottom: 10,
  },
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "blue",
      textDecoration: "underline",
    },
  },
  chip: {
    margin: "5px 10px",
  },
}));

function ProfileHeader({
  profile,
  ownAccount,
  loggedUserFollowStats,
  setLoggedUserFollowStats,
}) {
  const classes = useStyles();

  //  If we are following the user or not
  const isFollowing =
    loggedUserFollowStats.following.length > 0 &&
    loggedUserFollowStats.following.filter(
      (following) => following.user === profile.user._id
    ).length > 0;

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7} className="ms-2">
            <Typography
              variant="h4"
              gutterBottom
              style={{ fontStyle: "italic" }}
            >
              {profile.user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <EmojiPeopleIcon
                color="secondary"
                className="me-2"
                fontSize="small"
              />
              {profile.user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <EmailIcon color="secondary" className="me-2" fontSize="small" />
              {profile.user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <PhoneIphoneIcon
                color="secondary"
                className="me-2"
                fontSize="small"
              />
              {profile.user.phone}
            </Typography>

            {profile.bio && (
              <Typography variant="body1" className={classes.bio}>
                <span style={{ color: "#9c27b0" }}> Bio - </span>
                {profile.bio}
              </Typography>
            )}

            <Grid container spacing={3}>
              {profile.github && (
                <Grid item sm={4}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    startIcon={<GitHubIcon />}
                    fullWidth
                    size="small"
                    onClick={() => Router.push(profile.github)}
                  >
                    Github
                  </Button>
                </Grid>
              )}
              {profile.resume && (
                <Grid item sm={4}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    startIcon={<AssignmentIcon />}
                    fullWidth
                    size="small"
                    onClick={() => Router.push(profile.resume)}
                  >
                    Resume
                  </Button>
                </Grid>
              )}
            </Grid>
            {profile.skills.map((ele, index) => (
              <Chip
                key={index}
                color="secondary"
                size="small"
                label={ele}
                className={classes.chip}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Avatar
              alt={profile.user.name}
              src={profile.user.profilePicUrl}
              variant="rounded"
              style={{ height: "250px", width: "250px", margin: "auto" }}
            />
            {!ownAccount && (
              <Button
                variant="contained"
                color={isFollowing ? "primary" : "secondary"}
                size="small"
                className="m-auto mt-3"
                fullWidth
                onClick={async () => {
                  isFollowing
                    ? await unfollowUser(
                        profile.user._id,
                        setLoggedUserFollowStats
                      )
                    : await followUser(
                        profile.user._id,
                        setLoggedUserFollowStats
                      );
                }}
              >
                {isFollowing ? "Following ✅" : "Follow "}
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default ProfileHeader;
