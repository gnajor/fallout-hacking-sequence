<script lang="ts">
    import { calcLikeness } from "$lib/gameLogic";
    import { playEnter, playTyping } from "$lib/keySounds";
    import { randomItem, wait } from "$lib/utils";
    import { gameStateData } from "../state/gameState.svelte";
    import type { Token } from "../types/game";

    let {headerLoaded, cancelled = $bindable(false)}: {
        headerLoaded: boolean, 
        cancelled: boolean
    } = $props();

    let hoveredGroupId = $state<string | null>(null);
    let visibleCount = $state(0);

    $effect(() => {
        if(cancelled){
            visibleCount = gameStateData.grid.length;
            gameStateData.gridLoaded = true;
            return;
        }

        gameStateData.grid;
        visibleCount = 0;
        gameStateData.gridLoaded = false;

        const interval = setInterval(() => {
            if(visibleCount >= gameStateData.grid.length){
                clearInterval(interval);
                gameStateData.gridLoaded = true;
                return;
            }
            //playTyping();
            visibleCount++;
        }, 10);

        return () => clearInterval(interval);
    });

    function onmouseenter(item: Token){
        if(item.type === "non_inter" || !gameStateData.gridLoaded) return;

        if(item.type === "bracket"){
            hoveredGroupId = item.groupId ?? null;
            gameStateData.hovering = item.groupId?.split(" ")[1] ?? item.value;
        } 
        else if(item.type === "junk"){
            hoveredGroupId = null;
            gameStateData.hovering = item.value;
        }
        else{
            hoveredGroupId = item.groupId ?? null;
            gameStateData.hovering = item.groupId ?? item.value;
        }
        gameStateData.hovering.split("").forEach(() => playTyping());
    }

    function onmouseleave(){
        hoveredGroupId = null;
    }

    function onGuess(word: string, type: string, groupId: string | undefined): void{
        if(word === gameStateData.password){
            gameStateData.status = "won";
        }

        if(gameStateData.maxTriesOutput === gameStateData.outputLog.length){
            gameStateData.outputLog.splice(0, 1);
        }

        if(type === "word" || type === "junk"){
            const likeness = calcLikeness(word, gameStateData.password);
            gameStateData.outputLog.push([
                ">" + word,
                ">Entry denied",
                ">Likeness=" + likeness
            ]);
            gameStateData.attemptsLeft--;
        }
        else if(type === "bracket" && word.length > 1){
            const removeWordEffect = randomItem([true, false]);

            if(removeWordEffect){
                removeWord(groupId as string);
                gameStateData.outputLog.push([
                    ">" + word,
                    ">Dud Removed"
                ]);
            }
            else{
                addAttempt(groupId as string)
                gameStateData.outputLog.push([
                    ">" + word,
                    ">Try Reset"
                ]);
            }
        }

        if(gameStateData.attemptsLeft === 0){
            gameStateData.status = "lost";
        }
    }

    function removeWord(groupId: string){
        const randWord = randomItem(gameStateData.words.filter(word => word !== gameStateData.password));
        gameStateData.words.splice(gameStateData.words.indexOf(randWord), 1);

        for(let i = 0; i < gameStateData.grid.length; i++){
            if(gameStateData.grid[i].groupId === groupId){
                gameStateData.grid[i].type = "junk";
                gameStateData.grid[i].used = true;
                gameStateData.grid[i].groupId = undefined;
            }

            if(gameStateData.grid[i].groupId === randWord){
                gameStateData.grid[i].type = "junk";
                gameStateData.grid[i].value = ".";
                gameStateData.grid[i].groupId = undefined;
            }
        }
    }

    function addAttempt(groupId: string){
        gameStateData.attemptsLeft++;

        for(let i = 0; i < gameStateData.grid.length; i++){
            if(gameStateData.grid[i].groupId === groupId){
                gameStateData.grid[i].type = "junk";
                gameStateData.grid[i].used = true;
                gameStateData.grid[i].groupId = undefined;
            }
        }
    }

    function onCellClick(item: Token): void{
        if(!gameStateData.gridLoaded) return; 
        let param: string;

        if(!item.groupId){
            param = item.value 
        }
        else{
            param = (item.type !== "word") ? item.groupId.split(" ")[1] : item.groupId;
        }
        onGuess(param, item.type, item.groupId ?? "");
        playEnter();
    }

</script>

<div class="grid">
    {#if headerLoaded}
        {#each gameStateData.grid as item, i}
            <button 
                class="scan-text"
                role="cell" 
                tabindex={item.type !== 'non_inter' ? 0 : -1}
                class:marked={item.groupId === hoveredGroupId}
                class:non-inter={item.type === "non_inter"}
                class:not-ready={!gameStateData.gridLoaded}
                class:hidden={i >= visibleCount}
                onmouseenter={() => onmouseenter(item)}
                {onmouseleave}
                onclick={() => onCellClick(item)}
            >
                {item.value}
            </button>
        {/each}
    {/if}
</div>

<style>
    button{
        padding: 0;
        background-color: transparent;
        border:none;
    }

    .grid button.hidden {
        visibility: hidden;
    }

    .grid{
        display: grid;
        grid-template-columns: repeat(36, auto);
        grid-template-rows: repeat(16, auto);
    }

    .grid button {
        font-family: "fallout_font";
        font-size: var(--text-ml); /* clamp prevents collapsing on tiny screens */
        color: var(--main-color);
    }

    .grid .marked,
    .grid > button:not(.non-inter, .not-ready):hover{
        background-color: var(--main-color);
        color: #000 !important;
        text-shadow: none;
    }

    .grid .non-inter:nth-child(6n){
        margin-right: 1rem;
    }

    .grid button:nth-child(18n){
        margin-right: 1rem;
    }

/*     @media (max-width: 768px) {
        .grid {
            grid-template-columns: repeat(18, auto);
            grid-template-rows: auto;
        }

        .grid .non-inter:nth-child(6n) {
            margin-right: unset;
        }
        .grid .non-inter:nth-child(3n) {
            margin-right: 0.5rem;
        }
        .grid button:nth-child(18n) {
            margin-right: unset;
        }
        .grid button:nth-child(9n) {
            margin-right: 0.5rem;
        }
    } */

</style>