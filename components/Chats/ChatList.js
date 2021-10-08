import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { useRouter } from "next/router";
import Search from "./Search";

function Chat({ chat, connectedUsers }) {
  const router = useRouter();

  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === chat.messagesWith).length >
      0;

  return (
    <ListItem
      button
      selected={router.query.message === chat.messagesWith}
      onClick={() =>
        router.push(`/messages?message=${chat.messagesWith}`, undefined, {
          shallow: true, // update the path of current page without rerunning getinitial props
        })
      }
      divider
    >
      <ListItemIcon>
        <Badge color="primary" variant="dot" invisible={!isOnline}>
          <Avatar alt={chat.name} src={chat.profilePicUrl} />
        </Badge>
      </ListItemIcon>
      <ListItemText
        primary={chat.name}
        secondary={
          chat.lastMessage.length > 22
            ? `${chat.lastMessage.substring(0, 22)} ...`
            : chat.lastMessage
        }
      />
    </ListItem>
  );
}

function ChatList({ chats, setChats, connectedUsers }) {
  return (
    <>
      <div style={{ padding: "10px" }}>
        <Search chats={chats} setChats={setChats} />
      </div>
      <Divider />
      <List style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {chats.map((chat, index) => (
          <Chat chat={chat} key={index} connectedUsers={connectedUsers} />
        ))}
      </List>
    </>
  );
}

export default ChatList;
