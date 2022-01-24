import React, { FC } from "react";

import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface InvalidWordDialogProps {
  setOpenInvalidWordDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openInvalidWordDialog: boolean;
  emojiDrawResult: string[];
  hiddenWord: string;
}

const InvalidWordDialog: FC<InvalidWordDialogProps> = ({
  setOpenInvalidWordDialog,
  openInvalidWordDialog,
  emojiDrawResult,
  hiddenWord,
}) => {
  const handleCloseInvalidWordDialog = () => {
    setOpenInvalidWordDialog(false);
    document
      .getElementById(`${emojiDrawResult.length}-${hiddenWord.length - 1}`)
      ?.focus();
  };
  return (
    <Modal
      isCentered
      isOpen={openInvalidWordDialog}
      onClose={handleCloseInvalidWordDialog}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>That is not a valid english word, please try again</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="purple"
            mr={3}
            onClick={handleCloseInvalidWordDialog}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvalidWordDialog;
