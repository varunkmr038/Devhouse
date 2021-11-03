import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";
import cookie from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";

const Axios = axios.create({
  baseURL: `${baseUrl}/api/profile`,
  headers: { Authorization: cookie.get("token") },
});

export const followUser = async (userToFollowId, setLoggedUserFollowStats) => {
  try {
    await Axios.post(`/follow/${userToFollowId}`);

    setLoggedUserFollowStats((prev) => ({
      ...prev,
      following: [...prev.following, { user: userToFollowId }],
    }));
  } catch (error) {
    toast.error(catchErrors(error));
  }
};

export const unfollowUser = async (
  userToUnfollowId,
  setLoggedUserFollowStats
) => {
  try {
    await Axios.put(`/unfollow/${userToUnfollowId}`);

    setLoggedUserFollowStats((prev) => ({
      ...prev,
      following: prev.following.filter(
        (following) => following.user !== userToUnfollowId
      ),
    }));
  } catch (error) {
    toast.error(catchErrors(error));
  }
};

export const profileUpdate = async (profileState, profilePicUrl) => {
  try {
    const { bio, position, github, linkedin, resume, collab, skills } =
      profileState;

    await Axios.put(`/update`, {
      bio,
      position,
      github,
      linkedin,
      resume,
      collab,
      skills,
      profilePicUrl,
    });

    Router.reload();
    toast.success("Profile Updated");
  } catch (error) {
    toast.error(catchErrors(error));
  }
};

export const passwordUpdate = async (userPasswords) => {
  const { currentPassword, newPassword } = userPasswords;
  try {
    await Axios.post(`/settings/password`, { currentPassword, newPassword });

    toast.success("Password updated Successfully");
  } catch (error) {
    toast.error(catchErrors(error));
  }
};
