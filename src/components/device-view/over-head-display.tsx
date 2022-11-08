import React from "react";
import dynamic from "next/dynamic";
const CustomView = dynamic(
  () => import("react-device-detect").then(({ CustomView }) => CustomView),
  {
    ssr: false,
  }
);
import { isBrowser } from "react-device-detect";

export const OverHeadDisplayView = ({ children }) => {
  return <CustomView condition={isBrowser}>{children}</CustomView>;
};
