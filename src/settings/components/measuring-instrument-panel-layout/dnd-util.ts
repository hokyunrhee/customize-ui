// https://github.com/react-grid-layout/react-grid-layout/issues/1100#issuecomment-583741129

import * as RGL_UTILS from "react-grid-layout/build/utils";
import {
  sortLayoutItems,
  getLayoutItem,
  cloneLayoutItem,
  validateLayout,
  correctBounds,
  getAllCollisions,
  bottom,
} from "react-grid-layout/build/utils";

import { type Layout } from "react-grid-layout";

RGL_UTILS.compact = function compact(
  layout: Layout[],
  compactType: RGL_UTILS.CompactType,
  cols: number
): Layout[] {
  // We go through the items by row and column.
  const sorted = sortLayoutItems(layout, "vertical");
  // Holding for new items.
  const out: Layout[] = Array(layout.length);

  for (let i = 0, len = sorted.length; i < len; i++) {
    let l = cloneLayoutItem(sorted[i]);

    // Don't move static elements
    if (!l.static) {
      l.y = Math.floor(i / cols);
      l.x = i % cols;
    }
    // Add to output array to make sure they still come out in the right order.
    out[i] = l;
    // Clear moved flag, if it exists.
    l.moved = false;
  }
  return out;
};

/* All code is re-used from the original method except the 'isLeftShift' related code. */
RGL_UTILS.moveElement = (
  layout: Layout[],
  l: Layout,
  x: number,
  y: number,
  isUserAction: boolean,
  preventCollision: boolean,
  compactType: RGL_UTILS.CompactType,
  cols: number,
  isLeftShift: boolean // overriden - nitesh
): Layout[] => {
  // If this is static and not explicitly enabled as draggable,
  // no move is possible, so we can short-circuit this immediately.
  if (l.static && l.isDraggable !== true) return layout;

  // Short-circuit if nothing to do.
  if (l.y === y && l.x === x) return layout;

  console.log(
    `Moving element ${l.i} to [${String(x)},${String(y)}] from [${l.x},${l.y}]`
  );
  const oldX = l.x;
  const oldY = l.y;

  // This is quite a bit faster than extending the object
  if (typeof x === "number") l.x = x;
  if (typeof y === "number") l.y = y;
  l.moved = true;

  // If this collides with anything, move it.
  // When doing this comparison, we have to sort the items we compare with
  // to ensure, in the case of multiple collisions, that we're getting the
  // nearest collision.
  let sorted = sortLayoutItems(layout, compactType);
  const movingUp =
    compactType === "vertical" && typeof y === "number"
      ? oldY >= y
      : compactType === "horizontal" && typeof x === "number"
      ? oldX >= x
      : false;
  if (movingUp) sorted = sorted.reverse();
  const collisions = getAllCollisions(sorted, l);

  // There was a collision; abort
  if (preventCollision && collisions.length) {
    console.log(`Collision prevented on ${l.i}, reverting.`);
    l.x = oldX;
    l.y = oldY;
    l.moved = false;
    return layout;
  }
  // overriden - nitesh
  if (isUserAction) {
    isUserAction = false;
    if (oldX === x) isLeftShift = oldY - y <= 0;
    if (oldY === y) isLeftShift = oldX - x <= 0;
  }
  // Move each item that collides away from this element.
  for (let i = 0, len = collisions.length; i < len; i++) {
    const collision = collisions[i];
    console.log(
      `Resolving collision between ${l.i} at [${l.x},${l.y}] and ${collision.i} at [${collision.x},${collision.y}]`
    );

    // Short circuit so we can't infinite loop
    if (collision.moved) continue;

    // Don't move static items - we have to move *this* element away
    if (collision.static) {
      layout = RGL_UTILS.moveElementAwayFromCollision(
        layout,
        collision,
        l,
        isUserAction,
        compactType,
        cols,
        isLeftShift // overriden - nitesh
      );
    } else {
      layout = RGL_UTILS.moveElementAwayFromCollision(
        layout,
        l,
        collision,
        isUserAction,
        compactType,
        cols,
        isLeftShift // overriden - nitesh
      );
    }
  }

  return layout;
};
RGL_UTILS.moveElementAwayFromCollision = function moveElementAwayFromCollision(
  layout: Layout[],
  collidesWith: Layout,
  itemToMove: Layout,
  isUserAction: boolean,
  compactType: RGL_UTILS.CompactType,
  cols: number,
  isLeftShift: boolean
): Layout[] {
  const compactH = compactType === "horizontal";
  console.log(layout);

  const preventCollision = collidesWith.static; // we're already colliding (not for static items)
  const isTileWrapping = isLeftShift
    ? itemToMove.x - 1 < 0
    : itemToMove.x + 1 >= cols;
  const deltaShift = isLeftShift ? -1 : 1;
  const x = isTileWrapping
    ? isLeftShift
      ? cols - 1
      : 0
    : itemToMove.x + deltaShift;
  const y = isTileWrapping ? itemToMove.y + deltaShift : itemToMove.y;

  return RGL_UTILS.moveElement(
    layout,
    itemToMove,
    compactH ? x : undefined,
    y,
    isUserAction,
    preventCollision,
    compactType,
    cols,
    isLeftShift
  );
};
