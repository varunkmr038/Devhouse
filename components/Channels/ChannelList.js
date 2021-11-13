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
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    padding: "20px",
  },
}));

function Channel({ channel }) {
  const router = useRouter();

  const messages = channel.messages;

  return (
    <ListItem
      button
      selected={router.query.channel === channel._id}
      onClick={() =>
        router.push(`/channels?channel=${channel._id}`, undefined, {
          shallow: true, // update the path of current page without rerunning getinitial props
        })
      }
      divider
    >
      <ListItemText
        primary={`# ${channel.name}`}
        secondary={
          messages[messages.length - 1]
            ? messages[messages.length - 1].msg.length > 21
              ? `${messages[messages.length - 1].msg.substring(0, 22)} ...`
              : messages[messages.length - 1].msg
            : ""
        }
      />
    </ListItem>
  );
}

function ChannelList({ channels, setChannels }) {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const classes = useStyles();

  const createChannel = async () => {
    try {
      if (channelName == "") return;

      const res = await axios.post(
        `${baseUrl}/api/channels/${channelName}`,
        {},
        { headers: { Authorization: cookie.get("token") } }
      );

      setChannels((prev) => [res.data, ...prev]);
      setChannelName("");
      toast.success("Channel Created");
    } catch (err) {
      toast.error("Some Error Occured");
    }
    setOpen(false);
  };

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
            name="channelName"
            label="Enter Channel's Name"
            variant="outlined"
            fullWidth
            size="small"
            color="secondary"
            onChange={(e) => setChannelName(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            size="small"
            className="my-3 mx-auto"
            onClick={() => createChannel()}
          >
            Create
          </Button>
        </div>
      </Dialog>

      <List style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {channels.map((channel, index) => (
          <Channel channel={channel} key={index} />
        ))}
      </List>
    </>
  );
}

export default ChannelList;
