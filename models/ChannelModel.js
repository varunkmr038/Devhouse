const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  messages: [
    {
      msg: { type: String, required: true },
      sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
      date: { type: Date },
    },
  ],
});

module.exports = mongoose.model("Channel", ChannelSchema);
