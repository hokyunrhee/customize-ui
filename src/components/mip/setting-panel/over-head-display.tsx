import React, { Dispatch, useEffect, useState } from "react";

import { socketClient } from "@/api/socket-client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableId,
  DroppableProps,
  DraggableId,
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
  NestedWidget,
  Widget,
  WidgetList,
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

  // const WIDGET_COUNT = 8;

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

    const { source, destination, combine } = result;
    if (combine) {
      console.log("combine!!!!!!!!");
      const { draggableId } = combine;
      console.log(result);
      const itemGroupCopy = { ...itemGroup };
      const destinationPos = itemGroupCopy.staged.findIndex(
        ({ role }) => role === draggableId
      );
      // 1:1에 1:1 넣을 때

      if (destinationPos > -1) {
        const newKey = `${result.draggableId}+${itemGroupCopy.staged[destinationPos].role}`;

        const startGroupItems = itemGroupCopy[source.droppableId];
        const [removedItem, newStartGroupItems] = removeFromList(
          startGroupItems,
          source.index
        );

        itemGroupCopy[source.droppableId] = newStartGroupItems;

        const newDestinationPos = itemGroupCopy.staged.findIndex(
          ({ role }) => role === draggableId
        );
        const destinationItem = itemGroupCopy.staged[newDestinationPos];
        const combinedItem = {
          key: newKey,
          children: [destinationItem, removedItem],
        };

        itemGroupCopy.staged[newDestinationPos] = combinedItem;

        setItemGroup(itemGroupCopy);
      }

      return;
    }

    //seperate
    if (source.droppableId.indexOf("+") > -1) {
      console.log("seperate!!!");

      const itemGroupCopy = { ...itemGroup };
      const sourceIndex = itemGroupCopy.staged.findIndex(
        ({ key }) => key === source.droppableId
      );
      console.log(sourceIndex);
      const removedItem =
        itemGroupCopy.staged[sourceIndex].children[source.index];

      const restItem =
        itemGroupCopy.staged[sourceIndex].children[1 - source.index];

      itemGroupCopy.staged[sourceIndex] = restItem;

      const newAddedList = addToList(
        itemGroupCopy.staged,
        destination?.index,
        removedItem
      );
      itemGroupCopy.staged = newAddedList;

      setItemGroup(itemGroupCopy);
      return;
    }

    if (!destination) return;
    const itemGroupCopy = { ...itemGroup };

    const dragEndInSameGroup = source.droppableId === destination.droppableId;

    if (dragEndInSameGroup) {
      const reorderedItemList = reorder(
        itemGroupCopy[source.droppableId],
        source.index,
        destination.index
      );
      itemGroupCopy[source.droppableId] = reorderedItemList;
      console.log({ itemGroupCopy });
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
    console.log({ itemGroupCopy });
    setItemGroup(itemGroupCopy);
  };

  if (!isClient) return null;
  return (
    <Center height="800px" width="100vw">
      <Center bg="primary.200" height="1080px" width="3840px">
        <Stack width="100%">
          <DragDropContext onDragEnd={onDragEnd}>
            <ReadyWidgetList readyList={itemGroup.ready} />
            <StagedWidgetList stagedList={itemGroup.staged} />
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

const ReadyWidgetList = ({ readyList }: { readyList: Widget[] }) => {
  return (
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
            {readyList.map((item, index) => (
              <Draggable key={item.role} draggableId={item.role} index={index}>
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
  );
};

const StagedWidgetList = ({ stagedList }: { stagedList: WidgetList }) => {
  return (
    <StictModeDroppable
      droppableId={"staged"}
      direction="horizontal"
      isCombineEnabled={true}
    >
      {(provided, { isDraggingOver, draggingOverWith }) => {
        return (
          <Box>
            <Box fontSize="40px">Staged</Box>
            <Box
              border={isDraggingOver ? "9px solid green" : "9px dashed gray"}
              width="100%"
              minHeight="200px"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <HStack bg="red">
                {stagedList.map((item, index) => {
                  if (!item) return null;
                  if ("children" in item) {
                    return (
                      <Draggable
                        key={item.key}
                        draggableId={item.key}
                        index={index}
                      >
                        {(providedDraggable) => (
                          <Box
                            padding="16px"
                            borderRadius="8px"
                            bg="blue"
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            <VerticalCombineWidget
                              droppableId={item.key}
                              nestedWidgetList={item}
                            />
                          </Box>
                        )}
                      </Draggable>
                    );
                  }
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
                            padding="16px"
                            bg="blue"
                            border="1px solid white"
                            borderRadius="8px"
                            overflow="hidden"
                            position="relative"
                          >
                            <Box bg="gray" width="200px" height="200px">
                              {item.role}
                            </Box>
                          </Box>
                        );
                      }}
                    </Draggable>
                  );
                })}
                <Box bg="yellow">{provided.placeholder}</Box>
              </HStack>
            </Box>
          </Box>
        );
      }}
    </StictModeDroppable>
  );
};

const VerticalCombineWidget = ({
  nestedWidgetList,
  droppableId,
}: {
  nestedWidgetList: NestedWidget;
  droppableId: DroppableId;
}) => {
  return (
    <Box>
      <StictModeDroppable
        mode={"virtual"}
        droppableId={droppableId}
        isDropDisabled={nestedWidgetList.children.length > 1}
        direction="vertical"
      >
        {(provided, { isDraggingOver }) => (
          <Box
            bg="yellow"
            border={isDraggingOver ? "5px solid green" : "5px dashed gray"}
            minHeight="200px"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            {nestedWidgetList?.children?.map((item, index) => (
              <Draggable key={item.role} draggableId={item.role} index={index}>
                {(providedDraggable) => {
                  return (
                    <Box
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      onDragStart={(e) => {
                        e.stopPropagation();
                        console.log("services stop propagation");
                      }}
                    >
                      <Box2x1>
                        {item.role}
                        <br />
                        THIS IS HALF
                        {/* <SomeMari data={item.id} /> */}
                      </Box2x1>
                    </Box>
                  );
                }}
              </Draggable>
            ))}
          </Box>
        )}
      </StictModeDroppable>
    </Box>
  );
};

const Box1x1 = (props) => (
  <Box
    bg="green"
    boxSize="200px"
    border="1px solid white"
    overflow="hidden"
    {...props}
  />
);
const Box2x1 = (props) => (
  <Box
    bg="green"
    width="200px"
    height="100px"
    border="1px solid white"
    overflow="hidden"
    {...props}
  />
);
