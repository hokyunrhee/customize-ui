import { Box } from "@chakra-ui/react";
import { Widget } from "./widget-config";

const Heading = ({ role, ratio, isAnalog }: Widget) => {
  return (
    <Box
      width="200px"
      height={ratio.x === 1 ? "200px" : "100px"}
      border="2px solid black"
      bg="green"
      color="white"
    >{`${isAnalog ? "아날로그" : "디지털"} ${ratio.x}:${
      ratio.y
    }비율 ${role} 입니다`}</Box>
  );
};

export const Widget = (props: Widget) => {
  const { role } = props;
  let component;
  console.log(props);

  if (!props) return null;
  switch (role) {
    case "heading":
      component = <Heading {...props} />;
      break;
    case "rate-of-turn":
      component = <Heading {...props} />;
      break;
    default:
      component = <Heading {...props} />;
  }

  return component;
};
