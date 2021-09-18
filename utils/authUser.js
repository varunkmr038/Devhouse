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
export const registerUser = async (user, setAlert) => {
  try {
    const res = await axios.post(`${baseUrl}/api/signup`, {
      user,
    });
    setAlert({
      message: "Welcome to Clubhouse 🔥",
      severity: "success",
      open: true,
    });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setAlert({ message: errorMsg, severity: "error", open: true }); // setting error alert
  }
};

// login
export const loginUser = async (user, setAlert) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth`, { user });
    setAlert({
      message: "Logged in Successfully 💯",
      severity: "success",
      open: true,
    });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setAlert({ message: errorMsg, severity: "error", open: true });
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
