const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" }, // points to user

    bio: { type: String },
    position: { type: String },
    github: { type: String },
    linkedin: { type: String },
    resume: { type: String },
    collab: { type: Boolean, default: false },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
