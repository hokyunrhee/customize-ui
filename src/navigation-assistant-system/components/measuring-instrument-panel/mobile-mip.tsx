import { Box } from "@chakra-ui/react";
import GridLayout from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import { useSocketQuery } from "@/shared/hooks/use-socket-query";
import { useWindowSize } from "@/shared/hooks/use-window-size";
import { MIP } from "@/navigation-assistant-system/types/mip-schema";
import { socketClient } from "@/navigation-assistant-system/api/socket-client";

export const MobileMIP = () => {
  const { data } = useSocketQuery<MIP>("mobile", socketClient);
  const { width } = useWindowSize();

  if (!data) {
    return null;
  }

  const { widgetLayout } = data;

  return (
    <GridLayout
      cols={2}
      width={width}
      rowHeight={width / 2 / 2}
      compactType={null}
      layout={widgetLayout}
      isBounded={true}
      isResizable={false}
      margin={[0, 0]}
      isDraggable={false}
    >
      {widgetLayout.map((widget) => (
        <Box key={widget.i} background="whiteAlpha.400" fontSize="16px">
          <span>{widget.i}</span>
        </Box>
      ))}
    </GridLayout>
  );
};
