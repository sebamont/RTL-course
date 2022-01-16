import React, { FC } from "react";

import InputGridRow from "./InputGridRow";
import { GameStatus } from "../types/types";

interface InputGridProps {
  hiddenWord: string;
  posibleAttempts: number;
  gameStatus: GameStatus
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
  setEmojiDrawResult: React.Dispatch<React.SetStateAction<string[]>>
}

const InputGrid: FC<InputGridProps> = ({ hiddenWord, posibleAttempts, gameStatus, setGameStatus, setEmojiDrawResult }) => {
  return (
    <div>
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
            setEmojiDrawResult={setEmojiDrawResult}
          />
        ))}
    </div>
  );
};

export default InputGrid;
