import React, { useState, useEffect } from "react";
import { Box, Grid, VStack, Button, HStack } from "@chakra-ui/react";
import GridLayout from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

import { socketClient } from "@/settings/api/socket-client";
import { Widget } from "@/shared/components/widget";

type Item = {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
};

export const MobileMIPLayout = () => {
  const [widgetBox, setWidgetBox] = useState<Item[]>(generateLayout());
  const [widgetLayout, setWidgetLayout] = useState<Item[]>([]);

  const { squareWidgetBox, rectangleWidgetBox } = widgetBox.reduce(
    (acc, cur) => {
      const { i } = cur;
      const [_, ratio] = i.split("-");

      return parseInt(ratio) === 1
        ? { ...acc, squareWidgetBox: [...acc.squareWidgetBox, cur] }
        : { ...acc, rectangleWidgetBox: [...acc.rectangleWidgetBox, cur] };
    },
    {
      squareWidgetBox: [] as Item[],
      rectangleWidgetBox: [] as Item[],
    }
  );

  useEffect(() => {
    socketClient.connect();

    return () => {
      socketClient.off();
      socketClient.disconnect();
    };
  }, []);

  const onTakeWidget = (widget: Item) => {
    setWidgetLayout([...widgetLayout, widget]);
    setWidgetBox(widgetBox.filter(({ i }) => i !== widget.i));
  };

  const onPutItem = (widget: Item) => {
    setWidgetBox([...widgetBox, widget]);
    setWidgetLayout(widgetLayout.filter(({ i }) => i !== widget.i));
  };

  const onLayoutChange = (layout: GridLayout.Layout[]) => {
    setWidgetLayout(layout);
  };

  const saveLayout = () => {
    socketClient.emit("mobile", { widgetLayout });
  };

  return (
    <Box>
      <Box className="gird-layout" width="1920px">
        <HStack alignItems="flex-start">
          <Box
            className="widget-box"
            height="800px"
            display="flex"
            flexDirection="column"
          >
            <Box>Widget box</Box>

            <VStack spacing="8px">
              <Grid
                width="100%"
                gridTemplateColumns="repeat(6, 122px)"
                gap="8px"
              >
                {squareWidgetBox.map((widget) => (
                  <Widget
                    key={widget.i}
                    variant={widget.i}
                    cursor="pointer"
                    onClick={() => onTakeWidget(widget)}
                  />
                ))}
              </Grid>
              <Grid
                width="100%"
                gridTemplateColumns="repeat(6, 122px)"
                gap="8px"
              >
                {rectangleWidgetBox.map((widget) => (
                  <Widget
                    key={widget.i}
                    variant={widget.i}
                    ratio={2 / 1}
                    cursor="pointer"
                    onClick={() => onTakeWidget(widget)}
                  />
                ))}
              </Grid>
            </VStack>

            <Box marginTop="auto" display="flex" justifyContent="flex-end">
              <Button onClick={saveLayout}>Save</Button>
            </Box>
          </Box>

          <Box
            width="360px"
            height="800px"
            backgroundImage="/assets/mobile-mockup.png"
            backgroundSize="120%"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            paddingX="32px"
            paddingY="64px"
          >
            <Box
              height="100%"
              overflowY="scroll"
              sx={{
                "&": {
                  "scrollbar-width": "none",
                  "-ms-overflow-style:": "none",
                },
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <GridLayout
                cols={2}
                width={360 - 64}
                rowHeight={(360 - 64) / 2 / 2}
                layout={widgetLayout}
                onLayoutChange={onLayoutChange}
                compactType={null}
                isResizable={false}
                margin={[0, 0]}
              >
                {widgetLayout.map((item) => (
                  <Box key={item.i} background="gray.700">
                    <Box>
                      <Box
                        className="hide-button"
                        as="span"
                        onClick={() => onPutItem(item)}
                        fontSize="36px"
                        cursor="pointer"
                      >
                        &times;
                      </Box>
                    </Box>
                    <span>{item.i}</span>
                  </Box>
                ))}
              </GridLayout>
            </Box>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

const generateLayout = () => {
  const square = Array.from({ length: 8 }).map((_, i) => {
    return {
      x: 0,
      y: 0,
      w: 1,
      h: 2,
      i: `${i}-1/1`,
    };
  });

  const rectangle = Array.from({ length: 12 }).map((_, i) => {
    return {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      i: `${i}-2/1`,
    };
  });

  return [...rectangle, ...square];
};
