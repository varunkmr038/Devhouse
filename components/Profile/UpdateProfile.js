import React, { useState, useRef } from "react";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { profileUpdate } from "../../utils/profileActions";
import Chip from "@material-ui/core/Chip";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "15px",
    backgroundColor: "#fdeefa",
    flexGrow: 1,
    marginBottom: 60,
  },
  media: {
    textAlign: "center",
    height: "200px",
    width: "200px",
    cursor: "pointer",
    margin: "auto",
    backgroundColor: "white",
  },
  profileItem: {
    width: 500,

    [theme.breakpoints.down("md")]: {
      width: 250,
    },
    margin: "20px 10px",
  },
  chip: {
    margin: "7px 10px",
  },
}));

function UpdateProfile({ profile }) {
  const classes = useStyles();
  const inputRef = useRef();

  const [profileState, setProfileState] = useState({
    profilePicUrl: profile.user.profilePicUrl,
    bio: profile.bio || "",
    position: profile.position || "",
    github: profile.github || "",
    linkedin: profile.linkedin || "",
    resume: profile.resume || "",
    skill: profile.skill || "",
    collab: profile.collab || false,
  });
  const [skills, setSkills] = useState(profile.skills);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(profile.user.profilePicUrl);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      if (
        files[0] &&
        files[0].type !== "image/png" &&
        files[0].type !== "image/jpeg"
      ) {
        toast.info("Please Select a Image file 😞");
        return;
      }
      setMedia(files[0]);
      setMediaPreview(window.URL.createObjectURL(files[0])); // set the url for image
    }
    setProfileState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profilePicUrl;

    if (media !== null) {
      profilePicUrl = await uploadPic(media); // get cloudinary image url
      if (!profilePicUrl) {
        toast.error("Error Uploading Image 😞");
        return;
      }
    }
    profileState.skills = skills;
    await profileUpdate(profileState, profilePicUrl);
  };
  return (
    <>
      <Paper className="mt-5 pe-5">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8}>
            <input
              ref={inputRef}
              onChange={handleChange}
              name="media"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
            />

            <div
              onClick={() => inputRef.current.click()}
              className={classes.media}
            >
              <img
                style={{ height: "200px", width: "200px" }}
                src={mediaPreview}
                alt="profilepic"
              />
            </div>
          </Grid>
          <Grid item sm={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={profileState.collab}
                  onChange={() =>
                    setProfileState((prev) => ({
                      ...prev,
                      collab: !prev.collab,
                    }))
                  }
                  name="checkedA"
                />
              }
              label="Are you Open to Collab?"
            />
          </Grid>

          <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
            <TextField
              name="bio"
              id="bio"
              label="Bio "
              variant="outlined"
              multiline
              fullWidth
              color="secondary"
              size="small"
              onChange={handleChange}
              value={profileState.bio}
              className={classes.profileItem}
            />
            <TextField
              name="position"
              id="position"
              label="Current Postion"
              placeholder="Ex - Senior Developer at XYZ"
              variant="outlined"
              fullWidth
              color="secondary"
              size="small"
              onChange={handleChange}
              value={profileState.position}
              className={classes.profileItem}
            />
            <TextField
              name="github"
              id="github"
              label="Github "
              variant="outlined"
              fullWidth
              color="secondary"
              onChange={handleChange}
              value={profileState.github}
              size="small"
              className={classes.profileItem}
            />
            <TextField
              name="linkedin"
              id="linkedin"
              label="Linkedin "
              variant="outlined"
              fullWidth
              color="secondary"
              onChange={handleChange}
              value={profileState.linkedin}
              size="small"
              className={classes.profileItem}
            />
            <TextField
              name="resume"
              id="resume"
              label="Resume Link"
              variant="outlined"
              fullWidth
              color="secondary"
              onChange={handleChange}
              value={profileState.resume}
              size="small"
              className={classes.profileItem}
            />
            <TextField
              name="skill"
              id="skill"
              label="Add Skill"
              variant="outlined"
              fullWidth
              color="secondary"
              size="small"
              className={classes.profileItem}
              value={profileState.skill}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="secondary"
                      onClick={() => setSkills([...skills, profileState.skill])}
                    >
                      <AddBoxIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            {skills.map((ele, index) => (
              <Chip
                key={index}
                color="secondary"
                size="small"
                label={ele}
                className={classes.chip}
                onDelete={() => {
                  setSkills(skills.filter((ele, i) => index != i));
                }}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              className="mt-3"
              endIcon={<EditIcon />}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default UpdateProfile;
