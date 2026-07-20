<script lang="ts">
    import Game from "../../components/Game.svelte";
    import StatusScreen from "../../components/StatusScreen.svelte";
    import { gameStateData } from "../../state/gameState.svelte";
</script>

{#if gameStateData.status === "playing"}
    <Game/>
{:else if gameStateData.status === "won"}
    <StatusScreen mode="success"/>
{:else}
{/if}
