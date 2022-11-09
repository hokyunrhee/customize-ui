import React from "react";
import { Box } from "@chakra-ui/react";

interface MobileNASTemplateProps {
  MIP: JSX.Element;
}

export const MobileNASTemplate = ({ MIP }: MobileNASTemplateProps) => {
  return <Box>{MIP}</Box>;
};
