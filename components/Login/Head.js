import React from "react";
import {
  DialogActions,
  Avatar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#43a047",
    marginBottom: theme.spacing(2),
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
}));

function Head({ handleClick, icon, title }) {
  const classes = useStyles();

  return (
    <>
      <DialogActions className="ms-auto">
        <CloseRoundedIcon
          autoFocus
          onClick={handleClick}
          color="primary"
          style={{ cursor: "pointer" }}
          fontSize="large"
        />
      </DialogActions>
      <Avatar alt="Img" className={`mt-0 ${classes.avatar}`}>
        {icon}
      </Avatar>

      <Typography component="h1" variant="h4" className="fw-bolder">
        {title}
      </Typography>
    </>
  );
}

export default Head;
