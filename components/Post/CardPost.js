import React, { useState, useEffect } from "react";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CommentDialog from "./CommentDialog";
import { deletePost, likePost } from "../../utils/postActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    backgroundColor: "#f8f7cf",
    margin: "auto",
    marginBottom: 40,
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
    maxHeight: 100,
    overflowY: "scroll",
    marginBottom: 10,
  },
}));

export default function CardPost({ post, user, setPosts }) {
  const classes = useStyles();

  const addPropsToModal = () => ({
    post,
    user,
    // comments,
    // setComments
  });

  const [likes, setLikes] = useState(post.likes);
  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user === user._id).length > 0;
  const [comments, setComments] = useState(post.comments);

  const [likeColor, setLikeColor] = useState("default");
  const [openComment, setOpenComment] = useState(false);

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar alt="Remy Sharp" src="/img/defaultUser.jpg" />}
          action={
            (user.role == "root" || post.user._id === user._id) && (
              <IconButton aria-label="delete">
                <DeleteForeverRoundedIcon style={{ color: "red" }} />
              </IconButton>
            )
          }
          title=" varunkmr038"
          subheader="London, UK"
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
            style={{ maxHeight: post.picUrl ? 200 : 500 }}
          >
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.'
            dddddddddddddddddddddddddddddddd;vkdlmvbkldmnlkfnvlkfnblfbnkfnblkfnblkdfnblfnblfdbfb
            fbflbmfl;bmfklbmklfbmlkfdbnlfdbnfknnnnnnnnnnnnnnnncdvdvdsvdvdvvdnnnnnnnnnnnnnnnnnnnnnnnldfkiogwefo9hfwehfvnfjviffb'
            vdsvsdvdvdvdbdsbfbfbfbbdgbgfbd bgbdbbgdbgbglkbngjkdbbvbhvfv ffl
            fffbfbdbdfb cldvkodslnvjkdnbvkjvd vdvbdlbsmbknbsknflnbl\ This
            impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the
            mussels, if you like.'
            dddddddddddddddddddddddddddddddd;vkdlmvbkldmnlkfnvlkfnblfbnkfnblkfnblkdfnblfnblfdbfb
            fbflbmfl;bmfklbmklfbmlkfdbnlfdbnfknnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnldfkiogwefo9hfwehfvnfjviffb'
            vdsvsdvdvdvdbdsbfbfbfbbdgbgfbd bgbdbbgdbgbglkbngjkdbbvbhvfv ffl
            fffbfbdbdfb cldvkodslnvjkdnbvkjvd vdvbdlbsmbknbsknflnbl
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Posted By Varun on ckssakfnaf
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="like"
            onClick={() =>
              likePost(post._id, user._id, setLikes, isLiked ? false : true)
            }
            color={isLiked ? "primary" : "default"}
          >
            <FavoriteIcon />
          </IconButton>
          <Typography variant="caption" style={{ color: "purple" }}>
            1 Likes
          </Typography>
          <IconButton aria-label="comment" onClick={() => setOpenComment(true)}>
            <CommentIcon />
          </IconButton>
          <Typography variant="caption" style={{ color: "purple" }}>
            1 Comments
          </Typography>
          <IconButton aria-label="share">
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
