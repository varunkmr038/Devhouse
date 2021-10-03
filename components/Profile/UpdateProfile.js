import React, { useState, useRef } from "react";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { makeStyles } from "@material-ui/core/styles";
import { submitNewPost } from "../../utils/postActions";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { toast } from "react-toastify";
import regex from "../../utils/regex";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "15px",
    backgroundColor: "#fdeefa",
    flexGrow: 1,
    marginBottom: 60,
  },
  button: {
    margin: theme.spacing(1),
  },
  media: {
    textAlign: "center",
    height: "200px",
    width: "200px",
    cursor: "pointer",
    margin: "auto",
    backgroundColor: "white",
  },
}));

function UpdateProfile() {
  const classes = useStyles();
  const inputRef = useRef();

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("/img/defaultUser.jpg");
  const [loading, setLoading] = useState(false);
  const [errorPost, setErrorPost] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name == "text") {
      if (regex.postText.test(value)) {
        setErrorPost(false);
      } else {
        setErrorPost(true);
      }
    } else if (name === "media") {
      if (
        files[0] &&
        files[0].type != "image/png" &&
        files[0].type != "image/jpeg"
      ) {
        toast.info("Please Select a Image file 😞");
        return;
      }
      setMedia(files[0]);
      setMediaPreview(window.URL.createObjectURL(files[0])); // set the url for image
    }
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let picUrl;

    if (media !== null) {
      picUrl = await uploadPic(media); // get cloudinary image url
      if (!picUrl) {
        setLoading(false);
        toast.error("Error Uploading Image 😞");
        return;
      }
    }

    await submitNewPost(
      newPost.text,
      newPost.location,
      picUrl,
      setPosts,
      setNewPost
    );

    setMedia(null);
    setMediaPreview(null);
    setLoading(false);
  };
  return (
    <>
      <Paper className="mt-5 pe-5">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Bio ✍️"
              variant="outlined"
              multiline
              minRows={2}
              fullWidth
              color="secondary"
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
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
