import React, { useEffect, useState } from "react";
import Link from "next/link";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Typography from "@material-ui/core/Typography";
import calculateTime from "../../utils/calculateTime";
import { deleteComment } from "../../utils/postActions";

const useStyles = makeStyles((theme) => ({
  commentListItem: {
    padding: "10px 5px 10px 10px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#f8f7cf",
    overflowWrap: "anywhere",
  },

  box: {
    marginLeft: "10px",
    width: 800,
  },
}));

function CommentList({ comment, index, user, setComments, post }) {
  const classes = useStyles();

  return (
    <Paper
      style={{ margin: index === 0 ? "0 0 10px 0" : "12px 0" }}
      className={classes.commentListItem}
    >
      <Avatar
        alt={comment.user.name}
        src={comment.user.profilePicUrl}
        style={{ backgroundColor: "#ff9800" }}
      />
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
            {
              <Link href={`/${comment.user.username}`}>
                <a
                  style={{
                    textDecoration: "none",
                    color: "grey",
                  }}
                >
                  {comment.user.username}
                </a>
              </Link>
            }
          </Typography>
          <Typography
            variant="caption"
            color="secondary"
            style={{ color: "rgba(0, 0, 0, 0.54)" }}
          >
            {calculateTime(comment.date)}
          </Typography>
          {(user.role == "root" || comment.user._id == user._id) && (
            <DeleteForeverRoundedIcon
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => deleteComment(post._id, comment._id, setComments)}
              fontSize="small"
            />
          )}
        </div>

        <Typography
          variant="body2"
          component="p"
          style={{ overflowWrap: "anywhere" }}
        >
          {comment.text}
        </Typography>
      </Box>
    </Paper>
  );
}

export default CommentList;
