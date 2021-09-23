const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" }, // ref to user model

    text: { type: String, required: true },

    location: { type: String },

    picUrl: { type: String },

    likes: [{ user: { type: Schema.Types.ObjectId, ref: "User" } }],

    comments: [
      {
        _id: { type: String, required: true }, // every comment has unique id
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now }, // date on which comment is made
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
