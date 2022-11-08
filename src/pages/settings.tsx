import { Box } from "@chakra-ui/react";
import {
  MobileView,
  OverHeadDisplayView,
  TabletView,
} from "@/components/device-view";
import {
  MIPMobileSetting,
  MIPOverHeadDisplaySetting,
  MIPTabletSetting,
} from "@/components/mip/setting-panel";

const Settings = () => {
  return (
    <Box>
      <OverHeadDisplayView>
        <MIPOverHeadDisplaySetting />
      </OverHeadDisplayView>
      <TabletView>
        <MIPTabletSetting />
      </TabletView>
      <MobileView>
        <MIPMobileSetting />
      </MobileView>
    </Box>
  );
};

export default Settings;
