const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");

//  Search by username
router.get("/:searchText", authMiddleware, async (req, res) => {
  try {
    const { searchText } = req.params;
    const { userId } = req;

    if (searchText.length === 0) return;

    let userPattern = new RegExp(`^${searchText}`); // username should start with search text

    // Username  should match with searchtext
    const results = await UserModel.find({
      username: { $regex: userPattern, $options: "i" },
    });

    //  Remove current user from search
    const resultsToBeSent = results.filter(
      (result) => result._id.toString() !== userId
    );

    return res.status(200).json(resultsToBeSent);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
