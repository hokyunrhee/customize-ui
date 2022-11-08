import dynamic from "next/dynamic";
import { isBrowser, isTablet, isMobile } from "react-device-detect";

import { Mobile } from "@/components/view/mobile";
import { Tablet } from "@/components/view/tablet";
import { OverHeadDisplay } from "@/components/view/over-head-display";
import { useMediaQuery } from "@/hooks/use-media-query";

const CustomView = dynamic(
  () => import("react-device-detect").then(({ CustomView }) => CustomView),
  {
    ssr: false,
  }
);

const Home = () => {
  const isLargerThan768 = useMediaQuery("(min-width: 768px)");

  return (
    <div>
      <CustomView condition={isBrowser}>
        <OverHeadDisplay />
      </CustomView>
      <CustomView condition={isTablet && isLargerThan768}>
        <Tablet />
      </CustomView>
      <CustomView condition={isMobile && !isTablet && !isLargerThan768}>
        <Mobile />
      </CustomView>
    </div>
  );
};

export default Home;
