import React, { FC } from "react";
import InputGridRow from "./InputGridRow";

interface InputGridProps {
  hiddenWord: string;
  posibleAttempts: number;
}

const InputGrid: FC<InputGridProps> = ({ hiddenWord, posibleAttempts }) => {
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
          />
        ))}
    </div>
  );
};

export default InputGrid;
