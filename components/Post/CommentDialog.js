import React, { useState } from "react";
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
import Typography from "@material-ui/core/Typography";
import CommentList from "./CommentList";
import { postComment } from "../../utils/postActions";

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function CommentDialog({
  post,
  user,
  comments,
  setComments,
  openComment,
  setOpenComment,
}) {
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");

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
          {`Comment on ${post.user.name.split(" ")[0]}' s Post`}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item sm={5} xs={12}>
              <Paper className={classes.imgPaper}>
                {post.picUrl && (
                  <img
                    style={{ height: "100%", width: "100%" }}
                    src={post.picUrl}
                    alt="Post image"
                  />
                )}

                <Typography
                  variant="body2"
                  color="textPrimary"
                  component="p"
                  gutterBottom
                  className={classes.caption}
                  style={{ maxHeight: post.picUrl ? 100 : 500 }}
                >
                  {post.text}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Paper className={classes.commentPaperBox}>
                <Box>
                  {comments.length === 0 ? (
                    <Typography
                      style={{ textAlign: "center", fontWeight: "100" }}
                      variant="h5"
                      gutterBottom
                    >
                      No comments found for this Post
                    </Typography>
                  ) : (
                    comments.map((c, i) => (
                      <CommentList
                        key={i}
                        index={i}
                        comment={c}
                        setComments={setComments}
                        user={user}
                        post={post}
                      />
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
                    value={commentText}
                    onChange={(e) => {
                      setCommentText(e.target.value);
                    }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                      await postComment(
                        post._id,
                        user,
                        commentText,
                        setCommentText,
                        setComments
                      );
                    }}
                  >
                    Post
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenComment(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CommentDialog;
