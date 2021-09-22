import React, { createContext } from "react";
import HeadTags from "./HeadTags";
import Footer from "./Footer";
import Page from "./Page";

export const UserContext = createContext();

function Layout({ children, protectedRoutes, user, userFollowStats }) {
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
