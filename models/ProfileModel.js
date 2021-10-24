const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" }, // points to user

    bio: { type: String },
    github: { type: String },
    resume: { type: String },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
