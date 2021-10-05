const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

//  Fetching the user and follow stats and sending back response
router.get("/home", authMiddleware, async (req, res) => {
  const { userId } = req;

  try {
    const user = await UserModel.findById(userId);

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
      expiresIn: "10d",
    });

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
