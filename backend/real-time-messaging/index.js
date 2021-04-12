const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const index = require("./routes/index");
app.use(index);

const io = require("socket.io")(server, {
  log: false,
  "close timeout": 60,
  "heartbeat timeout": 60,
  "heartbeat interval": 20,
});

io.on("connection", (socket) => {
  console.log("A user has been connected ", socket.id);
  socket.on("disconnect", () =>
    console.log("A user has been disconnect", socket.id)
  );
  io.emit("ServerAdmin", "You are conntected");
  socket.on("chat message", (msg) => {
    console.log("A user sent the following message:", msg);
    io.emit("chat message", msg);
  });
});

server.listen(7000, () => console.log("Server Started"));
