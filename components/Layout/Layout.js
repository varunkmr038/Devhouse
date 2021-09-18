import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import HeadTags from "./HeadTags";
import Footer from "./Footer";
import Navbar from "./Navbar";
import theme from "../../utils/theme";

function Layout({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HeadTags />

        <Navbar />

        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default Layout;
