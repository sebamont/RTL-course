import React, { FC, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

import { Box, Spinner, VStack } from "@chakra-ui/react";

import InputGrid from "./components/InputGrid";
import { GameStatus, NumberFrom4To10 } from "./types";
import { CLASSIC_FEATURES, secretPhrase } from "../../helpers/constants";
import { getWordDefinition } from "../../helpers/functions";
import GameInfo from "./components/GameInfo";
import FinishDialog from "./components/FinishDialog";

const Game: FC = () => {
  const { search } = useLocation();
  const [hiddenWord, sethiddenWord] = useState("");
  const [hiddenWordDefinition, setHiddenWordDefinition] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [emojiDrawResult, setEmojiDrawResult] = useState<string[]>([]);
  const [openFinishDialog, setOpenFinishDialog] = useState(false)
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const QUERYWORD = useMemo(() => {
    const encryptedHash = queryParams.get("w")?.replaceAll(" ", "+");
    if (secretPhrase && encryptedHash) {
      return CryptoJS.AES.decrypt(encryptedHash, secretPhrase).toString(
        CryptoJS.enc.Utf8
      );
    }
  }, [queryParams]);

  const DIFFICULTY = useMemo(() => {
    const difficulty = queryParams.get("difficulty");
    return QUERYWORD && QUERYWORD.length > 3 && QUERYWORD.length < 11
      ? (QUERYWORD.length as NumberFrom4To10)
      : difficulty && Number(difficulty) > 3 && Number(difficulty) < 11
      ? (Number(difficulty) as NumberFrom4To10)
      : CLASSIC_FEATURES.difficulty;
  }, [queryParams, QUERYWORD]);

  const ATTEMPTS = useMemo(() => {
    const attempts = queryParams.get("attempts");
    return attempts && Number(attempts) > 3 && Number(attempts) < 11
      ? Number(attempts) as NumberFrom4To10
      : CLASSIC_FEATURES.attempts as NumberFrom4To10;
  }, [queryParams]);

  const shareableLink = useMemo(() => {
    if (secretPhrase) {
      return (
        window.location.href +
        (queryParams.get("w") !== null
          ? ""
          : `${
              window.location.href.endsWith("play") ? "?&" : "&"
            }w=${CryptoJS.AES.encrypt(hiddenWord, secretPhrase).toString()}`)
      );
    }
    return window.location.href;
  }, [hiddenWord, queryParams]);

  useEffect(() => {
    const fetchWords = async () => {
      let validWord = false;

      if (QUERYWORD && QUERYWORD.length > 3 && QUERYWORD.length < 10) {
        sethiddenWord(QUERYWORD);
        validWord = true;
      }
      while (!validWord) {
        const res = await axios.get(
          `https://intense-reaches-30246.herokuapp.com/${DIFFICULTY}`
        );
        if (res.data.word) {
          sethiddenWord(res.data.word.toLowerCase());
          validWord = true;
        }
      }
    };
    fetchWords();
  }, [DIFFICULTY, queryParams, QUERYWORD]);

  useEffect(() => {
    const fetchDefinition = async () => {
      const definition = await getWordDefinition(hiddenWord);
      setHiddenWordDefinition(definition);
    };
    if (gameStatus !== "playing") {
      fetchDefinition();
        setOpenFinishDialog(true)
    }
  }, [gameStatus, hiddenWord]);

  return (
    <VStack>
      <GameInfo
        difficulty={DIFFICULTY}
        attempts={ATTEMPTS}
        shareableLink={shareableLink}
      />
      <Box>
        {hiddenWord ? (
          <InputGrid
            hiddenWord={hiddenWord}
            posibleAttempts={ATTEMPTS}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            setEmojiDrawResult={setEmojiDrawResult}
          />
        ) : (
          <Spinner size="xl" />
        )}
        {gameStatus !== "playing" && hiddenWordDefinition && (
          <FinishDialog 
            openFinishDialog={openFinishDialog}
            setOpenFinishDialog={setOpenFinishDialog}
            hiddenWord={hiddenWord}
            hiddenWordDefinition={hiddenWordDefinition}
            shareableLink={shareableLink}
            attempts={ATTEMPTS}
            emojiDrawResult={emojiDrawResult}
            hasWon={gameStatus==='won'}
          />
        )}
      </Box>
    </VStack>
  );
};

export default Game;
