import React, { useEffect } from "react";

import { socketClient } from "@/api/socket-client";
import { OverheadWidgetsLayout } from "@/components/overhead-widgets-layout";

type Props = {};

const OverheadDisplay = (props: Props) => {
  useEffect(() => {
    socketClient.connect();

    return () => {
      socketClient.off();
      socketClient.disconnect();
    };
  }, []);

  const updateOverHeadDisplayLayout = (data: any) => {
    socketClient.emit("update-over-head-display-layout", data);
  };

  // const updateTabletLayout = () => {
  //   socketClient.emit("update-tablet-layout", Math.random() * 1000);
  // };

  // const updateMobileLayout = () => {
  //   socketClient.emit("update-mobile-layout", Math.random() * 1000);
  // };

  return <OverheadWidgetsLayout updateLayout={updateOverHeadDisplayLayout} />;
};

export default OverheadDisplay;
