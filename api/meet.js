const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;
const authMiddleware = require("../middleware/authMiddleware");
const RoomModel = require("../models/RoomModel");

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

// get Room Data
router.get("/:roomId", authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const roomData = await RoomModel.findById(roomId);

    if (!roomData) {
      return res.status(404).send("No Meet Found");
    }
    return res.json(roomData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
