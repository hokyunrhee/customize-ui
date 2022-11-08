import React from "react";

import { socketClient } from "@/api/socket-client";
import { useSocketQuery } from "@/hooks/use-socket-query";

export const Tablet = () => {
  const { data } = useSocketQuery("tablet-layout", socketClient);

  return <div>Tablet</div>;
};
