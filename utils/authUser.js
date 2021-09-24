import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";
import Router from "next/router";
import cookie from "js-cookie";

//  setting the jwt cookie in local storage
const setToken = (token) => {
  cookie.set("token", token);
  setTimeout(() => {
    Router.push("/home");
  }, 2000);
};

//  Signup
export const registerUser = async (user, setSnack) => {
  try {
    const res = await axios.post(`${baseUrl}/api/signup`, {
      user,
    });
    setSnack({
      message: "Welcome to Clubhouse 🔥",
      severity: "success",
      open: true,
    });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setSnack({ message: errorMsg, severity: "error", open: true }); // setting error alert
  }
};

// login
export const loginUser = async (user, setSnack) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth`, { user });
    setSnack({
      message: "Logged in Successfully 💯",
      severity: "success",
      open: true,
    });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setSnack({ message: errorMsg, severity: "error", open: true });
  }
};

//  Redirect to location
export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    // if the user is on server side
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    // if the user on client side
    Router.push(location);
  }
};

//  logout User
export const logoutUser = (username) => {
  cookie.remove("token");
  Router.push("/");
  Router.reload();
};
