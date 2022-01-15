import React, { useEffect, useState } from "react";
import axios from "axios";

import { WordsInDatabase } from "./helpers/constants";
import { isAValidWord } from "./helpers/functions";
import InputGrid from "./components/InputGrid";

const DIFFICULTY = 4;

function App() {
  const [hiddenWord, sethiddenWord] = useState("");
  useEffect(() => {
    const fetchWords = async () => {
      let validWord = false;
      while (!validWord) {
        const numberOfWords = WordsInDatabase[4];
        const randomNumber = Math.floor(Math.random() * Number(numberOfWords));
        const res = await axios.get(
          `https://sheet.best/api/sheets/c72e3bdd-a075-418c-8ec5-62bafcbd96bc/tabs/${DIFFICULTY}letters/search?Report=0&_limit=1&_offset=${randomNumber}`
        );
        const temptativeWord = res.data[0].Word;
        // const temptativeWord = "test";
        const validTemptativeWord = await isAValidWord(temptativeWord);
        if (temptativeWord && validTemptativeWord) {
          sethiddenWord(temptativeWord.toLowerCase());
          validWord = true;
        } else {
          await axios.delete(
            `https://sheet.best/api/sheets/c72e3bdd-a075-418c-8ec5-62bafcbd96bc/tabs/${DIFFICULTY}letters/search?Word=${temptativeWord}`
          );
        }
      }
    };
    fetchWords();
  }, []);

  return (
    <>
      {/* {hiddenWord} */}
      {hiddenWord && <InputGrid hiddenWord={hiddenWord} posibleAttempts={5} />}
    </>
  );
}

export default App;
