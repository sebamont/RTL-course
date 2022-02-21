import axios from "axios"
import { LetterMatch, SquareEmojis } from "../pages/game/types";

export const isAValidWord = async(word:string) => {
    try {
        const res = await axios.get(
            `https://owlbot.info/api/v4/dictionary/${word}`,
            {
              headers: {
                Authorization: `Token ${process.env.REACT_APP_OWLBOT_TOKEN}`,
              },
            }
          );
        return res.status === 200;    
    } catch (error) {
        return false
    }
}

export const getWordDefinition = async(word:string) => {
  try {
    const res = await axios.get(`https://owlbot.info/api/v4/dictionary/${word}`,
    {
      headers: {
        Authorization: `Token ${process.env.REACT_APP_OWLBOT_TOKEN}`,
      },
    })
    return res.data.definitions[0].definition as string
  } catch (error) {
    throw error
  }
}

export const drawEmojiRow = (letterMatchArr:LetterMatch[]) => {
  return letterMatchArr.map((letterMatch) => SquareEmojis[letterMatch.scoreColor]).join("")
}