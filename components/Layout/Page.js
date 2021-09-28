import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Toolbar, Container } from "@material-ui/core";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  container: {
    marginLeft: theme.spacing(50),
  },
}));

export default function Page({ children }) {
  const classes = useStyles();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />

        <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <SideMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Container maxWidth={router.pathname == "/" ? false : "lg"}>
          <main className={`mt-0  ${classes.content}`}>
            <Toolbar />
            {children}
          </main>
        </Container>
      </div>
    </>
  );
}
