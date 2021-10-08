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
    border: "dotted",
    cursor: "pointer",
    margin: "auto",
    backgroundColor: "white",
  },
}));

function CreatePost({ user, setPosts }) {
  const classes = useStyles();

  const inputRef = useRef();
  const [newPost, setNewPost] = useState({ text: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [errorPost, setErrorPost] = useState(true);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "text") {
      if (regex.postText.test(value)) {
        setErrorPost(false);
      } else {
        setErrorPost(true);
      }
    } else if (name === "location") {
      if (regex.postLocation.test(value)) {
        setErrorPost(false);
      } else {
        setErrorPost(true);
      }
    } else if (name === "media") {
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
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={1} sm={1}>
            <Avatar
              alt={user.name}
              src={user.profilePicUrl}
              style={{ backgroundColor: "#43a047", marginRight: 20 }}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              id="text"
              label="Whats Happening 🙂"
              variant="outlined"
              multiline
              minRows={2}
              size="small"
              style={{ backgroundColor: "white" }}
              fullWidth
              required
              onChange={handleChange}
              name="text"
              value={newPost.text}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="location"
              id="location"
              label="Location 🏖️"
              variant="outlined"
              size="small"
              style={{
                backgroundColor: "white",
              }}
              fullWidth
              onChange={handleChange}
              value={newPost.location}
            />
          </Grid>
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
              style={{
                paddingTop: media === null && "60px",
              }}
            >
              {media === null ? (
                <AddBoxIcon fontSize="large" />
              ) : (
                <>
                  <img
                    style={{ height: "200px", width: "200px" }}
                    src={mediaPreview}
                    alt="PostImage"
                  />
                </>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<PostAddRoundedIcon />}
              disabled={errorPost || loading}
              onClick={handleSubmit}
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CreatePost;
