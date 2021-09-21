import React from "react";
import HeadTags from "./HeadTags";
import Footer from "./Footer";
import Page from "./Page";

function Layout({ children, protectedRoutes }) {
  return (
    <>
      <HeadTags />
      <Page protectedRoutes={protectedRoutes}>
        {/* Children = pages */}
        {children}
      </Page>
      <Footer />
    </>
  );
}

export default Layout;
