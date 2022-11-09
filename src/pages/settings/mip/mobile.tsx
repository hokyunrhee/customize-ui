import { MIPSettingsTemplate } from "@/settings/templates/mip-settings-template";
import { MobileMIPLayout } from "@/settings/components/measuring-instrument-panel-layout";

const OverheadDisplay = () => {
  return <MIPSettingsTemplate MIPLayout={<MobileMIPLayout />} />;
};

export default OverheadDisplay;
