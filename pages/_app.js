import App from "next/app";
import Layout from "../components/Layout/Layout";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";
import "bootstrap/dist/css/bootstrap.css";
import "../public/css/globals.css";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies"; // Cookies helper for nextjs
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/authUser";

// My app is common for all pages
class MyApp extends App {
  //  We have to add getInitialProps method in our custom app so that it can be used by every page
  static async getInitialProps({ Component, ctx }) {
    // ctx(context)=current active page

    const { token } = parseCookies(ctx); // this token is  same as cookie.set("token", token) in authuser
    let pageProps = {};

    const protectedRoutes = ctx.pathname === "/home";

    // if (!token) {
    //   //  If user is trying to access the protected route redirect the user
    //   protectedRoutes && redirectUser(ctx, "/");
    // } else {
    //   //  If the current page is requesting getinitialprops
    //   if (Component.getInitialProps) {
    //     pageProps = await Component.getInitialProps(ctx); // getting props from page getinitial
    //   }

    //   try {
    //     const res = await axios.get(`${baseUrl}/api/auth/home`, {
    //       headers: { Authorization: token },
    //     });

    //     const { user, userFollowStats } = res.data;

    //     //  If user exists with token and trying to access the non protected routes i.e login redirect to homepage
    //     if (user) !protectedRoutes && redirectUser(ctx, "/home");

    //     pageProps.user = user; // For all protected pages
    //     pageProps.userFollowStats = userFollowStats;
    //   } catch (error) {
    //     destroyCookie(ctx, "token");
    //     redirectUser(ctx, "/");
    //   }
    // }

    pageProps.protectedRoutes = protectedRoutes;
    return { pageProps };
  }
  //  Common layout for all the pages
  // component = page
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}

export default MyApp;
