import { Box } from "@chakra-ui/react";
import { Widget } from "./widget-config";

const Heading = ({ role, ratio, isAnalog }: Widget) => {
  return (
    <Box width="200px" height="200px" bg="green" color="white">{`${
      isAnalog ? "아날로그" : "디지털"
    } ${ratio.x}:${ratio.y}비율 ${role} 입니다`}</Box>
  );
};
const ROT = ({ role, ratio, isAnalog }: Widget) => {
  return (
    <Box width="200px" height="200px" bg="green" color="white">{`${
      isAnalog ? "아날로그" : "디지털"
    } ${ratio.x}:${ratio.y}비율 ${role} 입니다`}</Box>
  );
};

export const Widget = (props: Widget) => {
  const { role } = props;
  let component;
  switch (role) {
    case "heading":
      component = <Heading {...props} />;
      break;
    case "rate-of-turn":
      component = <ROT {...props} />;
      break;
    default:
      component = <></>;
  }

  return component;
};
