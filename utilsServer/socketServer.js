const { addUser, removeUser, findConnectedUser } = require("./roomActions");
const { loadMessages, sendMsg, setMsgToUnread } = require("./messageActions");

const joinListener = async (socket, userId) => {
  const users = await addUser(userId, socket.id); // add me to the sockets
  // console.log(users);

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
  joinListener,
  loadMessagesListener,
  sendNewMsgListener,
  disconnectListener,
};
