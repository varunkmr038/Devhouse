const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;
const authMiddleware = require("../middleware/authMiddleware");
const RoomModel = require("../models/RoomModel");
const PeerUserModel = require("../models/PeerUserModel");
const UserModel = require("../models/UserModel");

//  Creating a new meeting and redirect to meeting
router.post("/new-meeting", authMiddleware, async (req, res) => {
  try {
    const newRoom = {
      _id: uuid(),
      user: req.userId, // host
      count: 0,
    };

    await new RoomModel(newRoom).save();
    return res.json(newRoom._id);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// Get user peer data
router.get("/user/:peerId", async (req, res) => {
  res.json({
    user: await PeerUserModel.findOne({ peerId: req.params.peerId }),
  });
});

// get Room and user Data
router.get("/:roomId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { roomId } = req.params;
    const user = await UserModel.findById(userId);
    const roomData = await RoomModel.findById(roomId);

    if (!roomData) {
      res.status(404).send("No Meet found");
    }

    res.json({ user, roomData });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
