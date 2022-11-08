import {
  MIPMobile,
  MIPOverHead,
  MIPTablet,
} from "@/components/mip/display-panel";
import {
  MobileView,
  TabletView,
  OverHeadDisplayView,
} from "@/components/device-view";

const Home = () => {
  return (
    <div>
      <OverHeadDisplayView>
        <MIPOverHead />
      </OverHeadDisplayView>
      <TabletView>
        <MIPTablet />
      </TabletView>
      <MobileView>
        <MIPMobile />
      </MobileView>
    </div>
  );
};

export default Home;
