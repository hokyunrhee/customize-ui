import React, { useState, useEffect } from "react";
import { Box, Grid, VStack, Button } from "@chakra-ui/react";
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

export const OverheadMIPLayout = () => {
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
    socketClient.emit("overhead", { widgetLayout });
  };

  return (
    <Box>
      <Box className="gird-layout" width="1920px">
        <Box className="widget-box">
          <Box>Widget box</Box>

          <VStack spacing="8px">
            <Grid width="100%" gridTemplateColumns="repeat(12, 1fr)" gap="8px">
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
              gridTemplateColumns="repeat(12, 1fr)"
              gridTemplateRows="repeat(2, 1fr)"
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
        </Box>

        <Box
          width="1920px"
          height="540px"
          backgroundImage="/assets/eo-image.png"
          backgroundSize="contain"
          overflow="hidden"
        >
          <GridLayout
            cols={8}
            width={1920}
            rowHeight={1920 / 8 / 2}
            compactType={null}
            layout={widgetLayout}
            onLayoutChange={onLayoutChange}
            isBounded={true}
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

        <Box display="flex" justifyContent="flex-end" paddingTop="24px">
          <Button onClick={saveLayout}>Save</Button>
        </Box>
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
