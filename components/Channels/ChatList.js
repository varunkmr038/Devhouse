import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    padding: "20px",
  },
}));

function Chat({ chat, connectedUsers }) {
  const router = useRouter();

  return (
    <ListItem
      button
      selected={router.query.channel === "abc"}
      onClick={() =>
        router.push(`/channels?channel='abc'`, undefined, {
          shallow: true, // update the path of current page without rerunning getinitial props
        })
      }
      divider
    >
      <ListItemText primary={"#Javascript Project"} secondary={"Bug solved"} />
    </ListItem>
  );
}

function ChatList({ chats, setChats, connectedUsers }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        endIcon={<AddIcon />}
        fullWidth
        size="small"
        onClick={() => setOpen(true)}
      >
        Create New Channel
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        style={{ padding: "20px" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.root}>
          <TextField
            id="channelName"
            label="Enter Channel's Name"
            variant="outlined"
            fullWidth
            size="small"
            color="secondary"
          />
          <Button
            variant="contained"
            color="secondary"
            size="small"
            className="my-3 mx-auto"
          >
            Create
          </Button>
        </div>
      </Dialog>

      <List style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {/* {chats.map((chat, index) => (
          <Chat chat={chat} key={index} connectedUsers={connectedUsers} />
        ))} */}
        <Chat />
        <Chat />
        <Chat />
        <Chat />
      </List>
    </>
  );
}

export default ChatList;
