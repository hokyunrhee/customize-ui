import { Box, SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link";

const CATEGORIES = [
  {
    name: "Overhead Display",
    href: "/settings/mip/overhead",
    imageSrc: "",
  },
  {
    name: "Tablet",
    href: "",
    imageSrc: "",
  },
  {
    name: "Mobile",
    href: "/settings/mip/mobile",
    imageSrc: "",
  },
];

const Settings = () => {
  return (
    <Box>
      <Box>
        <SimpleGrid columns={3} spacingX="40px">
          {CATEGORIES.map(({ name, href }, index) => (
            <NextLink key={index} href={href}>
              <Box height="360px" backgroundColor="orange.400">
                {name}
              </Box>
            </NextLink>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Settings;
