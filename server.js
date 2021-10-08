const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dev = process.env.NODE_ENV !== "production";
const next = require("next");
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const {
  joinListener,
  loadMessagesListener,
  sendNewMsgListener,
  disconnectListener,
} = require("./utilsServer/socketServer");

// Middlewares
dotenv.config({ path: "./config.env" });
// Body parser (reading data from body to req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connecting to mongodb database
const db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection Successful"))
  .catch((err) => {
    console.log(err + "DATABASE ERROR 🔥");
    process.exit(1);
  });

//  On connection establish with frontend
io.on("connection", (socket) => {
  socket.on("join", async ({ userId }) => joinListener(socket, userId));

  socket.on("loadMessages", async ({ userId, messagesWith }) =>
    loadMessagesListener(socket, userId, messagesWith)
  );

  socket.on("sendNewMsg", async ({ userId, msgSendToUserId, msg }) =>
    sendNewMsgListener(io, socket, userId, msgSendToUserId, msg)
  );

  socket.on("disconnect", () => disconnectListener(socket));
});

nextApp.prepare().then(() => {
  // Api
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/search", require("./api/search"));
  app.use("/api/posts", require("./api/posts"));
  app.use("/api/profile", require("./api/profile"));
  app.use("/api/notifications", require("./api/notifications"));
  app.use("/api/chats", require("./api/chats"));

  app.all("*", (req, res) => handle(req, res)); // for files in pages folder to work

  server.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
});
