<script lang="ts">
    import Game from "../../components/Game.svelte";
    import StatusScreen from "../../components/StatusScreen.svelte";
    import { gameStateData } from "../../state/gameState.svelte";

    let showStatus = $state(false);

    $effect(() => {
        if(gameStateData.status !== "playing"){
            console.log("hello");
            showStatus = true;

            const timeout = setTimeout(() => {
                gameStateData.currentLevel++;
                showStatus = false;
            }, 4000);

            return () => clearTimeout(timeout);
        }
    });

</script>

{#if showStatus}
    <StatusScreen 
        mode={gameStateData.status === "won" ? "victory" : "loss"}
        gameMode={"run"} 
    />
{:else}    
    <Game/>ß
{/if}



<style>

</style>