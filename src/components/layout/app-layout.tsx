import React from "react";
import NextLink from "next/link";
import { Box, Flex, VStack } from "@chakra-ui/react";

const NAVIGATION = [
  { name: "Dashboard", href: "#", icon: "" },
  { name: "Records", href: "#", icon: "" },
  { name: "Settings", href: "/settings", icon: "" },
];

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex>
      <Box
        flexShrink={0}
        width="80px"
        height="100vh"
        backgroundColor="blue.400"
        display="flex"
        flexDirection="column"
      >
        <Box
          width="100%"
          sx={{ aspectRatio: "1 / 1" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="48px"
          backgroundColor="blue.500"
        >
          🌈
        </Box>
        <VStack spacing="24px" paddingY="24px">
          {NAVIGATION.map(({ name, href }, index) => (
            <NextLink key={index} href={href}>
              <Box boxSize="48px" backgroundColor="blue.300">
                {name}
              </Box>
            </NextLink>
          ))}
        </VStack>
      </Box>
      <Box as="main" flexGrow={1}>
        {children}
      </Box>
    </Flex>
  );
};
