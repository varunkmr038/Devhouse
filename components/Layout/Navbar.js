import React, { useContext } from "react";
import Link from "next/link";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import Search from "./Search";
import { UserContext } from "./Layout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1400,
    marginBottom: theme.spacing(5),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    color: "white",
  },
  title: {
    flexGrow: 1,
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontFamily: `Allison, cursive !important`,
    fontWeight: "bolder",
    cursor: "pointer",
    marginLeft: 40,
  },
}));

function Navbar({ mobileOpen, setMobileOpen }) {
  const classes = useStyles();
  const { protectedRoutes, user } = useContext(UserContext);

  if (user) var { username, name, profilePicUrl } = user;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" style={{ backgroundColor: "#1c1616" }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <img
              src="/img/logo-white.png"
              alt=""
              height="50"
              width="80"
              className="me-5 ms-3 float-start"
            />
            <Typography className={classes.title} variant="h3" noWrap>
              Clubhouse
            </Typography>
            <Search />
            <Link href={`/profile/${username}`}>
              <Avatar
                className="ms-4"
                alt={name}
                src={profilePicUrl}
                style={{
                  display: protectedRoutes ? "initial" : "none",
                  backgroundColor: "#55c57a",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default Navbar;
