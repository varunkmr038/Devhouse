import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GitHubIcon from "@mui/icons-material/GitHub";
import { toast } from "react-toastify";
import cookie from "js-cookie";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "25px",
  },
  inputField: {
    width: 500,

    [theme.breakpoints.down("md")]: {
      width: 250,
    },
    margin: "20px 10px",
  },
  chip: {
    margin: "7px 10px",
  },
  card: {
    backgroundColor: "#ffefe9",
    overflow: "auto",
    maxHeight: 400,
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

function UserCard({ profile }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt={profile.user.name} src={profile.user.profilePicUrl} />
          }
          title={
            <a
              href={`/profile/${profile.user.username}`}
              target="_blank"
              className={classes.link}
            >
              {profile.user.name}
            </a>
          }
          action={
            <>
              <Grid container spacing={2}>
                {profile.github && (
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                      startIcon={<GitHubIcon />}
                      fullWidth
                      size="small"
                      onClick={() => window.open(profile.github, "_blank")}
                    >
                      Github
                    </Button>
                  </Grid>
                )}
                {profile.resume && (
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                      startIcon={<AssignmentIcon />}
                      fullWidth
                      size="small"
                      onClick={() => window.open(profile.resume, "_blank")}
                    >
                      Resume
                    </Button>
                  </Grid>
                )}
              </Grid>
            </>
          }
          subheader={profile.user.username}
        />

        <CardContent>
          <div>
            {profile.skills.map((skill, index) => (
              <Chip
                key={index}
                variant="outlined"
                color="primary"
                label={skill}
                className="m-2"
                size="small"
              />
            ))}
          </div>
          <Typography variant="caption" gutterBottom>
            {profile.bio}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

function Teammates() {
  const classes = useStyles();

  const [skills, setSkills] = useState([]);
  const [curSkill, setCurSkill] = useState("");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      document.title = `Devhouse | Find Teammates`;
    }, 0);
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (skills.length == 0) return;

      // Getting profiles from backend
      const res = await axios.post(
        `${baseUrl}/api/search/teammates`,
        { skills },
        { headers: { Authorization: cookie.get("token") } }
      );

      if (res.data.length == 0) {
        toast.info("No User found with these skills");
      }
      setProfiles(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Some Error occured");
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Find Teammates for your Project
      </Typography>

      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <TextField
              name="skill"
              id="skill"
              label="Search By Skills"
              variant="outlined"
              fullWidth
              color="primary"
              size="small"
              className={classes.inputField}
              value={curSkill}
              onChange={(e) => setCurSkill(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setCurSkill("");
                        setSkills([...skills, curSkill.trim()]);
                      }}
                    >
                      <AddBoxIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className="mt-3 ms-3"
              endIcon={<PersonSearchIcon />}
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            {skills.map((ele, index) => (
              <Chip
                key={index}
                color="primary"
                label={ele}
                className={classes.chip}
                onDelete={() => {
                  setSkills(skills.filter((ele, i) => index != i));
                }}
              />
            ))}
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4} className="mt-5">
        {profiles.map((profile, index) => (
          <Grid item sm={6} key={index}>
            <UserCard profile={profile} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Teammates;
