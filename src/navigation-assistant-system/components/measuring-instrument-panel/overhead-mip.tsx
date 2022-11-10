import { Box } from "@chakra-ui/react";
import GridLayout from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import { useSocketQuery } from "@/shared/hooks/use-socket-query";
import { MIP } from "@/navigation-assistant-system/types/mip-schema";
import { socketClient } from "@/navigation-assistant-system/api/socket-client";

export const OverheadMIP = () => {
  const { data } = useSocketQuery<MIP>("overhead", socketClient);

  if (!data) {
    return null;
  }

  const { widgetLayout } = data;

  return (
    <GridLayout
      cols={8}
      width={3840}
      rowHeight={240}
      compactType={null}
      layout={widgetLayout}
      isBounded={true}
      isResizable={false}
      margin={[0, 0]}
      isDraggable={false}
    >
      {widgetLayout.map((widget) => (
        <Box key={widget.i} background="blackAlpha.500">
          <span>{widget.i}</span>
        </Box>
      ))}
    </GridLayout>
  );
};
