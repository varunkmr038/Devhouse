const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");
const ChatModel = require("../models/ChatModel");
const NotificationModel = require("../models/NotificationModel");
const ProfileModel = require("../models/ProfileModel");
const PostModel = require("../models/PostModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

//  Fetching the user and follow stats and sending back response
router.get("/home", authMiddleware, async (req, res) => {
  const { userId } = req;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("No User found");
    }

    const userFollowStats = await FollowerModel.findOne({ user: userId });

    return res.status(200).json({ user, userFollowStats });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

//  Login
router.post("/", async (req, res) => {
  const { username, password } = req.body.user;

  try {
    const user = await UserModel.findOne({
      username: username.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).send("Incorrect Username or Password");
    }

    //  Check password using bcrypt
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).send("Incorrect Username or Password");
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

//  Delete User
router.delete("/:username", authMiddleware, async (req, res) => {
  try {
    //  Checking the current logged user to be root
    const { userId } = req;
    const user = await UserModel.findById(userId);

    if (user.role !== "root") {
      return res.status(401).send("Not Allowed");
    }

    const { username } = req.params;
    const deleteUser = await UserModel.findOne({
      username: username.toLowerCase(),
    });
    if (!deleteUser) {
      return res.status(404).send("No User exist");
    }

    const deleteUserId = deleteUser._id.toString();

    //1.  Delete Profile of the user
    await ProfileModel.findOneAndDelete({ user: deleteUserId });

    // 2. Delete Posts of user and comments and likes on other user post also
    let posts = await PostModel.find({});

    posts = posts.filter((post) => post.user.toString() !== deleteUserId);

    for (let i = 0; i < posts.length; i++) {
      posts[i].likes = posts[i].likes.filter(
        (like) => like.user.toString() !== deleteUserId
      );
      posts[i].comments = posts[i].comments.filter(
        (comment) => comment.user.toString() !== deleteUserId
      );
    }

    await PostModel.deleteMany({});
    await PostModel.insertMany(posts);

    // 3. Delete Notifications of user and remove him from other users notifications as well
    let notifications = await NotificationModel.find({});

    notifications = notifications.filter(
      (notification) => notification.user.toString() !== deleteUserId
    );

    for (let i = 0; i < notifications.length; i++) {
      notifications[i].notifications = notifications[i].notifications.filter(
        (notification) => notification.user.toString() !== deleteUserId
      );
    }

    await NotificationModel.deleteMany({});
    await NotificationModel.insertMany(notifications);

    // 4. Deleting chats of user and also from other users as well
    let chats = await ChatModel.find({});

    chats = chats.filter((chat) => chat.user.toString() !== deleteUserId);

    for (let i = 0; i < chats.length; i++) {
      chats[i].chats = chats[i].chats.filter(
        (chat) => chat.messagesWith.toString() !== deleteUserId
      );
    }

    await ChatModel.deleteMany({});
    await ChatModel.insertMany(chats);

    // 5. Deleting Follower Model
    let followers = await FollowerModel.find({});

    followers = followers.filter(
      (follower) => follower.user.toString() !== deleteUserId
    );

    for (let i = 0; i < followers.length; i++) {
      followers[i].followers = followers[i].followers.filter(
        (follower) => follower.user.toString() !== deleteUserId
      );
      followers[i].following = followers[i].following.filter(
        (following) => following.user.toString() !== deleteUserId
      );
    }

    await FollowerModel.deleteMany({});
    await FollowerModel.insertMany(followers);

    //  6. Now delete in user model
    await UserModel.findByIdAndDelete(deleteUserId);

    res.status(204).send("User deleted Successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
