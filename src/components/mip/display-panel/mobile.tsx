import React from "react";

import { socketClient } from "@/api/socket-client";
import { useSocketQuery } from "@/hooks/use-socket-query";
import { HStack, Stack, Box, Grid } from "@chakra-ui/react";
import { Widget } from "../widget/widget";

export function MIPMobile() {
  const { data } = useSocketQuery("mobile-layout", socketClient);

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap="5px"
      justifyContent="space-around"
      width="100%"
    >
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
    </Grid>
  );
}
