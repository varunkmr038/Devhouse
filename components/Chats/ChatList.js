import React from "react";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/router";
import Search from "./Search";

function ChatList({ chats, setChats }) {
  const router = useRouter();

  return (
    <>
      <div style={{ padding: "10px" }}>
        <Search />
      </div>
      <Divider />
      <List style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {chats.map((chat, index) => {
          <ListItem
            button
            key={index}
            selected={router.query.message === chat.messagesWith}
            onClick={() =>
              router.push(`/messages?message=${chat.messagesWith}`, undefined, {
                shallow: true, // update the path of current page without rerunning getinitial props
              })
            }
            divider
          >
            <ListItemIcon>
              <Avatar alt={chat.name} src={chat.profilePicUrl} />
            </ListItemIcon>
            <ListItemText
              primary={chat.name}
              secondary={
                chat.lastMessage.length > 22
                  ? `${chat.lastMessage.substring(0, 22)} ...`
                  : chat.lastMessage
              }
            />
          </ListItem>;
        })}
      </List>
    </>
  );
}

export default ChatList;
