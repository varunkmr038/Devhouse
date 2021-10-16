const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//peerUser information
const PeerUserSchema = new Schema(
  {
    peerId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    //audio
    audio: {
      type: Boolean,
      required: true,
    },
    //video
    video: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("PeerUser", PeerUserSchema);
