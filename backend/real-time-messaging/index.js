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

io.on("connection", (socket)=>{
  
})