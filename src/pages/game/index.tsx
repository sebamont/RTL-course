import React, { FC, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

import InputGrid from "./components/InputGrid";
import { GameStatus, NumberFrom4To10 } from "./types";
import {  secretPhrase, WordsInDatabase } from "../../helpers/constants";
import { isAValidWord } from "../../helpers/functions";
import { Box, VStack } from "@chakra-ui/react";
import GameInfo from "./components/GameInfo";

const Game: FC = () => {
  const { search } = useLocation();
  const [hiddenWord, sethiddenWord] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
  const [emojiDrawResult, setEmojiDrawResult] = useState<string[]>([])
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
      ? (QUERYWORD.length as NumberFrom4To10)
      : difficulty && Number(difficulty) > 3 && Number(difficulty) < 11
      ? (Number(difficulty) as NumberFrom4To10)
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
    <VStack>
      <GameInfo difficulty={DIFFICULTY} attempts={ATTEMPTS}/>
      <Box>
      {hiddenWord && (
        <InputGrid hiddenWord={hiddenWord} posibleAttempts={ATTEMPTS} gameStatus={gameStatus} setGameStatus={setGameStatus} setEmojiDrawResult={setEmojiDrawResult}/>
      )}
      {gameStatus==="lost" && (
        <div>
          <p>You lost: the word was {hiddenWord}</p>
        </div>
      )}
      {gameStatus==="won" && (
        <div>
          <p>You won on: {emojiDrawResult.length}/{ATTEMPTS} attempts!</p>
          <div>
            {emojiDrawResult.map((row,i) => <div key={i}>{row} </div>)}
          </div>
        </div>
      )}
      </Box>
    </VStack>
  );
};

export default Game;
