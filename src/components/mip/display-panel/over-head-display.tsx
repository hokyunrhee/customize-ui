import React from "react";

import { socketClient } from "@/api/socket-client";
import { useSocketQuery } from "@/hooks/use-socket-query";
import { Widget } from "../widget/widget";
import { HStack, Box, Stack } from "@chakra-ui/react";

export function MIPOverHead() {
  const { data } = useSocketQuery("over-head-display-layout", socketClient);

  return (
    <HStack>
      {data?.map((item) => {
        if ("children" in item) {
          console.log(item);

          return (
            <Stack key={item.key} spacing="0">
              {item?.children.map((childItem) => {
                return <Widget {...childItem} key={childItem.role} />;
              })}
            </Stack>
          );
        }
        return (
          <Box key={item.key}>
            <Widget {...item} />
          </Box>
        );
      })}
    </HStack>
  );
}
