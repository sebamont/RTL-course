import React, { FC, useState } from "react";

import { Flex } from "@chakra-ui/react";

import InputGridRow from "./InputGridRow";
import { GameStatus } from "../types";
import InvalidWordDialog from "./InvalidWordDialog";

interface InputGridProps {
  hiddenWord: string;
  posibleAttempts: number;
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  emojiDrawResult: string[];
  setEmojiDrawResult: React.Dispatch<React.SetStateAction<string[]>>;
}

const InputGrid: FC<InputGridProps> = ({
  hiddenWord,
  posibleAttempts,
  gameStatus,
  setGameStatus,
  emojiDrawResult,
  setEmojiDrawResult,
}) => {
  const [openInvalidWordDialog, setOpenInvalidWordDialog] = useState(false);

  return (
    <Flex direction={"column"} alignItems={"center"}>
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
        <InvalidWordDialog
          setOpenInvalidWordDialog={setOpenInvalidWordDialog}
          openInvalidWordDialog={openInvalidWordDialog}
        />
      )}
    </Flex>
  );
};

export default InputGrid;
