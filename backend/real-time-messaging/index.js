const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);


corsOptions = {
  cors: true,
  origins: ["http://localhost:9000"],
};
const io = require("socket.io")(server, corsOptions);

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

server.listen(9000, () => console.log("Server Started"));
