import { levels } from "$lib/gameConfig";
import type { Token } from "../types/game";

export const gameStateData = $state({
    password: "",
    grid: [] as Token[],
    words: [] as string[],
    attemptsLeft: 4,
    maxTriesOutput: 5,
    outputLog: [] as string[][],
    status: "playing" as "playing" | "won" | "lost",
    gridLoaded: false,
    hovering: "",
    currentLevel: 1,
    currentScore: 0,

    wordLength: 4 as 4 | 5 | 6 | 7 | 8 | 9,
    wordsAmount: 10,
    distribution: [] as {likeness: number; count: number}[]
});

export function loadLevel(index: number){
    loadRunLevel(index);
    gameStateData.currentScore = 0;
}

export function loadRunLevel(index: number){
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

export function resetLevel(): void{
    gameStateData.currentLevel = 1;
    gameStateData.currentScore = 0;
    gameStateData.status = "playing";
}

export function calculateSetScore(): void{
    console.log("hello")
    const level = gameStateData.currentLevel - 1;
    const attemptsLeft = gameStateData.attemptsLeft;
    const baseScore = Math.round(100 * Math.pow(1.4, level - 1));
    
    const attemptMultipliers: Record<number, number> = {
        3: 2.0,
        2: 1.5,
        1: 1.1,
    };

    const attemptMultiplier = (attemptsLeft > 3 ? 2.0 : attemptMultipliers[attemptsLeft]) ?? 1.0;
    const perfectionBonus = attemptsLeft >= 3 ? 500 : 0;
    gameStateData.currentScore += Math.round(baseScore * attemptMultiplier) + perfectionBonus;
}



