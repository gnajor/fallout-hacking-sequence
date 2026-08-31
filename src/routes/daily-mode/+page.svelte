<script lang="ts">
    import { onMount } from "svelte";
    import Game from "../../components/Game.svelte";
    import MenuLink from "../../components/MenuLink.svelte";
    import { gameStateData } from "../../state/gameState.svelte";
    import { sessionState } from "../../state/sessionState.svelte";
    import InputName from "../../components/InputName.svelte";

    const {form} = $props();
    onMount(() => {gameStateData.status = "playing";});
</script>

{#if gameStateData.status === "playing"}
    <Game showLevel={false}/>
{:else if gameStateData.status === "won"}
    <div id="status-screen">
    {#if sessionState.username === ""}
        <InputName form/>
    {:else}
        <div id="container">
            <img src="/images/thumbs_up.gif" alt="Fallout boy making thumbs up gif">
            <p>Password Accepted: {gameStateData.password}</p>
        </div>
        <MenuLink
            onClick={() => {}}
            link="/main-menu"
            text={"[Back]"}
            linkStyle={"bottom-left"}
        />
    {/if}
    </div>
{:else}
    <div id="status-screen">
    {#if sessionState.username === ""}
        <InputName form/>
    {:else}
        <div id="container">
            <p>Game Over</p>
            <p>The password was: {gameStateData.password}</p>
        </div>
        <MenuLink
            onClick={() => {}}
            link="/main-menu"
            text={"[Back]"}
            linkStyle={"bottom-left"}
        />
        <MenuLink
            onClick={() => {}}
            link="/levels"
            text={"[Go Practice]"}
            linkStyle={"bottom-right"}
        />
    {/if}
    </div>
{/if}