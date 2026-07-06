<script lang="ts">
    import { gameStateData } from "../state/gameState.svelte";

    const {text, cancelled, speed=10, onDone} = $props<{
        text: String,
        cancelled: boolean,
        speed?: Number,
        onDone?: () => void;
    }>();

    let visible = $state(0);

    $effect(() => {
        if (cancelled) {
            visible = text.length;
            onDone?.();
            return;
        }

        let i = 0;

        const interval = setInterval(() => {
            i++;
            visible = i;
            if(i >= text.length){
                clearInterval(interval)
                onDone?.();
            }
        }, speed);

        return () =>  clearInterval(interval);
    });
</script>

{#each text.split("") as char, i}
    {#if i < visible}
        <span>{char}</span>
    {/if}
{/each}

