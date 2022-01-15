import React, { FC, useState } from "react";
import RICIBs from "react-individual-character-input-boxes";
import { isAValidWord } from "../helpers/functions";

interface InputGridRowProps {
  hiddenWord: string;
  autofocus?: boolean;
  rowNumber: number;
  posibleAttempts: number;
}

const InputGridRow: FC<InputGridRowProps> = ({
  hiddenWord,
  autofocus = false,
  rowNumber,
  posibleAttempts,
}) => {
  const [locked, setLocked] = useState(false);
  const [attemptWord, setAttemptWord] = useState("");
  // const [characterValidation, setCharacterValidation] = useState<"exact" | "includes" | "">[]
  const handleOutput = async (str: string) => {
    if (str.length === hiddenWord.length) {
      const isValidAttempt = await isAValidWord(str);
      if (isValidAttempt) {
        setAttemptWord(str.toLowerCase());
        setLocked(true);
        if (hiddenWord === str) {
          alert("You won!");
        } else {
          if (rowNumber < posibleAttempts - 1) {
            document.getElementById(`${rowNumber + 1}-0`)?.focus();
          } else {
            alert("you lost, the word was: " + hiddenWord);
          }
        }
      } else {
        alert("Invalid word");
      }
    }
  };

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
            attemptWord !== ""
              ? {
                  backgroundColor:
                    attemptWord[index] === hiddenWord[index]
                      ? "green"
                      : hiddenWord.includes(attemptWord[index])
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
