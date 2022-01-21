import React, { FC, useRef, useEffect } from "react";

import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Link,
  useDisclosure,
  Center,
  Collapse,
  HStack,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import GameModeCard from "../common/components/GameModeCard";

interface HomeProps {
  onOpenHelpDialog: () => void;
}

export const Home: FC<HomeProps> = ({ onOpenHelpDialog }) => {
  const { isOpen, onToggle } = useDisclosure();
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const homeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen && homeButtonRef.current) {
      homeButtonRef.current.focus();
    } else if (isOpen && playButtonRef.current) {
      playButtonRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <Collapse in={!isOpen}>
        <Header
          onOpenHelpDialog={onOpenHelpDialog}
          onToggle={onToggle}
          buttonRef={homeButtonRef}
        />
      </Collapse>
      <Collapse in={isOpen}>
        <GameModes onToggle={onToggle} buttonRef={playButtonRef} />
      </Collapse>
    </>
  );
};

interface HeaderProps extends HomeProps {
  onToggle: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const Header: FC<HeaderProps> = ({ onOpenHelpDialog, onToggle, buttonRef }) => {
  return (
    <Stack
      as={Box}
      textAlign={"center"}
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 36 }}
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        &lt;Hello
        <br />
        <Text as={"span"} color={useColorModeValue("purple.600", "purple.400")}>
          Wordle /&gt;
        </Text>
      </Heading>
      <Text color={useColorModeValue("gray.500", "gray.300")}>
        Our version of the already classic{" "}
        <Link
          color={useColorModeValue("pink.500", "pink.300")}
          href="https://www.powerlanguage.co.uk/wordle/"
          isExternal
        >
          Wordle
        </Link>{" "}
        game. But with a little bit of magic. <br />
        And by magic we mean: infinite playing, customizable word's length and
        number of attempts, and a lot of fun. <br />
        More features and game modes coming soon...
      </Text>
      <Stack
        direction={"column"}
        spacing={3}
        align={"center"}
        alignSelf={"center"}
        position={"relative"}
      >
        <Button
          colorScheme={"purple"}
          rounded={"full"}
          px={6}
          _hover={{
            bg: useColorModeValue("pink.700", "pink.200"),
          }}
          ref={buttonRef}
          onClick={onToggle}
        >
          PLAY NOW
        </Button>
        <Button
          variant={"link"}
          colorScheme={"blue"}
          size={"sm"}
          onClick={onOpenHelpDialog}
        >
          how to play
        </Button>
      </Stack>
    </Stack>
  );
};

interface GameModesProps {
  onToggle: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const GameModes: FC<GameModesProps> = ({ onToggle, buttonRef }) => {
  return (
    <Stack
      as={Box}
      textAlign={"center"}
      spacing={{ base: 6, md: 12 }}
      py={{ base: 8, md: 14 }}
      position="relative"
    >
      <Box position="absolute" top={10}>
        <Button title="Go back" size="xs" onClick={onToggle}>
          <FaArrowLeft />
          &nbsp;Go back
        </Button>
      </Box>
      <Heading as="h3" fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}>
        Game modes
      </Heading>
      <Center>
        <HStack spacing={4}>
          <GameModeCard gameModeName="Classic" buttonRef={buttonRef} />
          <GameModeCard
            gameModeName="Custom"
            isWordLengthCustom
            areAttemptsCustom
          />
        </HStack>
      </Center>
    </Stack>
  );
};
