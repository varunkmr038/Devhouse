import React, { useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CommentDialog from "./CommentDialog";
import { deletePost, likePost } from "../../utils/postActions";
import calculateTime from "../../utils/calculateTime";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    backgroundColor: "#f8f7cf",
    margin: "auto",
    marginBottom: 50,
    marginTop: 15,
  },
  media: {
    height: 0,
    paddingTop: "70%", // 16:9
    marginBottom: 10,
    cursor: "pointer",
  },
  caption: {
    wordWrap: "break-word",
    maxHeight: 200,
    overflowY: "auto",
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
}));

export default function CardPost({ post, user, setPosts }) {
  const classes = useStyles();

  const [likes, setLikes] = useState(post.likes);
  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user === user._id).length > 0;
  const [comments, setComments] = useState(post.comments);
  const [openComment, setOpenComment] = useState(false);

  const addPropsToModal = () => ({
    post,
    user,
    comments,
    setComments,
  });

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              alt={post.user.name}
              src={post.user.profilePicUrl}
              style={{ backgroundColor: "#ff9800" }}
            />
          }
          action={
            (user.role === "root" || post.user._id === user._id) && (
              <IconButton
                aria-label="delete"
                onClick={() => deletePost(post._id, setPosts)}
              >
                <DeleteForeverRoundedIcon style={{ color: "red" }} />
              </IconButton>
            )
          }
          title={
            <Link href={`/profile/${post.user.username}`}>
              <a className={classes.link}>{post.user.username}</a>
            </Link>
          }
          subheader={post.location}
        />
        {post.picUrl ? (
          <CardMedia
            className={`${classes.media} mx-2`}
            image={post.picUrl}
            onClick={() => setOpenComment(true)}
          />
        ) : (
          ""
        )}
        <CardContent>
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
            gutterBottom
            className={classes.caption}
            onClick={() => setOpenComment(true)}
            style={{ maxHeight: post.picUrl ? 400 : 600 }}
          >
            {post.text}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {`Posted By ${post.user.name} on `} {calculateTime(post.createdAt)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="like"
            onClick={() =>
              likePost(post._id, user._id, setLikes, isLiked ? false : true)
            }
            style={{ color: isLiked ? "red" : "#1c1616" }}
          >
            <FavoriteIcon />
          </IconButton>
          <Typography variant="caption" style={{ color: "blue" }}>
            {likes.length > 0 &&
              `${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
          </Typography>
          <IconButton
            aria-label="comment"
            onClick={() => setOpenComment(true)}
            style={{ color: "#1c1616" }}
          >
            <CommentIcon />
          </IconButton>
          <Typography variant="caption" style={{ color: "blue" }}>
            {comments.length > 0 &&
              `${comments.length} ${
                comments.length === 1 ? "comment" : "comments"
              }`}
          </Typography>
          <IconButton aria-label="share" style={{ color: "#1c1616" }}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <CommentDialog
        openComment={openComment}
        setOpenComment={setOpenComment}
        {...addPropsToModal()}
      />
    </>
  );
}
