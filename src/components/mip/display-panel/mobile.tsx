import React from "react";

import { socketClient } from "@/api/socket-client";
import { useSocketQuery } from "@/hooks/use-socket-query";
import { HStack } from "@chakra-ui/react";
import { Widget } from "../widget/widget";

export function MIPMobile() {
  const { data } = useSocketQuery("mobile-layout", socketClient);

  return (
    <HStack>
      {data?.map((item) => {
        return <Widget {...item} />;
      })}
    </HStack>
  );
}
