const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("update", (message) => {
    io.emit("message", message);
  });

  socket.emit("message", "Connected");
});

server.listen(5050, () => {
  console.log("listening on *:5050");
});
