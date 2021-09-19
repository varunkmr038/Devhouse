import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import HeadTags from "./HeadTags";
import Footer from "./Footer";
import theme from "../../utils/theme";
import Menu from "./Menu";

function Layout({ children, protectedRoutes }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HeadTags />
        <Menu protectedRoutes={protectedRoutes} />

        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default Layout;
