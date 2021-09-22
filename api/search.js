const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");

//  Search by name
router.get("/:searchText", authMiddleware, async (req, res) => {
  try {
    const { searchText } = req.params;

    if (searchText.length === 0) return;

    let userPattern = new RegExp(`^${searchText}`); // username should start with search text

    // Username or name should match with searchtext
    const results = await UserModel.find({
      $or: [
        { name: { $regex: userPattern, $options: "i" } }, // case insensitive
        { username: { $regex: userPattern, $options: "i" } },
      ],
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
