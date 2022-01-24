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
}

const InvalidWordDialog: FC<InvalidWordDialogProps> = ({
  setOpenInvalidWordDialog,
  openInvalidWordDialog,
}) => {
  const handleCloseInvalidWordDialog = () => {
    setOpenInvalidWordDialog(false);
  };
  return (
    <Modal
      isCentered
      isOpen={openInvalidWordDialog}
      onClose={handleCloseInvalidWordDialog}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invalid word</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          That is not a valid english word, please try again
        </ModalBody>
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
