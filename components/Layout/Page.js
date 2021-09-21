import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Toolbar } from "@material-ui/core";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Page({ children, protectedRoutes }) {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />

        <Navbar
          protectedRoutes={protectedRoutes}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <SideMenu
          protectedRoutes={protectedRoutes}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main className={`mt-0 ${classes.content}`}>
          <Toolbar />
          {/* Every page is rendered in this */}
          {children}
        </main>
      </div>
    </>
  );
}
