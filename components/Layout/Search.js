import React, { useState, useContext } from "react";
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
import { UserContext } from "./Layout";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: 10,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  searchInputRoot: {
    paddingTop: "3px !important",
    paddingRight: "14px !important",
    borderRadius: 15,
    backgroundColor: "white",
    width: 360,
    "&:hover": {
      backgroundColor: "#f1ebeb",
    },
    [theme.breakpoints.down("sm")]: {
      width: 160,
    },
  },

  searchRoot: {
    backgroundColor: "white !important",
    borderRadius: 15,
  },

  textFieldRoot: {
    borderRadius: 15,
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

export default function Search() {
  const classes = useStyles();

  const { protectedRoutes } = useContext(UserContext);

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
        root: classes.searchRoot,
        option: classes.option,
      }}
      options={options}
      style={{ display: protectedRoutes ? "initial" : "none" }}
      autoHighlight
      noOptionsText="No User Found"
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option.username} // search is based upon this unique lable
      renderOption={(option) => <RenderOption option={option} />}
      renderInput={(params) => (
        <TextField
          {...params}
          classes={{ root: classes.textFieldRoot }}
          onBlur={() => {
            setLoading(false);
            setOpen(false);
            setError(false);
          }}
          variant="filled"
          placeholder="Search User..."
          size="small"
          error={error}
          helperText={error ? "Error Searching" : ""}
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start" className={`mb-3`}>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress size={20} color="primary" />
                ) : null}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

function RenderOption({ option }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <List onClick={() => Router.push(`/profile/${option.username}`)}>
        <ListItem>
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
