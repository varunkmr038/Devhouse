import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  imgPaper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  commentPaper: {
    padding: "5px",
    backgroundColor: "white",
  },
  commentListItem: {
    padding: "10px 5px 10px 10px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#f8f7cf",
    overflowWrap: "anywhere",
  },
  commentPaperBox: {
    padding: "10px",
    minHeight: "25rem",
    maxHeight: "25rem",
    overflowY: "scroll",
    marginBottom: "1rem",
  },

  formBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    padding: "0 5px",
  },
  caption: {
    wordWrap: "break-word",
    maxHeight: 100,
    overflowY: "scroll",
    marginTop: 10,
  },
  box: {
    marginLeft: "10px",
    width: 800,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function CommentList({ comment, index }) {
  const classes = useStyles();

  return (
    <Paper
      style={{ margin: index === 0 ? "0 0 10px 0" : "12px 0" }}
      className={classes.commentListItem}
    >
      <Avatar alt="Remy Sharp" src="/img/defaultUser.jpg" />
      <Box className={classes.box}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="subtitle2"
            color="textSecondary"
            className="me-auto"
          >
            varunkmr038
          </Typography>
          <Typography
            variant="caption"
            color="secondary"
            style={{ color: "rgba(0, 0, 0, 0.54)" }}
          >
            varunkmr038
          </Typography>
        </div>

        <Typography
          variant="body2"
          component="p"
          style={{ overflowWrap: "anywhere" }}
        >
          {comment}
        </Typography>
      </Box>
    </Paper>
  );
}

function CommentDialog({
  homePosts,
  post,
  clearComment,
  addComment,
  authDetail,
  setAuthAlert,
  openComment,
  setOpenComment,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [buttonText, setButtonText] = useState("Send");
  const [text, setText] = useState("");
  // const [post, setPost] = useState(null);
  // const [post, setPost] = useState(null);
  // const [post, setPost] = useState(null);
  // useEffect(() => {
  //   if (rest.post) {
  //   if (rest.post) {
  //     const currentPost = homePosts.find((post) => post.id === rest.post.id);
  //     const currentPost = homePosts.find((post) => post.id === rest.post.id);
  //     const currentPost = homePosts.find((post) => post.id === rest.post.id);
  //     const currentPost = homePosts.find((post) => post.id === rest.post.id);
  //     const currentPost = homePosts.find((post) => post.id === rest.post.id);
  //     const currentPost = homePosts.find((post) => post.id === rest.post.id);
  //     setPost(currentPost);
  //     setPost(currentPost);
  //     setPost(currentPost);
  //     setOpen(true);
  //   }
  //   // eslint-diasable-next-line
  // }, [rest.post, homePosts]);
  // }, [rest.post, homePosts]);
  // }, [rest.post, homePosts]);

  // const handleComment = async () => {
  //   if (text.trim().length === 0) {
  //     return setAuthAlert({
  //       type: "warning",
  //       message: "Please Enter some Text to post a Comment",
  //       message: "Please Enter some Text to post a Comment",
  //     });
  //   }
  //   setText("");
  //   setButtonText("Loading");
  //   const { displayName, username, photoURL } = authDetail;
  //   await addComment({
  //     id: post._id,
  //     id: post._id,
  //     text,
  //     author: {
  //       displayName,
  //       username,
  //       photoURL,
  //     },
  //   });
  //   setButtonText("Send");
  // };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={openComment}
        TransitionComponent={Transition}
        keepMounted
        onClose={(e, reason) => {
          // if (reason != "backdropClick")
          setOpenComment(false);
        }}
        style={{ zIndex: 1500 }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          Comment on Varun's Post Comment on Varun's Post
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item sm={5} xs={12}>
              <Paper className={classes.imgPaper}>
                {/* <img
                  style={{ height: "100%", width: "100%" }}
                  src="/img/home.jpeg"
                  alt={post && post.postContent}
                  alt={post && post.postContent}
                /> */}

                <Typography
                  variant="body2"
                  color="textPrimary"
                  component="p"
                  gutterBottom
                  className={classes.caption}
                  style={{ maxHeight: post.picUrl ? 100 : 500 }}
                >
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.'
                  dddddddddddddddddddddddddddddddd;vkdlmvbkldmnlkfnvlkfnblfbnkfnblkfnblkdfnblfnblfdbfb
                  fbflbmfl;bmfklbmklfbmlkfdbnlfdbnfknnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnldfkiogwefo9hfwehfvnfjviffb'
                  vdsvsdvdvdvdbdsbfbfbfbbdgbgfbd bgbdbbgdbgbglkbngjkdbbvbhvfv
                  ffl fffbfbdbdfb cldvkodslnvjkdnbvkjvd vdvbdlbsmbknbsknflnbl\
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.'
                  dddddddddddddddddddddddddddddddd;vkdlmvbkldmnlkfnvlkfnblfbnkfnblkfnblkdfnblfnblfdbfb
                  fbflbmfl;bmfklbmklfbmlkfdbnlfdbnfknnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnldfkiogwefo9hfwehfvnfjviffb'
                  vdsvsdvdvdvdbdsbfbfbfbbdgbgfbd bgbdbbgdbgbglkbngjkdbbvbhvfv
                  ffl fffbfbdbdfb cldvkodslnvjkdnbvkjvd vdvbdlbsmbknbsknflnbl
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Paper className={classes.commentPaperBox}>
                <Box>
                  {post && post.comments.length === 0 ? (
                    <Typography
                      style={{ textAlign: "center", fontWeight: "100" }}
                      variant="h5"
                      gutterBottom
                    >
                      No comments found for this Post
                    </Typography>
                  ) : (
                    post &&
                    post.comments.map((c, i) => (
                      <CommentList key={i} index={i} comment={c.text} />
                    ))
                  )}
                </Box>
              </Paper>
              <Paper className={classes.commentPaper}>
                <Box className={classes.formBox}>
                  <TextField
                    label="Comment"
                    style={{ margin: 8 }}
                    fullWidth
                    multiline
                    margin="normal"
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                  <Button variant="contained" color="primary">
                    POST
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenComment(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CommentDialog;
