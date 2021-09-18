const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");
const ProfileModel = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const regex = {
  name: /^[a-zA-Z]{3,20}(\s)?([a-zA-Z]){0,20}(\s+)?$/,
  email:
    /^([a-zA-Z0-9])([A-Za-z0-9]|(_(?!_))|(-(?!-))|(\.(?!\.))){2,58}[a-zA-Z0-9]@[a-zA-Z]([a-zA-Z0-9-]){2,19}[.]{1}([a-z]){1,6}[.]{0,1}[a-z]{1,5}$/,
  username: /^[a-z]([0-9a-z_]){4,19}$/,
  dob: /^(0?[1-9]|[1-2]?[0-9]|3?[0-1])-(0?[1-9]|1?[0-2])-((1?[9][2-9][0-9])|(2?[0][0-2][0-9]))$/,
  phone: /^([7-9])([0-9]){9}$/,
  password:
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&^])([a-zA-Z0-9@$!%*?&^]{8,30})$/,
};

//  To verify username is present in database or not
//  Checking Username availabilty
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    if (!regex.username.test(username))
      return res.status(401).send("Invalid Username");

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
  const { name, email, username, dob, phone, password } = req.body.user;

  //  Validating user on backend also
  if (!regex.name.test(name)) return res.status(401).send("Please Enter Name");
  if (!regex.email.test(email)) return res.status(401).send("Invalid Email");
  if (!regex.username.test(username))
    return res.status(401).send("Invalid Username");
  if (!regex.dob.test(dob)) return res.status(401).send("Invalid dob");
  if (!regex.phone.test(phone)) return res.status(401).send("Invalid phone no");
  if (!regex.password.test(password))
    return res.status(401).send("Invalid password");

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
      dob,
      phone,
      password,
    });

    //password hashing
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    //  Creating Profile model
    await new ProfileModel({
      user: user._id,
    }).save();

    //  Creating follower model
    await new FollowerModel({
      user: user._id,
      followers: [],
      following: [],
    }).save();

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
