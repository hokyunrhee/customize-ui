import React, { useEffect } from "react";

import { socketClient } from "@/api/socket-client";

const Settings = () => {
  useEffect(() => {
    socketClient.connect();

    return () => {
      socketClient.off();
      socketClient.disconnect();
    };
  }, []);

  const updateOverHeadDisplayLayout = () => {
    socketClient.emit("update-over-head-display-layout", Math.random() * 1000);
  };

  const updateTabletLayout = () => {
    socketClient.emit("update-tablet-layout", Math.random() * 1000);
  };

  const updateMobileLayout = () => {
    socketClient.emit("update-mobile-layout", Math.random() * 1000);
  };

  return (
    <div>
      <button onClick={updateOverHeadDisplayLayout}>Save</button>
      <button onClick={updateTabletLayout}>Save</button>
      <button onClick={updateMobileLayout}>Save</button>
    </div>
  );
};

export default Settings;
