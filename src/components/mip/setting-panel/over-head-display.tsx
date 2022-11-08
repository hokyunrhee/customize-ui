import React, { Dispatch, useEffect, useState } from "react";

import { socketClient } from "@/api/socket-client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableId,
  DroppableProps,
} from "react-beautiful-dnd";
import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useSocketQuery } from "@/hooks/use-socket-query";
import {
  INITIAL_READY_WIDGET_LIST,
  INITIAL_STAGED_WIDGET_LIST,
  INITIAL_WIDGET_STATE,
  Widget,
  WidgetState,
} from "../widget/widget-config";

export function MIPOverHeadDisplaySetting() {
  const [itemGroup, setItemGroup] = useState(INITIAL_WIDGET_STATE);

  const { data } = useSocketQuery("over-head-display-layout", socketClient);
  const updateOverHeadDisplayLayout = () => {
    socketClient.emit("update-over-head-display-layout", itemGroup.staged);
  };

  return (
    <Box>
      <DragAndDrop itemGroup={itemGroup} setItemGroup={setItemGroup} />
      <Button onClick={updateOverHeadDisplayLayout}>
        OverHeadDisplay Save
      </Button>
    </Box>
  );
}

type DroppableKey = { [key: DroppableId]: Widget[] };
type DragAndDropProps = {
  itemGroup: WidgetState & DroppableKey;
  setItemGroup: Dispatch<WidgetState>;
};

const DragAndDrop = ({ itemGroup, setItemGroup }: DragAndDropProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setIsClient(true));

    return () => {
      cancelAnimationFrame(animation);
      setIsClient(false);
    };
  }, []);

  const WIDGET_COUNT = 8;
  // const emptyWidgetGroups: DropGroup = Object.assign<DropGroup, DragItems[]>(
  //   {},
  //   new Array<DragItems>(WIDGET_COUNT).fill([])
  // )

  // const [itemGroup, setItemGroup] = useState<DropGroup>({
  //   readyItem: [
  //     { id: "1", content: "hi" },
  //     { id: "2", content: "hello" },
  //     { id: "3", content: "some" },
  //     { id: "4", content: "thing" },
  //     { id: "5", content: "thing" },
  //     { id: "6", content: "thing" },
  //     { id: "7", content: "thing" },
  //     { id: "8", content: "thing" },
  //   ],
  //   execItem: new Array(8).fill(null),
  //   // ...emptyWidgetGroups,
  // });

  const reorder = (list: Widget[], startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const removeFromList = (
    list: Widget[],
    removeItemIndex: number
  ): [Widget, Widget[]] => {
    const result = [...list];
    const [removed] = result.splice(removeItemIndex, 1);

    return [removed, result];
  };

  const addToList = (
    list: Widget[],
    destinationIndex: number,
    item: Widget
  ): Widget[] => {
    const result = [...list];
    result.splice(destinationIndex, 0, item);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);

    if (!result.destination) return;

    const { source, destination } = result;
    const itemGroupCopy = { ...itemGroup };

    const dragEndInSameGroup = source.droppableId === destination.droppableId;

    if (dragEndInSameGroup) {
      const reorderedItemList = reorder(
        itemGroupCopy[source.droppableId],
        source.index,
        destination.index
      );
      itemGroupCopy[source.droppableId] = reorderedItemList;

      setItemGroup(itemGroupCopy);
      return;
    }

    const startGroupItems = itemGroupCopy[source.droppableId];
    const [removedItem, newStartGroupItems] = removeFromList(
      startGroupItems,
      source.index
    );
    itemGroupCopy[source.droppableId] = newStartGroupItems;
    const destinationGroupItems = itemGroupCopy[destination.droppableId];
    itemGroupCopy[destination.droppableId] = addToList(
      destinationGroupItems,
      destination.index,
      removedItem
    );

    setItemGroup(itemGroupCopy);
  };

  if (!isClient) return null;
  return (
    <Center height="800px" width="100vw">
      <Center bg="primary.200" height="1080px" width="3840px">
        <Stack width="100%">
          <DragDropContext onDragEnd={onDragEnd}>
            <StictModeDroppable droppableId="ready" direction="horizontal">
              {(provided) => (
                <Box>
                  <Box fontSize="40px">Ready</Box>
                  <Box
                    display="flex"
                    border="5px solid black"
                    height="200px"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {itemGroup.ready.map((item, index) => (
                      <Draggable
                        key={item.role}
                        draggableId={item.role}
                        index={index}
                      >
                        {(providedDraggable) => {
                          return (
                            <Box
                              width="200px"
                              height="200px"
                              border="1px solid white"
                              borderRadius="8px"
                              overflow="hidden"
                              bg="gray"
                              ref={providedDraggable.innerRef}
                              {...providedDraggable.draggableProps}
                              {...providedDraggable.dragHandleProps}
                            >
                              {item.role}
                              {/* <SomeMari data={item.id} /> */}
                            </Box>
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                </Box>
              )}
            </StictModeDroppable>
            <StictModeDroppable
              droppableId={"staged"}
              direction="horizontal"
              // isCombineEnabled={true}
            >
              {(provided, { isDraggingOver }) => {
                return (
                  <Box>
                    <Box fontSize="40px">Staged</Box>
                    <Box
                      border={
                        isDraggingOver ? "9px solid green" : "9px dashed gray"
                      }
                      width="100%"
                      height="200px"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <HStack>
                        {itemGroup.staged?.map((item, index) => {
                          if (!item) return null;
                          return (
                            <Draggable
                              key={item.role}
                              draggableId={item.role}
                              index={index}
                            >
                              {(providedDraggable) => {
                                return (
                                  <Box
                                    ref={providedDraggable.innerRef}
                                    {...providedDraggable.draggableProps}
                                    {...providedDraggable.dragHandleProps}
                                    width="200px"
                                    height="200px"
                                    border="1px solid white"
                                    borderRadius="8px"
                                    overflow="hidden"
                                    position="relative"
                                    bg="gray"
                                  >
                                    {/* <SomeMari data={item.id} /> */}
                                    {item.role}
                                    <Center
                                      onClick={() => {
                                        const itemGroupCopy = {
                                          ...itemGroup,
                                        };
                                        const [
                                          removedItem,
                                          newStartGroupItems,
                                        ] = removeFromList(
                                          itemGroupCopy.staged,
                                          index
                                        );
                                        itemGroupCopy.staged =
                                          newStartGroupItems;
                                        itemGroupCopy.ready = addToList(
                                          itemGroupCopy.ready,
                                          itemGroupCopy.ready.length,
                                          removedItem
                                        );
                                        setItemGroup(itemGroupCopy);
                                      }}
                                      position="absolute"
                                      left="50%"
                                      top="50%"
                                      transform="translate(-50%, -50%)"
                                      bg="red"
                                      borderRadius="full"
                                      width="100px"
                                      height="100px"
                                      color="white"
                                      fontSize="100px"
                                    >
                                      -
                                    </Center>
                                  </Box>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      </HStack>
                    </Box>
                  </Box>
                );
              }}
            </StictModeDroppable>
          </DragDropContext>
        </Stack>
      </Center>
    </Center>
  );
};

const StictModeDroppable = (props: DroppableProps) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setIsEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setIsEnabled(false);
    };
  }, []);

  if (!isEnabled) return null;

  return <Droppable {...props} />;
};
