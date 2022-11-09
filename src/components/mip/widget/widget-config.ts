export type WidgetRole =
  | "heading"
  | "rate-of-turn"
  | "cog"
  | "sog"
  | "stw"
  | "depth";
export type WidgetRatio = { x: 1; y: 1 } | { x: 1; y: 2 };
export type Widget = {
  role: WidgetRole;
  ratio: WidgetRatio;
  isAnalog: boolean;
};
export type NestedWidget = {
  key: string;
  children: [Widget, Widget];
};

export type WidgetList = (Widget | NestedWidget)[];

export type WidgetState = {
  ready: Widget[];
  staged: WidgetList;
};

export const INITIAL_READY_WIDGET_LIST: Widget[] = [
  {
    role: "sog",
    ratio: { x: 1, y: 1 },
    isAnalog: false,
  },
];
export const INITIAL_STAGED_WIDGET_LIST: WidgetList = [
  {
    role: "rate-of-turn",
    ratio: { x: 1, y: 1 },
    isAnalog: true,
  },
  {
    role: "depth",
    ratio: { x: 1, y: 1 },
    isAnalog: true,
  },
  {
    role: "stw",
    ratio: { x: 1, y: 1 },
    isAnalog: true,
  },
  {
    key: "heading+cog",
    children: [
      {
        role: "heading",
        ratio: { x: 2, y: 1 },
        isAnalog: false,
      },
      {
        role: "cog",
        ratio: { x: 2, y: 1 },
        isAnalog: false,
      },
    ],
  },
];

export const INITIAL_WIDGET_STATE: WidgetState = {
  ready: INITIAL_READY_WIDGET_LIST,
  staged: INITIAL_STAGED_WIDGET_LIST,
};
