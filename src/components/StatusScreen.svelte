<script lang="ts">
    import { gameStateData } from "../state/gameState.svelte";

 
const {loadingType}: {loadingType: "level" | "initiating"} = $props();

</script>

<div id="status-screen">
    {#if loadingType === "initiating"}
        <div id="container">
            <img src="/images/walking.gif" alt="Fallout boy walking gif">
            <p>Initiating...</p>
        </div>
    {:else if loadingType === "level"}
        <div id="container">
            <h1>Level {gameStateData.currentLevel}</h1>
        </div>
    {/if}
</div>

<style>
    #status-screen{
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
    }

    #container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:2rem;
    }

    p{
        color: var(--main-color);
        font-size: 1.75vw;
    }

    img{
        width: 12vw;
    }

    h1{
        color: var(--main-color);
        font-size: var(--text-lg);
    }
</style>