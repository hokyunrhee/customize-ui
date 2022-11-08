import React, { useState } from "react";
import { Box, GridItem } from "@chakra-ui/react";
import GridLayout from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

type Props = {
  updateLayout: ({ layout }: { layout: Item[] }) => void;
};

type Item = {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
};

export const OverheadWidgetsLayout = ({ updateLayout }: Props) => {
  const [layout, setLayout] = useState<Item[]>(generateLayout());
  const [toolbox, setToolbox] = useState<Item[]>([]);

  const onTakeItem = (item: any) => {
    setLayout([...layout, item]);
    setToolbox(toolbox.filter(({ i }) => i !== item.i));
  };

  const onPutItem = (item: Item) => {
    setToolbox([...toolbox, item]);
    setLayout(layout.filter(({ i }) => i !== item.i));
  };

  const onLayoutChange = (layout: GridLayout.Layout[]) => {
    setLayout(layout);
    updateLayout({ layout });
  };

  return (
    <div>
      <ToolBox items={toolbox} onTakeItem={onTakeItem} />
      <GridLayout
        cols={8}
        width={1920}
        compactType="horizontal"
        layout={layout}
        onLayoutChange={onLayoutChange}
        isBounded={true}
        isResizable={false}
      >
        {layout.map((item) => (
          <Box key={item.i} background="gray.700">
            <Box
              className="hide-button"
              onClick={() => onPutItem(item)}
              fontSize="36px"
            >
              &times;
            </Box>
            <span>{item.i}</span>
          </Box>
        ))}
      </GridLayout>
    </div>
  );
};

const ToolBoxItem = ({ item, onTakeItem }: any) => {
  return (
    <Box
      className="toolbox__items__item"
      boxSize="120px"
      backgroundColor="green.800"
      onClick={() => onTakeItem(item)}
    >
      {item.i}
    </Box>
  );
};

const ToolBox = ({ items, onTakeItem }: any) => {
  return (
    <Box className="toolbox" height="240px">
      <span className="toolbox__title">Toolbox</span>
      <Box className="toolbox__items" display="flex">
        {items.map((item: any) => (
          <ToolBoxItem key={item.i} item={item} onTakeItem={onTakeItem} />
        ))}
      </Box>
    </Box>
  );
};

const generateLayout = () => {
  const square = Array.from({ length: 7 }).map((_, i) => {
    return {
      x: i + 2,
      y: 0,
      w: 1,
      h: 2,
      i: (i + 2).toString(),
    };
  });

  const rectangle = Array.from({ length: 2 }).map((_, i) => {
    return {
      x: 0,
      y: i,
      w: 1,
      h: 1,
      i: i.toString(),
    };
  });

  return [...rectangle, ...square];
};
