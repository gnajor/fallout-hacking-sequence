<script lang="ts">
    import { onMount } from "svelte";
    import Game from "../../components/Game.svelte";
    import MenuLink from "../../components/MenuLink.svelte";
    import { gameStateData } from "../../state/gameState.svelte";

    onMount(() => {gameStateData.status = "playing";});
</script>

{#if gameStateData.status === "playing"}
    <Game showLevel={false}/>
{:else if gameStateData.status === "won"}
    <div id="status-screen">
        <div id="container">
            <img src="/images/thumbs_up.gif" alt="Fallout boy making thumbs up gif">
            <p>Password Accepted: {gameStateData.password}</p>
        </div>
    </div>
        <MenuLink
            onClick={() => {}}
            link="/main-menu"
            text={"[Back]"}
            linkStyle={"bottom-left"}
        />
{:else}
    <div id="status-screen">
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
    </div>
{/if}