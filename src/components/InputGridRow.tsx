import React, { FC, useCallback, useEffect, useState } from "react";
import RICIBs from "react-individual-character-input-boxes";
import { isAValidWord } from "../helpers/functions";

interface InputGridRowProps {
  hiddenWord: string;
  autofocus?: boolean;
  rowNumber: number;
  posibleAttempts: number;
}

interface LetterMatch {
  letter: string;
  score: "exact" | "includes" | "bad";
}

const InputGridRow: FC<InputGridRowProps> = ({
  hiddenWord,
  autofocus = false,
  rowNumber,
  posibleAttempts,
}) => {
  const [locked, setLocked] = useState(false);
  const [attemptWord, setAttemptWord] = useState("");
  const [letterMatch, setLetterMatch] = useState<LetterMatch[]>([]);
  const handleOutput = async (str: string) => {
    if (str.length === hiddenWord.length) {
      if (hiddenWord === str) {
        setAttemptWord(str.toLowerCase());
        setLocked(true)
        return alert("You won!");
      }
      const isValidAttempt = await isAValidWord(str);
      if (isValidAttempt) {
        setAttemptWord(str.toLowerCase());
        setLocked(true);
        if (rowNumber < posibleAttempts - 1) {
          return document.getElementById(`${rowNumber + 1}-0`)?.focus();
        }
        return alert("you lost, the word was: " + hiddenWord);
      }
      return alert("Invalid word");
    }
  };

  const checkLetterMatches = useCallback(() => {
    const hiddenWordAsArray = hiddenWord.split("");
    const attemptWordAsArray = attemptWord.split("");
    const match: LetterMatch[] = attemptWordAsArray.map((letter) => ({
      letter: letter,
      score: "bad",
    }));
    for (let i = attemptWordAsArray.length - 1; i >= 0; i--) {
      if (hiddenWord[i] === attemptWord[i]) {
        match[i].score = "exact";
        hiddenWordAsArray.splice(i, 1);
      }
    }
    attemptWordAsArray.forEach((letter, i) => {
      if (hiddenWordAsArray.includes(letter) && match[i].score !== "exact") {
        match[i].score = "includes";
        hiddenWordAsArray.splice(hiddenWordAsArray.indexOf(letter), 1);
      }
    });
    setLetterMatch(match);
  }, [attemptWord, hiddenWord]);

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
          disabled: locked,
          style:
            letterMatch.length === hiddenWord.length
              ? {
                  backgroundColor:
                    letterMatch[index].score === "exact"
                      ? "green"
                      : letterMatch[index].score === "includes"
                      ? "yellow"
                      : "gray",
                }
              : {},
          id: `${rowNumber}-${index}`,
        }))}
      inputRegExp={/^[a-zA-Z]$/}
    />
  );
};

export default InputGridRow;
