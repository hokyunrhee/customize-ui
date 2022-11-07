import dynamic from "next/dynamic";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { isBrowser, isTablet, isMobile } from "react-device-detect";

import { io } from "socket.io-client";
import { useSocketQuery } from "../hooks/use-socket-query";

const CustomView = dynamic(
  () => import("react-device-detect").then(({ CustomView }) => CustomView),
  {
    ssr: false,
  }
);

const socketClient = io("http://localhost:5050", {
  transports: ["websocket"],
  autoConnect: false,
});

const Home = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { data } = useSocketQuery("message", socketClient);

  return (
    <Box>
      <CustomView condition={isBrowser}>
        <div>Browser</div>
      </CustomView>
      <CustomView condition={isTablet && isLargerThan768}>
        <div>Tablet</div>
      </CustomView>
      <CustomView condition={isMobile && !isTablet && !isLargerThan768}>
        <div>Mobile</div>
      </CustomView>
    </Box>
  );
};

export default Home;
