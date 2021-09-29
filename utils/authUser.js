import axios from "axios";
import baseUrl from "./baseUrl";
import Router from "next/router";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import catchErrors from "./catchErrors";

//  setting the jwt cookie in local storage
const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/home");
};

//  Signup
export const registerUser = async (user) => {
  try {
    const res = await axios.post(`${baseUrl}/api/signup`, {
      user,
    });

    setToken(res.data);
    toast.success("Welcome to Clubhouse 🔥");
  } catch (error) {
    const errorMsg = catchErrors(error);
    toast.error(errorMsg);
  }
};

// login
export const loginUser = async (user) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth`, { user });

    setToken(res.data);
    toast.success("Logged in Successfully");
  } catch (error) {
    const errorMsg = catchErrors(error);
    toast.error(errorMsg);
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
  toast.success("Logged Out Successfully");
};
