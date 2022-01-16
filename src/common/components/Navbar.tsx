import React from "react";
import {Link as RouterLink} from 'react-router-dom'

import {
  Box,
  Container,
  Text,
  Flex,
  Button,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, TriangleUpIcon } from "@chakra-ui/icons";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} boxShadow={"base"}>
        <Container maxW={"container.xl"}>
        <Flex py={2} alignItems={"center"} justifyContent={"space-between"}>
          <Box as={RouterLink} to="/"><Text
  bgGradient={colorMode==='light' ? 'linear(to-l, #553C9A, #521B41)' : 'linear(to-l, #D6BCFA, #FED7E2)'}
  bgClip='text'
  fontWeight='extrabold'
>Wordle Battle</Text></Box>

          <Flex alignItems={"center"}>
              <Button
                variant={"solid"}
                colorScheme={"purple"}
                size={"sm"}
                mr={4}
                rightIcon={<div style={{transform: 'rotate(90deg)'}}> <TriangleUpIcon /></div>}
                as={RouterLink}
                to={"/play?w=U2FsdGVkX1+f5paxrDQqRaRT77/DZTL6ZsodFYhHb+Y="}
              >
                Quick play
              </Button>
              <Button onClick={toggleColorMode} >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
          </Flex>
        </Flex>
        </Container>
      </Box>
  );
}
