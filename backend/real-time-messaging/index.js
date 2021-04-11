const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  const userID = socket.handshake.auth.userID;
  if (!userID) {
    return next(new Error("invalid user ID"));
  }
  socket.userId = userID;
  next();
});

io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    // this gets all connected sockets in the server
    user.push({
      socketID: id, //The ID of the user's socket
      userID: socket.userId,
    });
  }
  socket.emit("users", users);

  socket.broadcast.emit("user connected", {
    socketID: socket.id,
    userID: socket.userId,
  });
  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });
});

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);