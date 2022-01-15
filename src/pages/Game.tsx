import React, { FC, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

import {  secretPhrase, WordsInDatabase } from "../helpers/constants";
import { isAValidWord } from "../helpers/functions";
import InputGrid from "../components/InputGrid";

const Game: FC = () => {
  const { search } = useLocation();
  const [hiddenWord, sethiddenWord] = useState("");
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const QUERYWORD = useMemo(() => {
    const encryptedHash = queryParams.get("w")?.replaceAll(" ","+");
    if(secretPhrase && encryptedHash){
      return CryptoJS.AES.decrypt(encryptedHash, secretPhrase).toString(CryptoJS.enc.Utf8)
    }
  } ,[queryParams])

  const DIFFICULTY = useMemo(() => {
    const difficulty = queryParams.get("difficulty");
    return QUERYWORD && QUERYWORD.length > 3 && QUERYWORD.length < 11
      ? (QUERYWORD.length as 4 | 5 | 6 | 7 | 8 | 9 | 10)
      : difficulty && Number(difficulty) > 3 && Number(difficulty) < 11
      ? (Number(difficulty) as 4 | 5 | 6 | 7 | 8 | 9 | 10)
      : 5;
  }, [queryParams, QUERYWORD]);

  const ATTEMPTS = useMemo(() => {
    const attempts = queryParams.get("attempts");
    return attempts && Number(attempts) > 3 && Number(attempts) < 11
      ? Number(attempts)
      : 5;
  }, [queryParams]);

  useEffect(() => {
    const fetchWords = async () => {
      let validWord = false;
      
      if(QUERYWORD && QUERYWORD.length > 3 && QUERYWORD.length < 10 ){
        sethiddenWord(QUERYWORD)
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
  }, [DIFFICULTY, queryParams, QUERYWORD]);

  return (
    <>
    {hiddenWord}
      {hiddenWord && (
        <InputGrid hiddenWord={hiddenWord} posibleAttempts={ATTEMPTS} />
      )}
    </>
  );
};

export default Game;
