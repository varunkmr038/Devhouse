import React, { useState } from "react";
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
import CommentDialog from "./CommentDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    backgroundColor: "#f8f7cf",
  },
  media: {
    height: 0,
    paddingTop: "70%", // 16:9
    marginBottom: 10,
  },
  caption: {
    wordWrap: "break-word",
    maxHeight: 100,
    overflowY: "scroll",
    marginBottom: 10,
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [likeColor, setLikeColor] = useState("default");
  const [openComment, setOpenComment] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar alt="Remy Sharp" src="/img/defaultUser.jpg" />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title=" varunkmr038"
          subheader="London, UK"
        />
        <CardMedia className={`${classes.media} mx-2`} image="img/home.jpeg" />
        <CardContent>
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
            gutterBottom
            className={classes.caption}
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
            onClick={() => {
              likeColor == "default"
                ? setLikeColor("primary")
                : setLikeColor("default");
            }}
            color={likeColor}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="comment" onClick={() => setOpenComment(true)}>
            <CommentIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <CommentDialog
        openComment={openComment}
        setOpenComment={setOpenComment}
      />
    </>
  );
}
