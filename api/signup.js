const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");
const ProfileModel = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const NotificationModel = require("../models/NotificationModel");
const ChatModel = require("../models/ChatModel");

//  To verify username is present in database or not
//  Checking Username availabilty
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    //  Checking user present with same email or username or not
    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (user) return res.status(401).send("Username already taken");

    return res.status(200).send("Available");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

//  Sign Up
router.post("/", async (req, res) => {
  const { name, email, username, phone, password } = req.body.user;

  try {
    let user;
    //  Checking user present with same email or username or not
    user = await UserModel.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (user) {
      return res
        .status(401)
        .send("User already registered with same email or username");
    }

    user = new UserModel({
      name,
      email,
      username,
      phone,
      password,
      profilePicUrl: "/img/defaultUser.jpg",
    });

    //password hashing
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    await new ProfileModel({
      user: user._id,
    }).save();
    await new FollowerModel({
      user: user._id,
      followers: [],
      following: [],
    }).save();
    await new NotificationModel({ user: user._id, notifications: [] }).save();
    await new ChatModel({ user: user._id, chats: [] }).save();

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

module.exports = router;
