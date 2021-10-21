const { addUser, removeUser, findConnectedUser } = require("./roomActions");
const { loadMessages, sendMsg, setMsgToUnread } = require("./messageActions");
const PeerUserModel = require("../models/PeerUserModel");
const RoomModel = require("../models/RoomModel");

const joinMeetListener = async (
  socket,
  roomId,
  peerId,
  userId,
  name,
  audio,
  video
) => {
  // // add peer details
  await PeerUserModel({
    peerId: peerId,
    name: name,
    audio: audio,
    video: video,
  }).save();

  // find room
  const roomData = await RoomModel.findById(roomId);
  roomData.count = roomData.count + 1;
  await roomData.save();

  // subscribe my socket to room
  socket.join(roomId);

  //  Emit to other users in room
  socket
    .to(roomId)
    .emit("user-connected", peerId, name, audio, video, roomData.count);

  socket.on("audio-toggle", async (type) => {
    await PeerUserModel.updateOne({ peerId: peerId }, { audio: type });
    socket.to(roomId).emit("user-audio-toggle", peerId, type);
  });

  socket.on("video-toggle", async (type) => {
    await PeerUserModel.updateOne({ peerId: peerId }, { video: type });
    socket.to(roomId).emit("user-video-toggle", peerId, type);
  });

  // chat
  socket.on("client-send", (data) => {
    socket.to(roomId).emit("client-podcast", data, name);
  });

  socket.on("disconnect", async () => {
    const curRoomData = await RoomModel.findById(roomId);
    curRoomData.count = curRoomData.count - 1;
    await curRoomData.save();
    // // remove peer details
    await PeerUserModel.deleteOne({ peerId: peerId });
    socket.to(roomId).emit("user-disconnected", peerId, curRoomData.count);
  });
};

const joinListener = async (socket, userId) => {
  const users = await addUser(userId, socket.id); // add me to the sockets

  setInterval(() => {
    socket.emit("connectedUsers", {
      users: users.filter((user) => user.userId !== userId),
    });
  }, 10000); // after every 10 seconds connected users will be sent to client
};

const loadMessagesListener = async (socket, userId, messagesWith) => {
  const { chat, error } = await loadMessages(userId, messagesWith);

  !error ? socket.emit("messagesLoaded", { chat }) : socket.emit("noChatFound");
};

const sendNewMsgListener = async (io, socket, userId, msgSendToUserId, msg) => {
  const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
  //  If the user already in sockets that is online
  const receiverSocket = findConnectedUser(msgSendToUserId);

  if (receiverSocket) {
    // WHEN YOU WANT TO SEND MESSAGE TO A PARTICULAR SOCKET
    io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
  }
  // otherwise save msg in database
  else {
    await setMsgToUnread(msgSendToUserId);
  }

  !error && socket.emit("msgSent", { newMsg });
};

const disconnectListener = async (socket) => {
  await removeUser(socket.id);
};

module.exports = {
  joinMeetListener,
  joinListener,
  loadMessagesListener,
  sendNewMsgListener,
  disconnectListener,
};
