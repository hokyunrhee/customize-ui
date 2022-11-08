import React from "react";

import { socketClient } from "@/api/socket-client";
import { useSocketQuery } from "@/hooks/use-socket-query";

export const Mobile = () => {
  const { data } = useSocketQuery("mobile-layout", socketClient);

  return <div>mobile</div>;
};
