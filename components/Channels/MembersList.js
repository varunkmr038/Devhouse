import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleDialog({ open, setOpen, members }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <List dense className={classes.root}>
        {members.map((member, index) => {
          const labelId = `checkbox-list-secondary-label-${index}`;
          return (
            <ListItem
              key={index}
              className="my-3"
              button
              onClick={() => router.push(`/profile/${member.user.username}`)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={member.user.name}
                  src={member.user.profilePicUrl}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={member.user.name} />
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
}

export default function MembersList({ members }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={() => setOpen(true)}
      >
        {`View Members (${members.length})`}
      </Button>
      <SimpleDialog open={open} setOpen={setOpen} members={members} />
    </>
  );
}
