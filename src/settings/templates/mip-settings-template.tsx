import { Box } from "@chakra-ui/react";

export const MIPSettingsTemplate = ({
  MIPLayout,
}: {
  MIPLayout: JSX.Element;
}) => {
  return (
    <Box>
      <Box height="80px" bg="red" />
      <Box paddingX="48px">{MIPLayout}</Box>
    </Box>
  );
};
