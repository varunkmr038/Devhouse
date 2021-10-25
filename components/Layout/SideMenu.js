import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from "@material-ui/core";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import GroupsIcon from "@mui/icons-material/Groups";
import Badge from "@material-ui/core/Badge";
import Link from "next/link";
import { logoutUser } from "../../utils/authUser";
import { UserContext } from "./Layout";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    color: "white",
    backgroundColor: "#1c1616",
  },
  drawerContainer: {
    overflow: "auto",
    marginTop: 40,
  },
  item: {
    color: "white",
    "&:hover": {
      backgroundColor: "#55c57a",
    },
  },
  desk: {
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },
}));

function Item({ text, icon, href }) {
  const classes = useStyles();

  return (
    <>
      <Link href={href}>
        <ListItem button key={text} className={classes.item}>
          <ListItemIcon style={{ color: "white" }}>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </Link>
      <Divider style={{ backgroundColor: "white" }} />
    </>
  );
}

function DrawerContent({ username, unreadNotification, unreadMessage }) {
  const classes = useStyles();

  return (
    <>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <Item text="Home" icon={<HomeRoundedIcon />} href="/home" />
          <Item text="Meet" icon={<PersonalVideoIcon />} href="/meet" />
          <Item text="Teammates" icon={<GroupsIcon />} href="/find-teammates" />
          <Item
            text="Messages"
            icon={
              <Badge color="secondary" variant="dot" invisible={!unreadMessage}>
                <MessageRoundedIcon />
              </Badge>
            }
            href="/messages"
          />
          <Item
            text="Notifications"
            icon={
              <Badge
                color="secondary"
                variant="dot"
                invisible={!unreadNotification}
              >
                <CircleNotificationsRoundedIcon />
              </Badge>
            }
            href="/notifications"
          />
          <Item
            text="Profile"
            icon={<ManageAccountsRoundedIcon />}
            href={`/profile/${username}`}
          />
          {/*  Logout User */}
          <ListItem
            button
            className={classes.item}
            onClick={() => logoutUser(username)}
          >
            <ListItemIcon style={{ color: "white" }}>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          <Divider style={{ backgroundColor: "white" }} />
        </List>
      </div>
    </>
  );
}

export default function SideMenu({ mobileOpen, setMobileOpen }) {
  const classes = useStyles();
  const theme = useTheme();
  const { protectedRoutes, user } = useContext(UserContext);
  let username, unreadNotification, unreadMessage;
  if (user) {
    username = user.username;
    unreadNotification = user.unreadNotification;
    unreadMessage = user.unreadMessage;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile Drawer */}
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
          }}
          style={{ display: protectedRoutes ? "initial" : "none" }}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Toolbar />
          <DrawerContent
            username={username}
            unreadNotification={unreadNotification}
            unreadMessage={unreadMessage}
          />
        </Drawer>
      </Hidden>
      {/*  Desktop Drawer */}
      <Drawer
        className={`${classes.desk} ${classes.drawer}`}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        style={{ display: protectedRoutes ? "initial" : "none" }}
      >
        <DrawerContent
          username={username}
          unreadNotification={unreadNotification}
          unreadMessage={unreadMessage}
        />
      </Drawer>
    </>
  );
}
