import React from "react";

import { socketClient } from "@/api/socket-client";
import { useSocketQuery } from "@/hooks/use-socket-query";
import { Widget } from "../widget/widget";
import { HStack } from "@chakra-ui/react";

export function MIPOverHead() {
  const { data } = useSocketQuery("over-head-display-layout", socketClient);

  return (
    <HStack>
      {data?.map((item) => {
        return <Widget {...item} />;
      })}
    </HStack>
  );
}
