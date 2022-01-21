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
import ShareButtons from "../../common/components/ShareButtons";

const Game: FC = () => {
  const { search } = useLocation();
  const [hiddenWord, sethiddenWord] = useState("");
  const [hiddenWordDefinition, setHiddenWordDefinition] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [emojiDrawResult, setEmojiDrawResult] = useState<string[]>([]);
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
      ? Number(attempts)
      : CLASSIC_FEATURES.attempts;
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
          "https://intense-reaches-30246.herokuapp.com/"
        );
        if (res.data.word) {
          sethiddenWord(res.data.word.toLowerCase());
          validWord = true;
        }
        // const validTemptativeWord = await isAValidWord(temptativeWord);
        // if (temptativeWord && validTemptativeWord) {
        // } else {
        //   await axios.delete(
        //     `https://sheet.best/api/sheets/c72e3bdd-a075-418c-8ec5-62bafcbd96bc/tabs/${DIFFICULTY}letters/search?Word=${temptativeWord}`
        //   );
        // }
      }
    };
    fetchWords();
  }, [DIFFICULTY, queryParams, QUERYWORD]);

  useEffect(() => {
    const fetchDefinition = async () => {
      const definition = await getWordDefinition(hiddenWord);
      setHiddenWordDefinition(definition);
    };
    if (gameStatus === "lost") {
      fetchDefinition();
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
        {gameStatus === "lost" && (
          <div>
            <p>You lost: the word was {hiddenWord}</p>
            <p>It means {hiddenWordDefinition}</p>
            <ShareButtons
              linkHref={shareableLink}
              twMessage={
                "I couldnt find the hidden word! 🤔 %0a Do you think you could? %0a "
              }
              wppMessage={
                "I couldnt find the hidden word! :( %0a Do you think you could? %0a "
              }
            />
          </div>
        )}
        {gameStatus === "won" && (
          <div>
            <p>
              You won on: {emojiDrawResult.length}/{ATTEMPTS} attempts!
            </p>
            <div id="result-as-emojis">
              {emojiDrawResult.map((row, i) => (
                <div key={i}>{row} </div>
              ))}
            </div>
            <ShareButtons
              linkHref={shareableLink}
              twMessage={
                emojiDrawResult.join("%0a") +
                `%0a Took me ${emojiDrawResult.length} attempt${
                  emojiDrawResult.length > 1 ? "s" : ""
                }! %0a Could you do it better?`
              }
            />
          </div>
        )}
      </Box>
    </VStack>
  );
};

export default Game;
