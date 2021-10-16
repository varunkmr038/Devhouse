const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//for storing meeting's information
const RoomSchema = new Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" }, // meet host
    count: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Room", RoomSchema);
