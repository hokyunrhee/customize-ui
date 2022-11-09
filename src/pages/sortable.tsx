import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Box, Flex, HStack } from "@chakra-ui/react";

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: "ghost",
  group: "shared",
};

export default function App() {
  const [blocks, setBlocks] = useState([
    {
      id: 1,
      content: "item 1",
      parent_id: null,
      type: "container",
      children: [
        {
          id: 2,
          content: "item 2",
          width: 3,
          type: "text",
          parent_id: 1,
        },
        {
          id: 3,
          content: "item 3",
          width: 3,
          type: "text",
          parent_id: 1,
        },
      ],
    },
    {
      id: 4,
      content: "item 2",
      parent_id: null,
      type: "container",
      children: [
        {
          id: 5,
          content: "item 5",
          width: 3,
          type: "text",
          parent_id: 4,
        },
        {
          id: 6,
          content: "item 6",
          width: 2,
          type: "text",
          parent_id: 4,
        },
      ],
    },
    {
      id: 7,
      content: "item 7",
      parent_id: null,
      type: "container",
      children: [
        {
          id: 8,
          content: "item 8",
          width: 3,
          parent_id: 7,
          type: "text",
        },
        {
          id: 9,
          content: "item 9",
          width: 2,
          type: "text",
          parent_id: 7,
        },
      ],
    },
    {
      id: 10,
      content: "item 7",
      parent_id: null,
      type: "container",
      children: [
        {
          id: 11,
          content: "item 11",
          width: 3,
          parent_id: 10,
          type: "text",
        },
        {
          id: 12,
          content: "item 12",
          width: 2,
          type: "text",
          parent_id: 10,
        },
      ],
    },
  ]);

  return (
    <Box>
      <ReactSortable list={blocks} setList={setBlocks} {...sortableOptions}>
        {blocks.map((block, blockIndex) => (
          <BlockWrapper
            key={block.id}
            block={block}
            blockIndex={[blockIndex]}
            setBlocks={setBlocks}
          />
        ))}
      </ReactSortable>
    </Box>
  );
}

function Container({ block, blockIndex, setBlocks }) {
  return (
    <HStack bg="yellow">
      <ReactSortable
        key={block.id}
        list={block.children}
        setList={(currentList) => {
          setBlocks((sourceList) => {
            const tempList = [...sourceList];
            const _blockIndex = [...blockIndex];

            const lastIndex = _blockIndex.pop();
            const lastArr = _blockIndex.reduce(
              (arr, i) => arr[i]["children"],
              tempList
            );
            console.log(tempList);
            lastArr[lastIndex]["children"] = currentList;
            return tempList;
          });
        }}
        {...sortableOptions}
      >
        {block.children &&
          block.children.map((childBlock, index) => {
            return (
              <BlockWrapper
                key={childBlock.id}
                block={childBlock}
                blockIndex={[...blockIndex, index]}
                setBlocks={setBlocks}
              />
            );
          })}
      </ReactSortable>
    </HStack>
  );
}
function BlockWrapper({ block, blockIndex, setBlocks }) {
  if (!block) return null;
  if (block.type === "container") {
    return (
      <Box
        position="relative"
        background="white"
        padding="20px"
        width="200px"
        bg="green"
        marginBottom="10px"
        border="1px solid lightgray"
        borderRadius="4px"
        cursor="move"
      >
        container: {block.content}
        <Container
          block={block}
          setBlocks={setBlocks}
          blockIndex={blockIndex}
        />
      </Box>
    );
  } else {
    return (
      <Box
        position="relative"
        background="white"
        width="150px"
        padding="20px"
        bg="lightgreen"
        marginBottom="10px"
        border="1px solid lightgray"
        borderRadius="4px"
        cursor="move"
      >
        text: {block.content}
      </Box>
    );
  }
}
