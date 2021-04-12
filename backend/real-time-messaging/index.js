const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("A user has been connected ",socket.id);
  socket.on("disconnect", () => console.log("A user has been disconnect",socket.id));
  io.emit("ServerAdmin", "You are conntected");
  socket.on("chat message", (msg) => {
    console.log("A user sent the following message:", msg);
    io.emit("chat message", msg);
  });
});

server.listen(7000, () => console.log("Server Started"));
