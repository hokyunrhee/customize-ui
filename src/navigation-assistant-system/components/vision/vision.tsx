import { Box, BoxProps } from "@chakra-ui/react";

export const Vision = (props: BoxProps) => {
  return (
    <Box
      {...props}
      backgroundImage="/assets/eo-image.png"
      backgroundSize="contain"
    />
  );
};
