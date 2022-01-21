import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Container,
  Text,
  Flex,
  Button,
  useColorModeValue,
  useColorMode,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { GameHelpDialog } from "./GameHelpDialog";

interface NavProps {
  isHelpDialogOpen: boolean;
  onOpenHelpDialog: () => void;
  onCloseHelpDialog: () => void;
}

const Nav: FC<NavProps> = ({
  isHelpDialogOpen,
  onCloseHelpDialog,
  onOpenHelpDialog,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      bg={useColorModeValue("gray.300", "gray.900")}
      px={4}
      boxShadow={"base"}
    >
      <Container maxW={"container.xl"}>
        <Flex py={3} alignItems={"center"} justifyContent={"space-between"}>
          <Box as={RouterLink} to="/">
            <Text
              bgGradient={useColorModeValue(
                "linear(to-l, #553C9A, #521B41)",
                "linear(to-l, #D6BCFA, #FED7E2)"
              )}
              bgClip="text"
              fontWeight="extrabold"
              fontSize={"lg"}
            >
              &lt;Hello Wordle /&gt;
            </Text>
          </Box>

          <HStack alignItems={"center"} spacing="3px">
            <Button
              variant={"solid"}
              colorScheme={"purple"}
              size={"sm"}
              mr={4}
              rightIcon={<FaPlay />}
              as={RouterLink}
              to={"/play"}
              iconSpacing={useBreakpointValue({ base: 0, md: "5px" })}
            >
              {useBreakpointValue({ base: "", md: "Quick play" })}
            </Button>
            <Button onClick={toggleColorMode} title="Toggle color mode">
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button title="How to play" onClick={onOpenHelpDialog}>
              <FaInfoCircle />
            </Button>
          </HStack>
        </Flex>
      </Container>
      <GameHelpDialog isOpen={isHelpDialogOpen} onClose={onCloseHelpDialog} />
    </Box>
  );
};

export default Nav;
