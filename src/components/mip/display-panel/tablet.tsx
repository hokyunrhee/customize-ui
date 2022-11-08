import React from "react";

import { socketClient } from "@/api/socket-client";
import { useSocketQuery } from "@/hooks/use-socket-query";
import {
  AspectRatio,
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import { Widget } from "../widget/widget";

export function MIPTablet() {
  const { data } = useSocketQuery("tablet-layout", socketClient);

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr));"
        gap="10px"
        justifyContent="space-around"
        width="100%"
      >
        {data?.map((item) => {
          return (
            <GridItem key={item.role} bg="green">
              <AspectRatio ratio={1 / 1}>
                <Widget {...item} />;
              </AspectRatio>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}
