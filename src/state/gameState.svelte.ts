import type { Token } from "../types/game";

export const gameStateData = $state({
    password: "",
    grid: [] as Token[],
    words: [] as string[],
    attemptsLeft: 4,
    maxTriesOutput: 0 as number,
    outputLog: [] as string[],
    status: "playing" as "playing" | "won" | "lost",
    difficulty: 4 as 4 | 5 | 6 | 7 | 8 | 9,
    wordsAmount: 12,
    gridLoaded: false,
    hovering: "",
});


