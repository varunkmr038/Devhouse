import React from "react";
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
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";

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
}));

function Item({ text, icon, href }) {
  const classes = useStyles();

  const router = useRouter();
  const isActive = (route) => router.pathname === route;
  return (
    <>
      <Link href={href}>
        <ListItem
          button
          key={text}
          style={{
            backgroundColor: isActive(href)
              ? "#55c57a" // If not active then color change on hover
              : {
                  "&:hover": {
                    backgroundColor: "#55c57a",
                  },
                },
          }}
          className={classes.item}
        >
          <ListItemIcon style={{ color: "white" }}>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </Link>
      <Divider style={{ backgroundColor: "white" }} />
    </>
  );
}

function DrawerContent() {
  const classes = useStyles();

  return (
    <>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <Item text="Home" icon={<HomeRoundedIcon />} href="/home" />
          <Item
            text="Messages"
            icon={<MessageRoundedIcon />}
            href="/messages"
          />
          <Item
            text="Notifications"
            icon={<CircleNotificationsRoundedIcon />}
            href="/notifications"
          />
          <Item
            text="Account"
            icon={<ManageAccountsRoundedIcon />}
            href="/account"
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

export default function SideMenu({
  protectedRoutes,
  username,
  mobileOpen,
  setMobileOpen,
}) {
  const classes = useStyles();
  const theme = useTheme();

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
          <DrawerContent />
        </Drawer>
      </Hidden>
      {/*  Desktop Drawer */}
      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          style={{ display: protectedRoutes ? "initial" : "none" }}
        >
          <DrawerContent />
        </Drawer>
      </Hidden>
    </>
  );
}
