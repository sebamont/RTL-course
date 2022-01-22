import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  WrapItem,
  Center,
  VStack,
  Heading,
  HStack,
  Text,
  Tooltip,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { NumberFrom4To10 } from "../../pages/game/types";
import { CLASSIC_FEATURES } from "../../helpers/constants";

interface GameModeCardProps {
  gameModeName: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  isWordLengthCustom?: boolean;
  areAttemptsCustom?: boolean;
  isWordCustom?: boolean;
}

const GameModeCard: FC<GameModeCardProps> = ({
  gameModeName,
  buttonRef,
  isWordLengthCustom = false,
  areAttemptsCustom = false,
  isWordCustom = false,
}) => {
  const navigate = useNavigate();
  const [customWordLength, setCustomWordLength] = useState<NumberFrom4To10>(
    CLASSIC_FEATURES.difficulty
  );
  const [customAttempts, setCustomAttempts] = useState<NumberFrom4To10>(
    CLASSIC_FEATURES.attempts
  );
  const [customWord, setCustomWord] = useState<string>(
    gameModeName.toUpperCase()
  );

  const handleClickPlayButton = () => {
    let url = "/play?";
    if (!isWordCustom && isWordLengthCustom && customWordLength !== 5) {
      url += `&difficulty=${customWordLength}`;
    }
    if (areAttemptsCustom && customAttempts !== 6) {
      url += `&attempts=${customAttempts}`;
    }
    navigate(url);
  };

  return (
    <WrapItem>
      <VStack
        shadow="lg"
        h="200px"
        borderRadius="lg"
        w="330px"
        border={"4px"}
        borderColor="purple.400"
        // bg={useColorModeValue("purple.100", "purple.800")}
      >
        <Center h="30%" w="full">
          {isWordCustom ? (
            <>
              <Editable
                value={customWord}
                onChange={(value) => setCustomWord(value)}
                fontSize="2xl"
                textShadow="4px 6px 1px rgba(0, 0, 0, 0.15)"
                as={Heading}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </>
          ) : (
            <Heading
              as="h3"
              size="2xl"
              textShadow="4px 6px 1px rgba(0, 0, 0, 0.15)"
            >
              {gameModeName.toUpperCase()}
            </Heading>
          )}
        </Center>
        <Box
          h="70%"
          w="full"
          // bg={useColorModeValue("gray.100", "gray.800")}
          borderBottomRadius="lg"
          display="flex"
          flexDirection="column"
        >
          <Center flexGrow={1}>
            <HStack spacing={2} w="full" justify="flex-end">
              {!isWordCustom && (
                <Box w="30%">
                  <Center h="40px">
                    {isWordLengthCustom ? (
                      <NumberInput
                        w="80%"
                        size="sm"
                        min={4}
                        max={10}
                        value={customWordLength}
                        onChange={(value) =>
                          setCustomWordLength(Number(value) as NumberFrom4To10)
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    ) : (
                      <Heading as="h4" size="md">
                        {CLASSIC_FEATURES.difficulty}
                      </Heading>
                    )}
                  </Center>
                  <Text>Word length</Text>
                </Box>
              )}
              <Box w="30%">
                <Center h="40px">
                  {areAttemptsCustom ? (
                    <NumberInput
                      w="80%"
                      size="sm"
                      min={4}
                      max={10}
                      value={customAttempts}
                      onChange={(value) =>
                        setCustomAttempts(Number(value) as NumberFrom4To10)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  ) : (
                    <Heading as="h4" size="md">
                      {CLASSIC_FEATURES.attempts}
                    </Heading>
                  )}
                </Center>
                <Text>Attempts</Text>
              </Box>
              <Box w="30%">
                <Center h="40px">
                  <Tooltip
                    label={
                      areAttemptsCustom || isWordLengthCustom
                        ? "More languages coming soon!"
                        : ""
                    }
                  >
                    <Heading as="h4" size="md">
                      English
                    </Heading>
                  </Tooltip>
                </Center>
                <Text>Language</Text>
              </Box>
            </HStack>
          </Center>
          <Box>
            <Button
              w={"full"}
              bg={"purple.400"}
              color={"white"}
              _hover={{
                bg: "pink.700",
              }}
              ref={buttonRef}
              borderRadius={0}
              onClick={handleClickPlayButton}
            >
              Play
            </Button>
          </Box>
        </Box>
      </VStack>
    </WrapItem>
  );
};

export default GameModeCard;
