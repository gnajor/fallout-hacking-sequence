import type { Token } from "../types/game.ts";
import { chars } from "$lib/data/chars";
import { randomInt, randomItem, shuffle } from "$lib/utils";
import { gameStateData } from "../state/gameState.svelte.ts";
import { gameConfig } from "./gameConfig.ts";

export async function generateGrid(difficulty: number) : Promise<Token[]>{
    const allWords: string[] = await fetchWords(difficulty);
    const totalcells = gameConfig.gridColsInter * gameConfig.gridRows;

    const raw: Token[] = Array.from(
        {length: totalcells},
        () => ({
            type: "junk",
            value: randomItem(chars.junk),
            used: false,
        })
    );
    
    const wordsAmount = gameStateData.wordsAmount;
    let {words, password} = pickWords(allWords, wordsAmount);
    words = words.map(word => word.toUpperCase());
    password = password.toUpperCase();
    
    gameStateData.words = words;
    gameStateData.password = password;

    let firstGrid = putWordsInArr(
        words.slice(0, words.length / 2), 
        raw.slice(0, raw.length / 2)
    );

    let secGrid = putWordsInArr(
        words.slice(words.length / 2, words.length), 
        raw.slice(raw.length / 2, raw.length)
    );

    const rows = gameConfig.gridRows;
    const cols = gameConfig.gridColsInter / 2;

    firstGrid = setParanthesisId(firstGrid, cols, rows);
    secGrid = setParanthesisId(secGrid, cols, rows);

    const nonInterData = generateNonInterData(gameConfig.gridRows * 2);
    const nonInterFirstHalf = nonInterData.slice(0, nonInterData.length / 2);
    const nonInterSecHalf = nonInterData.slice(nonInterData.length / 2, nonInterData.length);

    let grid : Token[] = []
    const gap = gameConfig.gridColsInter / 2;

    for(let i = 0; i < gameConfig.gridRows; i++){
        let first: Token[] = nonInterFirstHalf[i]
            .split("")
            .map(char => ({
                type: "non_inter",
                value: char,
                used: false
            }));

        first = first.concat(firstGrid.slice(i * gap, gap * (i + 1)));
        
        let sec: Token[] = nonInterSecHalf[i]
            .split("")
            .map(char => ({
                type: "non_inter",
                value: char,
                used: false,
            }));
            
        sec = sec.concat(secGrid.slice(i * gap, gap * (i + 1)));
        
        grid = grid.concat(first.concat(sec));
    }
    return grid;
}

function setParanthesisId(arr: Token[], cols: number, rows: number,): Token[]{
    for(let i = 0; i < rows; i++){
        const first = cols * i;
        const last = cols * (i + 1);
        let continueNextRow = false;

        const coords = checkParanthesis(
            arr.slice(first, last).map(elem => elem.value)
        );
        
        if(!coords?.length) continue; 
   
        const outerCoords = coords.filter((coord) => 
            !coords.some(other => 
                other !== coord && 
                coord.startIndex > other.startIndex &&
                coord.endIndex < other.endIndex
            )
        )

        const uuid = self.crypto.randomUUID();


        for(const coord of outerCoords){
            const groupIds = arr
                .slice(coord.startIndex + first, coord.endIndex + first)
                .map((elem) => elem.groupId);

            for(const id of groupIds){
                if(id && gameStateData.words.includes(id)){
                    continueNextRow = true;
                }
            }

            if(continueNextRow){
                continue;
            }

            let value = arr.slice(coord.startIndex + first, coord.endIndex + first + 1).map(elem => elem.value).join("");

            arr[coord.startIndex + first].groupId = uuid + " " + value;
            arr[coord.startIndex + first].type = "bracket";

            for(let i = coord.startIndex + first + 1; i < coord.endIndex + first + 1; i++){
                arr[i] = {
                    type: arr[i].type,
                    value: arr[i].value,
                    groupId: uuid + " " + value
                }
            }
        }
    }
    return arr;
}

function putWordsInArr(words : string[], arr : Token[]): Token[]{
    const validStarts = shuffle(
        Array.from(
            {length: arr.length - words[0].length},
            (_, i) => i
        )
    );

    const taken = new Set<number>();

    for(const word of words){
        for(const pos of validStarts){
            const fits = 
                !taken.has(pos - word.length + 1) &&
                !taken.has(pos + (word.length + word.length - 1)) && 
                word.split("").every((_, i) => !taken.has(pos + i));

            if(fits){
                word.split("").forEach((char, i) => {
                    arr[pos + i] = {
                        type: "word",
                        value: char,
                        groupId: word,
                        used: false,
                    }
                    taken.add(pos + i);
                });
                break;
            } 
        }
    }
    return arr;
}

export function pickWords(allWords: string[], amount: number): { words: string[], password: string } {
    const password = randomItem(allWords);
    const candidates = allWords.filter(w => w !== password);

    const distribution = [
        { likeness: 0, count: Math.floor(amount * 0.3) },
        { likeness: 1, count: Math.floor(amount * 0.3) },
        { likeness: 2, count: Math.floor(amount * 0.2) },
        { likeness: 3, count: Math.floor(amount * 0.1) },
        { likeness: 4, count: Math.floor(amount * 0.1) },
    ];

    const picked = new Set<string>();

    for(const { likeness, count } of distribution) {
        shuffle(candidates)
        .filter(w => calcLikeness(w, password) === likeness && !picked.has(w))
        .slice(0, count)
        .forEach(w => picked.add(w));
    }

    shuffle(candidates)
        .filter(w => !picked.has(w))
        .slice(0, amount - picked.size)
        .forEach(w => picked.add(w));

    picked.add(password);

    return{
        words: shuffle([...picked]).slice(0, amount),
        password,
    };
}

function checkParanthesis(arr: string[]): {startIndex: number, endIndex: number}[] | undefined{
    const result: { startIndex: number; endIndex: number }[] = [];

    for (let i = 0; i < arr.length; i++) {
        const openIndex = chars.brackets.open.indexOf(arr[i]);
        if (openIndex === -1) continue;

        const closing = chars.brackets.close[openIndex];

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] === closing) {
                result.push({
                    startIndex: i,
                    endIndex: j
                });
                break;
            }
        }
    }
    return result;
}


export function calcLikeness(word: string, password: string): number{
    let likeness = 0;

    for(let i = 0; i < word.length; i++){
        const wordLetter = word[i];
        const passwordLetter = password[i];

        if(wordLetter === passwordLetter){
            likeness++;
        }
    }
    return likeness;
}

function generateNonInterData(rows: number): string[]{
    const { lettersNums, fixedChars } = chars;

    const char1 = randomItem(lettersNums);
    const char2 = randomItem(lettersNums.filter(c => c !== char1));
    const switchRow = randomInt(6, 20);

    const char2Index = lettersNums.indexOf(char2);
    const switchedChar = lettersNums[(char2Index + 1) % lettersNums.length];

    return Array.from({ length: rows }, (_, rowIndex) => {
        const char3 = randomItem(lettersNums);
        const char4 = randomItem(lettersNums);

        const prefix = rowIndex > switchRow
        ? fixedChars + char1 + switchedChar
        : fixedChars + char1 + char2;

        return prefix + char3 + char4;
    });
}

async function fetchWords(difficulty: number): Promise<string[]> {
    const res = await fetch(`/data/words/words_${difficulty}.json`);
    if(!res.ok) throw new Error(`Failed to fetch words for length ${difficulty}`);
    return res.json();
}
