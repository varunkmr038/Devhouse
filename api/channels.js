const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const ChannelModel = require("../models/ChannelModel");
const ChatModel = require("../models/ChatModel");
const authMiddleware = require("../middleware/authMiddleware");

// Create Channel
router.post("/:channelName", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { channelName } = req.params;

    const channel = await new ChannelModel({
      name: channelName,
      members: [{ user: userId }],
    }).save();

    return res.send(channel);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// GET all channels info of my
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;

    const channels = await ChannelModel.find()
      .populate("members.user")
      .populate("messages.sender", "name");

    let channelsToSent = [];
    for (let i = 0; i < channels.length; i++) {
      let curChannel = channels[i];

      const isMyChannel = curChannel.members.filter(
        (member) => member.user._id == userId
      ).length;

      if (isMyChannel > 0) channelsToSent.unshift(curChannel);
    }

    return res.json(channelsToSent);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
