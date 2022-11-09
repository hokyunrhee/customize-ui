import React from "react";
import { Box } from "@chakra-ui/react";

interface OverheadNASTemplateProps {
  vision: JSX.Element;
  MIP: JSX.Element;
}

export const OverheadNASTemplate = ({
  MIP,
  vision,
}: OverheadNASTemplateProps) => {
  return (
    <Box>
      <Box position="absolute">{vision}</Box>
      <Box>{MIP}</Box>
    </Box>
  );
};
