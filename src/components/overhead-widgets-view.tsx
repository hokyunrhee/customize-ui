import React from "react";
import { Box } from "@chakra-ui/react";
import GridLayout from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import { socketClient } from "@/api/socket-client";
import { useSocketQuery } from "@/hooks/use-socket-query";

export const OverHeadDisplayView = () => {
  const { data } = useSocketQuery<{ layout: any[] }>(
    "over-head-display-layout",
    socketClient
  );

  if (data?.layout) {
    return (
      <div>
        <GridLayout
          cols={8}
          width={1920}
          compactType="horizontal"
          layout={data?.layout}
          isBounded={true}
          isResizable={false}
          isDraggable={false}
        >
          {data?.layout.map((item) => (
            <Box key={item.i} background="gray.700">
              <span>{item.i}</span>
            </Box>
          ))}
        </GridLayout>
      </div>
    );
  }

  return null;
};
