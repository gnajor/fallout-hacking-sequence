<script lang="ts">
    import { generateGrid } from "$lib/gameLogic";
    import { gameStateData } from "../state/gameState.svelte";
    import { onMount } from "svelte";
    import { startScanClock } from "$lib/scanClock";
    import Grid from "./Grid.svelte";
    import Header from "./Header.svelte";
    import OutputContainer from "./OutputContainer.svelte";

    let terminalEl: HTMLElement;
    let barEl: HTMLElement;

    onMount(async () => {
        gameStateData.grid = await generateGrid(gameStateData.difficulty);
    });

    $effect(() => {
        if (gameStateData.gridLoaded && barEl) {
            startScanClock(terminalEl, barEl);
        }
    });

    let headerLoaded = $state(false);
</script>
<div id="wrapper">
    <div id="chassi">
        <div id="terminal" bind:this={terminalEl}>
            <div class="refresh-line"></div>
            <Header bind:headerLoaded/>
            <main>
                {#if headerLoaded}
                    <Grid {headerLoaded}/>
                {/if}
                <OutputContainer/>
            </main>
            {#if gameStateData.gridLoaded}
                <div class="scan-bar" bind:this={barEl}></div>
            {/if}
        </div>
    </div>
</div>

<style>
    #wrapper{
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

   .scan-bar {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 400px; 
        pointer-events: none;
        z-index: 3;
       /*  background: color-mix(in srgb, var(--main-color) 8%, transparent);  */
    }

    #chassi{
        background-image: url("/images/background5.png");
        background-size: cover;
        background-position: center;
        width: 83rem;
        aspect-ratio: 1450 / 980;
        position: relative; 
    }

    #terminal{
        position: absolute;
        top: 12.5%;    
        left: 17%;
        width: 55%;
        height: 63%;

        padding: 2rem 2.5rem;
        border-radius: 2rem;
        background-color: black;
        box-shadow:
        inset 0 0 60px rgba(0, 0, 0, 0.95),
        inset 0 0 20px rgba(0, 0, 0, 0.9),
        0 0 8rem 6rem rgba(0, 0, 0, 0.9),
        0 0 3rem 2rem rgba(255, 255, 255, 0.06);
        overflow: hidden;
        filter: blur(0.3px);
    }

    #terminal::before {
        content: '';
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0, 0, 0, 0.15) 3px,
            rgba(0, 0, 0, 0.15) 4px
        );
        pointer-events: none;
        z-index: 10;
        border-radius: 2rem;
    }


    #terminal::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(
            ellipse at center,
            transparent 55%,
            rgba(0, 0, 0, 0.75) 100%
        );
        pointer-events: none;
        z-index: 10;
        border-radius: 2rem;
    }

    main{
        display: flex;
        align-items: end;
        gap: 0.5rem;
    }


    /*     @media (max-width: 768px) {
            #chassi {
                aspect-ratio: unset;
                width: 100vw;
                min-height: 100svh;
                background-image: none;
            }

            #terminal {
                position: relative;
                left: unset;
                top: unset;
                width: 100%;
                height: 100%;
                min-height: 100svh;
                border-radius: 0;
                padding: 1rem;
            }
        } */
</style>

