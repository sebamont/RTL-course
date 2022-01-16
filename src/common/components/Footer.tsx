import React from "react";

import {
  Box,
  Container,
  Text,
  Flex,
  Button,
  useColorModeValue,
  HStack,
  Link,
  Image,
} from "@chakra-ui/react";

import { FaGithub, FaPaypal } from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} h={"56px"}>
      <Container maxW={"container.lg"}>
        <Flex py={2} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"sm"} fontWeight={"light"}>
          © 2022
            </Text>
          <Text fontSize={"sm"} fontWeight={"light"}>
            Made with 🧉 by{" "}
            <Link
              color={useColorModeValue("purple.600", "purple.300")}
              fontWeight={"bold"}
              href="https://www.linkedin.com/in/sebastian-montagna/"
              isExternal
            >
              Seba
            </Link>{" "}
            &{" "}
            <Link
              color={useColorModeValue("purple.600", "purple.300")}
              fontWeight={"bold"}
              href="https://www.linkedin.com/in/facundoleanez/"
              isExternal
            >
              Facu
            </Link>{" "}
          </Text>

          <HStack alignItems={"center"} >
            <Button title="Source Code" as={Link} href="https://github.com/sebamont/wordle-react" isExternal>
              <FaGithub />
            </Button>
            <Button title="Buy us a coffee" as={Link} href="https://cafecito.app/sebamont" isExternal>
              <Image boxSize={"16px"} objectFit={"cover"} src="https://cdn.cafecito.app/imgs/cafecito_logo.svg" alt="Cafecito logo" />
            </Button>
            <Button title="Donations" as={Link} href="https://www.paypal.com/donate/?hosted_button_id=DXWQJYHL6HE9U" isExternal>
              <FaPaypal />
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
