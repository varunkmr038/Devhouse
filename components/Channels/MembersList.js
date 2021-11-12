import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleDialog({ open, setOpen }) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <List dense className={classes.root}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
}

export default function MembersList() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={() => setOpen(true)}
      >
        View Members (4)
      </Button>
      <SimpleDialog open={open} setOpen={setOpen} />
    </>
  );
}
