import React, { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  Text,
} from "@chakra-ui/react";

interface GameHelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameHelpDialog: FC<GameHelpDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How to play</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>The goal of the game is to guess the hidden word</Text>
          <Text>
            Each guess must be a valid english word. Just type it and it'll get
            validated.
          </Text>
          <Text>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </Text>
          <Divider />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
