<script lang="ts">
    import { goto } from "$app/navigation";
    import { levels } from "$lib/gameConfig";
    import { gameStateData } from "../../state/gameState.svelte";
</script>

<div id="screen">
    <header>
        <p>ROBCO Industries (TM) Termlink</p>
        <p>Select Difficulty Level</p>
    </header>
    <main id="levels-container">
        {#each levels as level}
            <a 
                href="/hacking"
                class="level"
                onclick={() => {gameStateData.currentLevel = level.level - 1}}
            >{level.level < 10 ? "0" + level.level : level.level}</a>
        {/each}
    </main>
</div>

<style> 
    #screen{
        padding: 2rem 2.5rem;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #levels-container{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap:1.25vw;

    }

    header{
        display: flex;
        flex-direction: column;
        gap:0.4rem;
    }

    p{
        color: var(--main-color);
    }

    header p:nth-child(2){
        color: var(--main-darker-color);
    }

    a{
        display: flex;
        justify-content: center;
        align-items: center;
        padding:0.5vw;
        border:1px solid var(--main-color);
        font-size: large;
    }

    a:hover{
        background-color: var(--main-color);
        color: black;
    }
</style>