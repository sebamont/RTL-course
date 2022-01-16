import axios from "axios"
import { LetterMatch, SquareEmojis } from "../types/types";

export const isAValidWord = async(word:string) => {
    try {
        const res = await axios.get(
            `https://owlbot.info/api/v4/dictionary/${word}`,
            {
              headers: {
                Authorization: "Token e5150ccd369ec7a59ffe470c7106c3c7b2c8d645",
              },
            }
          );
        return res.status === 200;    
    } catch (error) {
        return false
    }
}

export const drawEmojiRow = (letterMatchArr:LetterMatch[]) => {
  return letterMatchArr.map((letterMatch) => SquareEmojis[letterMatch.scoreColor]).join("")
}