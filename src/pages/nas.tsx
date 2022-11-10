import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useMediaQuery, Button } from "@chakra-ui/react";
import { isBrowser, isTablet, isMobile } from "react-device-detect";

import {
  OverheadNASTemplate,
  MobileNASTemplate,
} from "@/navigation-assistant-system/templates";
import {
  OverheadMIP,
  MobileMIP,
} from "@/navigation-assistant-system/components/measuring-instrument-panel";
import { Vision } from "@/navigation-assistant-system/components/vision";

const CustomView = dynamic(
  () => import("react-device-detect").then(({ CustomView }) => CustomView),
  {
    ssr: false,
  }
);

const NAS = () => {
  const [isLargerThan3840] = useMediaQuery("(min-width: 3840px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <CustomView condition={isLargerThan3840}>
        <OverheadNASTemplate
          vision={<Vision width="3840px" height="1080px" />}
          MIP={<OverheadMIP />}
        />
      </CustomView>
      <CustomView condition={isBrowser && !isLargerThan3840}>
        {/*  */}
      </CustomView>
      <CustomView condition={isTablet && isLargerThan768}>
        {/* <Tablet /> */}
      </CustomView>
      <CustomView condition={isMobile && !isTablet && !isLargerThan768}>
        <MobileNASTemplate MIP={<MobileMIP />} />
      </CustomView>

      <NextLink href="/">
        <Button
          position="fixed"
          right="0"
          bottom="0"
          margin="24px"
          colorScheme="orange"
        >
          Home
        </Button>
      </NextLink>
    </>
  );
};

export default NAS;

NAS.hasFullWidth = true;
