import React, { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";

import { io } from "socket.io-client";

const socketClient = io("http://localhost:5050", {
  transports: ["websocket"],
  autoConnect: false,
});

const Settings = () => {
  useEffect(() => {
    socketClient.connect();

    return () => {
      socketClient.off();
      socketClient.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socketClient.emit("update", Math.random() * 1000);
  };

  return (
    <Box>
      <Button onClick={sendMessage}>Update</Button>
    </Box>
  );
};

export default Settings;
