import { levels } from "$lib/gameConfig";
import type { Token } from "../types/game";

export const gameStateData = $state({
    password: "",
    grid: [] as Token[],
    words: [] as string[],
    attemptsLeft: 4,
    maxTriesOutput: 5 as number,
    outputLog: [] as string[][],
    status: "playing" as "playing" | "won" | "lost",
    gridLoaded: false,
    hovering: "" as string,
    currentLevel: 1,
    
    wordLength: 4 as 4 | 5 | 6 | 7 | 8 | 9,
    wordsAmount: 10,
    distribution: [] as {likeness: number; count: number}[]
});

export function loadLevel(index: number){
    console.log(index )
    const level = levels[index];
    gameStateData.currentLevel = level.level;
    gameStateData.wordLength = level.wordLength;
    gameStateData.wordsAmount = level.wordsAmount;
    gameStateData.distribution = [...level.distribution];
    gameStateData.attemptsLeft = 4;
    gameStateData.outputLog = [];
    gameStateData.status = "playing";
    gameStateData.hovering = "";
    gameStateData.grid = [];
    gameStateData.words = [];
    gameStateData.gridLoaded = false;
}



