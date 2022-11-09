const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("overhead", (message) => {
    io.emit("overhead", message);
  });

  socket.on("tablet", (message) => {
    io.emit("tablett", message);
  });

  socket.on("mobile", (message) => {
    io.emit("mobile", message);
  });
});

server.listen(5050, () => {
  console.log("listening on *:5050");
});
