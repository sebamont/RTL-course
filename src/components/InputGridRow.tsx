import React, { FC, useCallback, useEffect, useState } from "react";
import RICIBs from "react-individual-character-input-boxes";

import { GameStatus, LetterMatch } from "../types/types";
import { drawEmojiRow, isAValidWord } from "../helpers/functions";

interface InputGridRowProps {
  hiddenWord: string;
  autofocus?: boolean;
  rowNumber: number;
  posibleAttempts: number;
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  setEmojiDrawResult: React.Dispatch<React.SetStateAction<string[]>>;
}

const InputGridRow: FC<InputGridRowProps> = ({
  hiddenWord,
  autofocus = false,
  rowNumber,
  posibleAttempts,
  gameStatus,
  setGameStatus,
  setEmojiDrawResult
}) => {
  const [locked, setLocked] = useState(false);
  const [attemptWord, setAttemptWord] = useState("");
  const [letterMatch, setLetterMatch] = useState<LetterMatch[]>([]);

  const submitValidAttempt = (str: string) => {
    setAttemptWord(str.toLowerCase());
    setLocked(true);
  };

  const handleOutput = async (str: string) => {
    if (str.length === hiddenWord.length) {
      if (hiddenWord === str) {
        submitValidAttempt(str);
        return setGameStatus("won");
      }
      const isValidAttempt = await isAValidWord(str);
      if (isValidAttempt) {
        submitValidAttempt(str);
        if (rowNumber < posibleAttempts - 1) {
          return document.getElementById(`${rowNumber + 1}-0`)?.focus();
        }
        return setGameStatus("lost");
      }
      return alert("Invalid word");
    }
  };

  const checkLetterMatches = useCallback(() => {
    const hiddenWordAsArray = hiddenWord.split("");
    const attemptWordAsArray = attemptWord.split("");
    const match: LetterMatch[] = attemptWordAsArray.map((letter) => ({
      letter: letter,
      scoreColor: "gray",
    }));
    for (let i = attemptWordAsArray.length - 1; i >= 0; i--) {
      if (hiddenWord[i] === attemptWord[i]) {
        match[i].scoreColor = "green";
        hiddenWordAsArray.splice(i, 1);
      }
    }
    attemptWordAsArray.forEach((letter, i) => {
      if (
        hiddenWordAsArray.includes(letter) &&
        match[i].scoreColor !== "green"
      ) {
        match[i].scoreColor = "yellow";
        hiddenWordAsArray.splice(hiddenWordAsArray.indexOf(letter), 1);
      }
    });
    setLetterMatch(match);
    setEmojiDrawResult((prev) => prev.concat(drawEmojiRow(match)))
  }, [attemptWord, hiddenWord, setEmojiDrawResult]);

  useEffect(() => {
    if (attemptWord !== "") {
      checkLetterMatches();
    }
  }, [attemptWord, checkLetterMatches]);

  return (
    <RICIBs
      amount={hiddenWord.length}
      autoFocus={autofocus}
      handleOutputString={handleOutput}
      inputProps={Array(hiddenWord.length)
        .fill(0)
        .map((_, index) => ({
          disabled: gameStatus !== "playing" || locked,
          style:
            letterMatch.length === hiddenWord.length
              ? {
                  backgroundColor: letterMatch[index].scoreColor,
                }
              : {},
          id: `${rowNumber}-${index}`,
        }))}
      inputRegExp={/^[a-zA-Z]$/}
    />
  );
};

export default InputGridRow;
