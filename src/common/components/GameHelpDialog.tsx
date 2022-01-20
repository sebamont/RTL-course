import React, { FC } from "react";
import RICIBs from "react-individual-character-input-boxes";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  Text,
  useColorMode,
  useTheme,
  Stack,
} from "@chakra-ui/react";

interface GameHelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameHelpDialog: FC<GameHelpDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How to play</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Text>The goal of the game is to guess the hidden word</Text>
            <Text>
              Each guess must be a valid english word. Just type it and it'll
              get validated.
            </Text>
            <Text>
              After each guess, the color of the tiles will change to show how
              close your guess was to the word.
            </Text>
            <Divider />
            <Text fontSize="lg" as="em" textAlign="center">
              Examples
            </Text>
            <RICIBs
              amount={5}
              inputProps={[
                {
                  value: "H",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
                {
                  value: "O",
                  style: { backgroundColor: "green" },
                  disabled: true,
                },
                {
                  value: "U",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
                {
                  value: "S",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
                {
                  value: "E",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
              ]}
              inputRegExp={/^[a-zA-Z]$/}
            />
            <Text fontSize="sm">
              The letter O <strong>is</strong> in the word and{" "}
              <strong>in the correct position</strong>.
            </Text>
            <RICIBs
              amount={5}
              inputProps={[
                {
                  value: "C",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
                {
                  value: "A",
                  style: { backgroundColor: "yellow" },
                  disabled: true,
                },
                {
                  value: "T",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
                {
                  value: "C",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
                {
                  value: "H",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
              ]}
              inputRegExp={/^[a-zA-Z]$/}
            />
            <Text fontSize="sm">
              The letter A <strong>exists</strong> in the hidden word but{" "}
              <strong>is not in the right position</strong>.
            </Text>
            <RICIBs
              amount={5}
              inputProps={[
                {
                  value: "C",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
                {
                  value: "H",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
                {
                  value: "I",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
                {
                  value: "L",
                  style: { backgroundColor: "gray" },
                  disabled: true,
                },
                {
                  value: "I",
                  style: {
                    border: `2px solid ${
                      theme.colors.gray[colorMode === "dark" ? 400 : 600]
                    }`,
                    backgroundColor:
                      colorMode === "dark"
                        ? theme.colors.gray[700]
                        : theme.colors.white,
                  },
                  disabled: true,
                },
              ]}
              inputRegExp={/^[a-zA-Z]$/}
            />
            <Text fontSize="sm">
              The letter L <strong>is not</strong> in the hidden word.
            </Text>

            <Divider />
            <Text>
              With those examples you could guess that the hidden word is{" "}
              <strong>BOARD</strong>
            </Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
