import React from "react";

import { socketClient } from "@/api/socket-client";
import { useSocketQuery } from "@/hooks/use-socket-query";

export const OverHeadDisplay = () => {
  const { data } = useSocketQuery("over-head-display-layout", socketClient);

  return <div>OverHeadDisplay</div>;
};
