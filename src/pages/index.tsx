import dynamic from "next/dynamic";
import { useMediaQuery } from "@chakra-ui/react";
import { isBrowser, isTablet, isMobile } from "react-device-detect";

import { Mobile } from "@/components/view/mobile";
import { Tablet } from "@/components/view/tablet";
import { OverHeadDisplayView } from "@/components/overhead-widgets-view";

const CustomView = dynamic(
  () => import("react-device-detect").then(({ CustomView }) => CustomView),
  {
    ssr: false,
  }
);

const Home = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <CustomView condition={isBrowser}>
        <OverHeadDisplayView />
      </CustomView>
      <CustomView condition={isTablet && isLargerThan768}>
        <Tablet />
      </CustomView>
      <CustomView condition={isMobile && !isTablet && !isLargerThan768}>
        <Mobile />
      </CustomView>
    </>
  );
};

export default Home;
