import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress,
  InputAdornment,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import cookie from "js-cookie";
import baseUrl from "../../utils/baseUrl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
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

export default function Search({ openChannelId }) {
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
        <RenderOption option={option} openChannelId={openChannelId} />
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
          color="secondary"
          style={{ backgroundColor: "white" }}
          placeholder="Add User in Channel"
          size="small"
          error={error}
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <GroupAddIcon />
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

  function addPeople() {}

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
          <Button
            variant="outlined"
            color="primary"
            size="small"
            className="ms-5"
            onClick={() => addPeople()}
          >
            Add
          </Button>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
