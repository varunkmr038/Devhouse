import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import cookie from "js-cookie";
import baseUrl from "../../utils/baseUrl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  searchInputRoot: {
    paddingTop: "3px !important",
    paddingRight: "12px !important",
  },
  item: {
    color: "black",
    "&:hover": {
      backgroundColor: "#55c57a",
    },
  },
  name: {
    marginLeft: 50,
  },
}));

export default function Search({ chats, setChats }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleChange(e) {
    const { value } = e.target;
    if (value === "") {
      setOpen(false);
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const token = cookie.get("token");

      //  Array of user objects
      const res = await axios.get(`${baseUrl}/api/search/${value}`, {
        headers: { Authorization: token },
      });
      setOptions(res.data);

      if (options.length === 0) {
        setOpen(true);
        return setLoading(false); // IF no User found
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }

    setOpen(true);
    setLoading(false);
  }

  return (
    <Autocomplete
      open={open}
      id="asynchronous-demo"
      classes={{
        inputRoot: classes.searchInputRoot,
      }}
      options={options}
      autoHighlight
      noOptionsText="No User Found"
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option.username} // search is based upon this unique lable
      renderOption={(option) => (
        <RenderOption option={option} chats={chats} setChats={setChats} />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          onBlur={() => {
            setLoading(false);
            setOpen(false);
            setError(false);
          }}
          variant="outlined"
          fullWidth
          placeholder="Search"
          size="small"
          error={error}
          helperText={error ? "Error Searching" : ""}
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress size={20} color="secondary" />
                ) : null}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

function RenderOption({ option, chats, setChats }) {
  const classes = useStyles();
  const router = useRouter();

  //  Adds the chat when clicked on the option
  function addChat(option) {
    const alreadyInChat =
      chats.length > 0 &&
      chats.filter((chat) => chat.messsagesWith === option._id).length > 0;

    //  If there is existing chat with user
    if (alreadyInChat) {
      return router.push(`/messages?message=${option._id}`); //open the existing chat
    }
    // Add a new chat
    else {
      const newChat = {
        messagesWith: option._id,
        name: option.name,
        profilePicUrl: option.profilePicUrl,
        lastMessage: "",
        date: Date.now(),
      };

      setChats((prev) => [newChat, ...prev]);

      return router.push(`/messages?message=${option._id}`);
    }
  }
  return (
    <React.Fragment>
      <List>
        <ListItem onClick={(e) => addChat(option)}>
          <ListItemIcon>
            <Avatar
              alt={option.name}
              src={option.profilePicUrl}
              style={{ backgroundColor: "#ff9800" }}
            />
          </ListItemIcon>
          <ListItemText primary={option.username} />
          <Typography variant="caption" className={classes.name}>
            {option.name}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
