import { Box, AspectRatio, AspectRatioProps } from "@chakra-ui/react";

type Variant = keyof typeof widgets | string;

interface WidgetProps extends AspectRatioProps {
  variant: Variant;
}

export const Widget = (props: WidgetProps) => {
  const { ratio = 1 / 1, variant, ...rest } = props;

  const widget = getWidget(variant);

  return (
    <AspectRatio maxWidth="480px" ratio={ratio} {...rest}>
      {widget}
    </AspectRatio>
  );
};

const getWidget = (variant: Variant) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="yellow.300"
    >
      <span>{variant}</span>
    </Box>
  );
};

const widgets = {
  RPM: "RPM",
  rudder: "rudder",
};
