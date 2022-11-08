import React from "react";
import dynamic from "next/dynamic";
const CustomView = dynamic(
  () => import("react-device-detect").then(({ CustomView }) => CustomView),
  {
    ssr: false,
  }
);
import { isMobile, isTablet } from "react-device-detect";

import useMediaQuery from "@/hooks/use-media-query";

export const MobileView = ({ children }) => {
  const isLargerThan768 = useMediaQuery("(min-width: 768px)");

  return (
    <CustomView condition={isMobile && !isTablet && !isLargerThan768}>
      {children}
    </CustomView>
  );
};
