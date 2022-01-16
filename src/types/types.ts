export interface LetterMatch {
    letter: string;
    scoreColor: "green" | "yellow" | "gray";
}

export type NumberFrom4To10 = 4 | 5 | 6 | 7 | 8 | 9 | 10

export type GameStatus = "playing" | "won" | "lost"

export enum SquareEmojis {
    green = "🟩",
    yellow = "🟨",
    gray = "⬜"
}