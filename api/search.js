const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");

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

//  Search by skills
router.post("/teammates", authMiddleware, async (req, res) => {
  try {
    const { skills } = req.body;
    const { userId } = req;

    let userProfiles = await ProfileModel.find().populate("user");

    userProfiles = userProfiles.filter(
      (profile) => profile.user._id.toString() !== userId
    );

    let profilesToBeSent = [];

    for (let i = 0; i < userProfiles.length; i++) {
      let curSkills = userProfiles[i].skills;

      let flag = 0;
      for (let j = 0; j < skills.length; j++) {
        flag = 0;
        for (let k = 0; k < curSkills.length; k++) {
          if (skills[j].toLowerCase() == curSkills[k].toLowerCase()) {
            flag = 1;
          }
        }
        if (flag == 0) {
          // if search skill is not present in cur user skill
          break;
        }
      }

      if (flag == 1) {
        profilesToBeSent.push(userProfiles[i]);
      }
    }

    return res.status(200).json(profilesToBeSent);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
