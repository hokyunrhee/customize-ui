import React, { useEffect } from "react";

import { socketClient } from "@/api/socket-client";
import { Button } from "@chakra-ui/react";
import { useSocketQuery } from "@/hooks/use-socket-query";

export function MIPTabletSetting() {
  const { data } = useSocketQuery("tablet-layout", socketClient);

  const updateTabletLayout = () => {
    socketClient.emit("update-tablet-layout", Math.random() * 1000);
  };

  return <Button onClick={updateTabletLayout}>Tablet Save</Button>;
}
