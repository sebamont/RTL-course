import React from "react";

import {
  Box,
  Container,
  Text,
  Flex,
  Button,
  useColorModeValue,
  Link,
  Image,
} from "@chakra-ui/react";

import { FaGithub, FaPaypal } from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} h={"56px"}>
      <Container maxW={"container.lg"}>
        <Flex py={2} alignItems={"center"} justifyContent={"space-between"}>
         
          <Text fontSize={"sm"} fontWeight={"light"} textAlign={"center"}>
          © 2022 | Made with 🧉 by{" "}
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
            </Link>
          </Text>

          <Flex alignItems={"center"} >
            <Button p={0} title="Source Code" as={Link} href="https://github.com/sebamont/wordle-react" isExternal>
              <FaGithub />
            </Button>
            <Button p={0} title="Buy us a coffee" as={Link} href="https://cafecito.app/sebamont" isExternal>
              <Image boxSize={"16px"} objectFit={"cover"} src="https://cdn.cafecito.app/imgs/cafecito_logo.svg" alt="Cafecito logo" />
            </Button>
            <Button p={0} title="Donations" as={Link} href="https://www.paypal.com/donate/?hosted_button_id=DXWQJYHL6HE9U" isExternal>
              <FaPaypal />
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
