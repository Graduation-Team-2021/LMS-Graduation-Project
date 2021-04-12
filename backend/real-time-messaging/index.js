const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);


const corsOptions = {
  cors: true,
  origins: ["http://localhost:9000"],
};
const io = require("socket.io")(server, corsOptions);


io.use((socket, next) => {
  const UserID = socket.handshake.auth.userID;
  console.log(UserID)
  if (!UserID) {
    return next(new Error("invalid UserID"));
  }
  socket.userId = UserID;
  next();
});

io.on("connection", (socket) => {
  console.log(socket.id);
  // fetch existing users
  const users = []; // this piece of code is fucken important
  for (let [id, socket] of io.of("/").sockets) {

    users.push({
      socketid: id,
      userID: socket.userId,
    });
  }
  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    socketid: socket.id,
    userID: socket.userId,
  });

  // forward the private message to the right recipient
  socket.on("private message", ({ content, to }) => { //this piece of code is fucken important
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });

  // notify users upon disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });
});


server.listen(9000, () => console.log("Server Started"));
