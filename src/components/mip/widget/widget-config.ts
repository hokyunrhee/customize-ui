import { WidgetState } from "./widget-config";
export type WidgetRole = "heading" | "rate-of-turn";
export type WidgetRatio = { x: 1; y: 1 } | { x: 1; y: 2 };
export type Widget = {
  role: WidgetRole;
  ratio: WidgetRatio;
  isAnalog: boolean;
};

export type WidgetState = {
  ready: Widget[];
  staged: Widget[];
};

export const INITIAL_READY_WIDGET_LIST: Widget[] = [
  {
    role: "heading",
    ratio: { x: 1, y: 1 },
    isAnalog: false,
  },
];
export const INITIAL_STAGED_WIDGET_LIST: Widget[] = [
  {
    role: "rate-of-turn",
    ratio: { x: 1, y: 1 },
    isAnalog: true,
  },
];

export const INITIAL_WIDGET_STATE: WidgetState = {
  ready: INITIAL_READY_WIDGET_LIST,
  staged: INITIAL_STAGED_WIDGET_LIST,
};
