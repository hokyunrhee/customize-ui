import { io } from "socket.io-client";

export const socketClient = io("http://localhost:5050", {
  transports: ["websocket"],
  autoConnect: false,
});
