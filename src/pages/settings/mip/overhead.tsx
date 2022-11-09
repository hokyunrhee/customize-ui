import { MIPSettingsTemplate } from "@/settings/templates/mip-settings-template";
import { OverheadMIPLayout } from "@/settings/components/measuring-instrument-panel-layout";

const OverheadDisplay = () => {
  return <MIPSettingsTemplate MIPLayout={<OverheadMIPLayout />} />;
};

export default OverheadDisplay;
