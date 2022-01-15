import React, { FC, useEffect, useMemo, useState } from "react";
import axios from "axios";

import { WordsInDatabase } from "../helpers/constants";
import { isAValidWord } from "../helpers/functions";
import InputGrid from "../components/InputGrid";
import { useLocation } from "react-router-dom";

const Game: FC = () => {
  const { search } = useLocation();
  const [hiddenWord, sethiddenWord] = useState("");
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const DIFFICULTY = useMemo(() => {
    const queryWord = queryParams.get("w");
    const difficulty = queryParams.get("difficulty");
    return queryWord && queryWord.length > 3 && queryWord.length < 11
      ? (queryWord.length as 4 | 5 | 6 | 7 | 8 | 9 | 10)
      : difficulty && Number(difficulty) > 3 && Number(difficulty) < 11
      ? (Number(difficulty) as 4 | 5 | 6 | 7 | 8 | 9 | 10)
      : 5;
  }, [queryParams]);

  const ATTEMPTS = useMemo(() => {
    const attempts = queryParams.get("attempts");
    return attempts && Number(attempts) > 3 && Number(attempts) < 11
      ? Number(attempts)
      : 5;
  }, [queryParams]);

  useEffect(() => {
    const fetchWords = async () => {
      let validWord = false;
      const queryWord = queryParams.get("w")
      if(queryWord && queryWord.length > 3 && queryWord.length < 10 ){
        sethiddenWord(queryWord)
          validWord=true;
      }
      while (!validWord) {
        const numberOfWords: number = WordsInDatabase[DIFFICULTY];
        const randomNumber = Math.floor(Math.random() * Number(numberOfWords));
        const res = await axios.get(
          `https://sheet.best/api/sheets/c72e3bdd-a075-418c-8ec5-62bafcbd96bc/tabs/${DIFFICULTY}letters/search?Report=0&_limit=1&_offset=${randomNumber}`
        );
        const temptativeWord = res.data[0].Word;
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
  }, [DIFFICULTY, queryParams]);

  return (
    <>
      {hiddenWord && (
        <InputGrid hiddenWord={hiddenWord} posibleAttempts={ATTEMPTS} />
      )}
    </>
  );
};

export default Game;
