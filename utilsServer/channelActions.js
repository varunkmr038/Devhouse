const ChannelModel = require("../models/ChannelModel");

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

module.exports = { loadChannelMessages };
