const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const uuid = require("uuid").v4;
const {
  newLikeNotification,
  removeLikeNotification,
  newCommentNotification,
  removeCommentNotification,
} = require("../utilsServer/notificationActions");

// CREATE A POST
router.post("/", authMiddleware, async (req, res) => {
  const { text, location, picUrl } = req.body;

  if (text.length < 1)
    return res.status(401).send("Text must be atleast 1 character");

  try {
    const newPost = {
      user: req.userId,
      text,
    };
    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;

    const post = await new PostModel(newPost).save();

    const postCreated = await PostModel.findById(post._id).populate("user");

    return res.json(postCreated);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// GET ALL POSTS
router.get("/", authMiddleware, async (req, res) => {
  const { pageNumber } = req.query;

  const number = Number(pageNumber); // convert to number
  const size = 8; // 8 posts on one page

  try {
    let posts;

    //  for page no 1
    if (number === 1) {
      posts = await PostModel.find()
        .limit(size) // limit docs to 8
        .sort({ createdAt: -1 }) // sort by descending time
        .populate("user")
        .populate("comments.user");
    }
    // for pages>1
    else {
      const skips = size * (number - 1); // docs to skip
      posts = await PostModel.find()
        .skip(skips) // skips the starting docs
        .limit(size)
        .sort({ createdAt: -1 })
        .populate("user")
        .populate("comments.user");
    }

    if (posts.length === 0) {
      return res.json([]);
    }

    let postsToBeSent = [];
    const { userId } = req;

    const loggedUser = await FollowerModel.findOne({ user: userId });

    if (!loggedUser) {
      return res.status(404).send(`User no longer exists`);
    }

    //  If my following is zero then show me only my post
    if (loggedUser.following.length === 0) {
      postsToBeSent = posts.filter(
        (post) => post.user._id.toString() === userId
      );
    }
    //
    else {
      //  Iterate over my following
      for (let i = 0; i < loggedUser.following.length; i++) {
        const foundPostsFromFollowing = posts.filter(
          (post) =>
            post.user._id.toString() === loggedUser.following[i].user.toString() // checking that post belongs to following user or not
        );

        if (foundPostsFromFollowing.length > 0)
          postsToBeSent.push(...foundPostsFromFollowing);
      }

      const foundOwnPosts = posts.filter(
        (post) => post.user._id.toString() === userId // My own post
      );
      if (foundOwnPosts.length > 0) postsToBeSent.push(...foundOwnPosts);
    }

    postsToBeSent.length > 0 &&
      postsToBeSent.sort((a, b) => [
        new Date(b.createdAt) - new Date(a.createdAt), // sort accoding to descending time
      ]);

    return res.json(postsToBeSent);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// GET POST BY ID
router.get("/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId)
      .populate("user")
      .populate("user.comments");

    if (!post) {
      return res.status(404).send("Post not found");
    }

    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// DELETE POST
router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    // get current login user id
    const { userId } = req;

    const { postId } = req.params;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("post not found");
    }

    const user = await UserModel.findById(userId);

    //  If post  user id dont match with current user then check if it is admin
    if (post.user.toString() !== userId) {
      if (user.role === "root") {
        await PostModel.deleteOne(post);
        return res.status(200).send("Post deleted Successfully");
      } else {
        return res.status(401).send("Unauthorized");
      }
    }

    //  Current user is creator of this post So delete
    await PostModel.deleteOne(post);
    return res.status(200).send("Post deleted Successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// LIKE A POST
router.post("/like/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("No Post found");
    }

    //  If current userid is in likes array
    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length > 0;

    if (isLiked) {
      return res.status(401).send("Post already liked");
    }
    //  If user not in list add it to the beginning of the list
    await post.likes.unshift({ user: userId });
    await post.save();

    if (post.user.toString() !== userId) {
      await newLikeNotification(userId, postId, post.user.toString());
    }

    return res.status(200).send("Post liked");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// UNLIKE A POST
router.put("/unlike/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send("No Post found");
    }

    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length === 0;

    //  If user not in the likes list then return
    if (isLiked) {
      return res.status(401).send("Post not liked before");
    }

    //  If user in the list then find the index
    const index = post.likes
      .map((like) => like.user.toString()) // creates an array of userid only
      .indexOf(userId);

    // remove the user from likes
    await post.likes.splice(index, 1);

    await post.save();

    if (post.user.toString() !== userId) {
      await removeLikeNotification(userId, postId, post.user.toString());
    }

    return res.status(200).send("Post Unliked");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// GET ALL LIKES OF A POST
router.get("/like/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findById(postId).populate("likes.user");
    if (!post) {
      return res.status(404).send("No Post found");
    }

    return res.status(200).json(post.likes);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// CREATE A COMMENT
router.post("/comment/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const { text } = req.body;

    if (text.length < 1)
      return res.status(401).send("Comment should be atleast 1 character");

    const post = await PostModel.findById(postId);

    if (!post) return res.status(404).send("Post not found");

    const newComment = {
      _id: uuid(), //overriding the default object id  (generates unique id) so I can access object id of comments
      text,
      user: req.userId,
      date: Date.now(),
    };

    await post.comments.unshift(newComment);
    await post.save();

    if (post.user.toString() !== userId) {
      await newCommentNotification(
        postId,
        newComment._id,
        userId,
        post.user.toString(),
        text
      );
    }

    return res.status(200).json(newComment._id); // accessing _id
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

// DELETE A COMMENT
router.delete("/:postId/:commentId", authMiddleware, async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("Post not found");

    const comment = post.comments.find((comment) => comment._id === commentId);
    if (!comment) {
      return res.status(404).send("No Comment found");
    }

    const user = await UserModel.findById(userId);

    const deleteComment = async () => {
      const indexOf = post.comments
        .map((comment) => comment._id)
        .indexOf(commentId);

      await post.comments.splice(indexOf, 1);

      await post.save();

      if (post.user.toString() !== userId) {
        await removeCommentNotification(
          postId,
          commentId,
          userId,
          post.user.toString()
        );
      }

      return res.status(200).send("Deleted Successfully");
    };

    if (comment.user.toString() !== userId) {
      if (user.role === "root") {
        await deleteComment();
      } else {
        return res.status(401).send("Unauthorized");
      }
    }

    await deleteComment();
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
