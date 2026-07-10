<script lang="ts">
    import { gameStateData } from "../state/gameState.svelte";
    const hovering = $derived(">" + gameStateData.hovering);

    let visibleCount = $state(1);

    $effect(() => {
        hovering;
        visibleCount = 1;

        const interval = setInterval(() => {
            if(visibleCount >= hovering.length){
                clearInterval(interval);
                return;
            }
            visibleCount++;
        }, 50);

        return () => clearInterval(interval);
    });

</script>

<div id="outputContainer">
    {#each gameStateData.outputLog as outputArr}
        {#each outputArr as output}
            <p class="scan-text">{output}</p>
        {/each}
    {/each}
    {#if gameStateData.gridLoaded}
        <div id="firstOutput">
            <p id="hovering" class="scan-text">
                {#each hovering.split("") as char, i}
                    {#if i < visibleCount}
                        <span>{char}</span>
                    {/if}
                {/each}
            </p>
            <div id="blink"></div>
        </div>
    {/if}
</div>

<style>
    p{
        font-size: clamp(0.55rem, 1.6vw, 1.2rem);
        margin: 0;
        color: var(--main-color);
    }

    #firstOutput{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    #hovering{
        display: flex;
        flex-wrap: wrap;
    }

    #hovering span{
        opacity: 0;
        animation: appear 0.5s steps(1, start) forwards;
    }

    #blink{
        animation: blink 1s steps(1, start) infinite;
        width: clamp(0.5rem, 0.8vw, 0.8rem);
        height: clamp(0.8rem, 1.2vw, 1.2rem);
        background-color: var(--main-color);
    }

    @keyframes blink{
        50% {
            visibility: hidden;
        }
    }

    @keyframes appear{
        to {
            opacity: 1;
        }
    }
</style>