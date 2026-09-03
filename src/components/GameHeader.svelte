<script lang="ts">
    import { gameStateData } from "../state/gameState.svelte";
    import TypeLine from "./TypeLine.svelte";

    let { headerLoaded = $bindable(false), cancelled = $bindable(false) } = $props();
    let companyTextLoaded = $state(false);

    const companyText = "Welcome to ROBCO Industries (TM) Termlink";
    const passowordText = "Password Required";
</script>

<header>
    <div id="title-container">
        <h1 class="scan-text">
            <TypeLine 
                text={companyText}
                {cancelled}
                onDone={() => companyTextLoaded = true}
            />
        </h1>
        {#if companyTextLoaded}
            <h1 class="scan-text">
                <TypeLine 
                    text={passowordText}
                    {cancelled}
                    onDone={() => headerLoaded = true}
                />
            </h1>
        {/if}
    </div>

    <div id="attempts-container" class:visible={gameStateData.gridLoaded}>
        <h1 class="scan-text">Attempts Remaining:</h1>
        <div id="attempts-left">
            {#each {length: gameStateData.attemptsLeft}}
                <div class="attempt"></div>
            {/each}
        </div>
    </div>
</header>

<style>
    #attempts-container{
        display: flex;
        gap: clamp(0.3rem, 0.8vw, 0.8rem);
        margin: clamp(0.5rem, 1vw, 0.8rem) 0;
        visibility: hidden;
        flex-wrap: wrap;
    }

    #attempts-container.visible{
        visibility: visible;
    }

    #attempts-left{
        display: flex;
        align-items: center;
        gap: clamp(0.3rem, 0.8vw, 0.8rem);
    }

    #title-container{
        display: flex;
        flex-direction: column;
        gap: clamp(0.5rem, 1vw, 1rem);
    }

    h1{
        color: var(--main-color);
        margin: 0;
        font-size: var(--text-ml);
        font-weight: normal;
    }

    .attempt{
        width: clamp(0.5rem, 0.8vw, 0.8rem);
        height: clamp(0.7rem, 1vw, 1rem);
        background-color: var(--main-color);
    }

</style>