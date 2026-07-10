<script lang="ts">
    import { generateGrid } from "$lib/gameLogic";
    import { gameStateData } from "../state/gameState.svelte";
    import { onMount } from "svelte";
    import { startScanClock } from "$lib/scanClock";
    import Grid from "./Grid.svelte";
    import Header from "./Header.svelte";
    import OutputContainer from "./OutputContainer.svelte";

    let terminalEl = $state<HTMLElement>();
    let barEl = $state<HTMLElement>();
    let pulse = $state(false);
    let headerLoaded = $state(false);
    let cancelled = $state(false);

    onMount(async () => {
        gameStateData.grid = await generateGrid(gameStateData.difficulty);
    });

    onMount(() => {
        const delay = 6000 + Math.random() * 7000;

        const interval = setInterval(() => {
            pulse = true;

            setTimeout(() => {
                pulse = false;
            }, 2500);
        }, delay);

        return () => clearInterval(interval);
    });

    $effect(() => {
        if (gameStateData.gridLoaded && barEl) {
            startScanClock(
                terminalEl as HTMLElement, 
                barEl as HTMLElement
            );
        }
    });

    $effect(() => {
        if(cancelled) return;
        const onKeydown = () => {
            cancelled = true;
            gameStateData.gridLoaded = true;
        };
        window.addEventListener("keydown", onKeydown, { once: true });
        window.addEventListener("click", onKeydown, {once: true});
    });
</script>

<div id="terminal" class:pulse={pulse} bind:this={terminalEl}>
    <Header bind:headerLoaded bind:cancelled/>
    <main>
        {#if headerLoaded}
            <Grid {headerLoaded} bind:cancelled/>
        {/if}
        <OutputContainer/>
    </main>
    {#if gameStateData.gridLoaded}
        <div class="scan-bar" bind:this={barEl}></div>
    {/if}
</div>

<style>
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

    #terminal{
        padding: 2rem 2.5rem;
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

