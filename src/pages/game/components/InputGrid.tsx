import React, { FC, useState } from "react";

import { Flex, Modal, ModalBody, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalFooter, Button  } from "@chakra-ui/react";

import InputGridRow from "./InputGridRow";
import { GameStatus } from "../types";

interface InputGridProps {
  hiddenWord: string;
  posibleAttempts: number;
  gameStatus: GameStatus
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
  emojiDrawResult: string[];
  setEmojiDrawResult: React.Dispatch<React.SetStateAction<string[]>>
}

const InputGrid: FC<InputGridProps> = ({ hiddenWord, posibleAttempts, gameStatus, setGameStatus, emojiDrawResult, setEmojiDrawResult }) => {
  const [openInvalidWordDialog, setOpenInvalidWordDialog] = useState(false)

  const handleCloseInvalidWordDialog = () => {
    setOpenInvalidWordDialog(false)
    document.getElementById(`${emojiDrawResult.length}-${hiddenWord.length - 1}`)?.focus()
  }

  return (
    <Flex direction={"column"} alignItems={"center"} >
      {Array(posibleAttempts)
        .fill(0)
        .map((_, index) => (
          <InputGridRow
            key={index}
            hiddenWord={hiddenWord}
            autofocus={index === 0}
            rowNumber={index}
            posibleAttempts={posibleAttempts}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            emojiDrawResult={emojiDrawResult}
            setEmojiDrawResult={setEmojiDrawResult}
            setOpenInvalidWordDialog={setOpenInvalidWordDialog}
          />
        ))}
        {openInvalidWordDialog && (
          <Modal  isOpen={openInvalidWordDialog} onClose={handleCloseInvalidWordDialog}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Invalid word, please try again
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleCloseInvalidWordDialog}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        )}
    </Flex>
  );
};

export default InputGrid;
