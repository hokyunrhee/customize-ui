import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  return (
    <Box>
      <LoginForm />
    </Box>
  );
};

export default Login;

const LoginForm = () => {
  const router = useRouter();

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} width="600px">
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            로그인
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value="프로토 타입이라 입력하지 않아도 됩니다"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={"text"}
                  value="👇👇 바로 로그인 버튼을 눌러주세요"
                />
                <InputRightElement h={"full"}></InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                onClick={() => router.replace("/settings")}
                _hover={{
                  bg: "blue.500",
                }}
              >
                로그인
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
