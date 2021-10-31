import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";
import cookie from "js-cookie";
import { toast } from "react-toastify";

const Axios = axios.create({
  baseURL: `${baseUrl}/api/posts`,
  headers: { Authorization: cookie.get("token") },
});

export const submitNewPost = async (
  text,
  title,
  picUrl,
  setPosts,
  setNewPost
) => {
  try {
    const res = await Axios.post("/", { text, title, picUrl });

    setPosts((prev) => [res.data, ...prev]);
    setNewPost({ text: "", title: "" });
    toast.info("Post Uploaded 💃");
  } catch (error) {
    const errorMsg = catchErrors(error);
    toast.error(errorMsg);
  }
};

export const deletePost = async (postId, setPosts, setShowToastr) => {
  try {
    await Axios.delete(`/${postId}`);
    setPosts((prev) => prev.filter((post) => post._id !== postId));
    toast.info("Post Deleted");
  } catch (error) {
    toast.error(catchErrors(error));
  }
};

export const likePost = async (postId, userId, setLikes, like = true) => {
  try {
    if (like) {
      await Axios.post(`/like/${postId}`);
      setLikes((prev) => [...prev, { user: userId }]);
    }
    //
    else if (!like) {
      await Axios.put(`/unlike/${postId}`);
      setLikes((prev) => prev.filter((like) => like.user !== userId));
    }
  } catch (error) {
    toast.error(catchErrors(error));
  }
};

export const postComment = async (
  postId,
  user,
  commentText,
  setCommentText,
  setComments
) => {
  try {
    const res = await Axios.post(`/comment/${postId}`, { text: commentText });

    const newComment = {
      _id: res.data,
      user,
      text: commentText,
      date: Date.now(),
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  } catch (error) {
    console.error(error);
    toast.error(catchErrors(error));
  }
};

export const deleteComment = async (postId, commentId, setComments) => {
  try {
    await Axios.delete(`/${postId}/${commentId}`);
    setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    toast.info("Comment Deleted");
  } catch (error) {
    toast.error(catchErrors(error));
  }
};
