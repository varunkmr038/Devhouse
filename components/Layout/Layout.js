import React, { createContext } from "react";
import HeadTags from "./HeadTags";
import Footer from "./Footer";
import Page from "./Page";
import nprogress from "nprogress";
import Router from "next/router";

export const UserContext = createContext();

function Layout({ children, protectedRoutes, user, userFollowStats }) {
  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  return (
    <>
      <HeadTags />
      <UserContext.Provider
        value={{
          protectedRoutes,
          user,
          userFollowStats,
        }}
      >
        <Page>
          {/* Children = pages */}
          {children}
        </Page>
      </UserContext.Provider>
      <Footer />
    </>
  );
}

export default Layout;
