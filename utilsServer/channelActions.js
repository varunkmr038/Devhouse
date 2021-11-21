const ChannelModel = require("../models/ChannelModel");
const UserModel = require("../models/UserModel");

const loadChannelMessages = async (userId, channelId) => {
  try {
    const channel = await ChannelModel.findById(channelId)
      .populate("messages.sender", "name")
      .populate("members.user");

    if (!channel) {
      return { error: "No Channel found" };
    }

    return { channel };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const sendMsgChannel = async (userId, channelId, msg) => {
  try {
    // Channel
    const channel = await ChannelModel.findById(channelId);

    const newMsg = {
      sender: userId,
      msg,
      date: Date.now(),
    };

    const user = await UserModel.findById(userId);
    newMsg.sender = user;

    channel.messages.push(newMsg);
    await channel.save();

    return { newMsg };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

module.exports = { loadChannelMessages, sendMsgChannel };
