import { NumberFrom4To10 } from "../pages/game/types";

export const secretPhrase = process.env.REACT_APP_DECRYPTION_PHRASE;

export const CLASSIC_FEATURES:{attempts: NumberFrom4To10, difficulty: NumberFrom4To10} = {
    attempts: 6,
    difficulty: 5
}