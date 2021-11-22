const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, uppercase: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true, select: false },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: { type: String },

    profilePicUrl: { type: String },

    unreadMessage: { type: Boolean, default: false },

    unreadNotification: { type: Boolean, default: false },

    role: { type: String, default: "user", enum: ["user", "root"] },

    resetToken: { type: String },

    expireToken: { type: Date },
  },
  { timestamps: true } // timestamp when the user is created
);

module.exports = mongoose.model("User", userSchema);
