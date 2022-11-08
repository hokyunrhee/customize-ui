const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("update-over-head-display-layout", (message) => {
    io.emit("over-head-display-layout", message);
  });

  socket.on("update-tablet-layout", (message) => {
    io.emit("tablet-layout", message);
  });

  socket.on("update-mobile-layout", (message) => {
    io.emit("mobile-layout", message);
  });
});

server.listen(5050, () => {
  console.log("listening on *:5050");
});
