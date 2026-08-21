<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Game from "../../components/Game.svelte";
    import { gameStateData, resetLevel } from "../../state/gameState.svelte";
    import MenuButton from "../../components/MenuButton.svelte";
    import MenuLink from "../../components/MenuLink.svelte";

    onMount(() => {gameStateData.status = "playing";});

    onDestroy(() => {
        resetLevel();
    });

    let pressedNext = $state(false);

    function retryLevel(){
        pressedNext = false;
        gameStateData.status = "playing"
    }
    function nextLevel(){
        pressedNext = true;
        gameStateData.currentLevel += 1; 
        gameStateData.status = "playing";
    }
</script>

{#if gameStateData.status === "playing"}
    <Game showLevel={pressedNext ? true : false}/>
{:else if gameStateData.status === "won"} 
    <div id="status-screen">
        <div id="container">
            <img src="/images/thumbs_up.gif" alt="Fallout boy making thumbs up gif">
            <p>Password Accepted</p>
        </div>
        
        <MenuLink
            onClick={() => {}}
            link="/levels"
            text={"[Back]"}
            linkStyle={"bottom-left"}
        />
        <MenuButton
            onClick={nextLevel}
            text={"[Next Level]"}
            position={"bottom-right"}
        />
    </div>
{:else if gameStateData.status === "lost"}
    <div id="status-screen">
        <div id="container">
            <p>Game Over</p>
        </div>
        <MenuLink
            onClick={() => {}}
            link="/main-menu"
            text={"[Back]"}
            linkStyle={"bottom-left"}
        />
        <MenuButton
            onClick={retryLevel}
            text={"[Retry]"}
            position={"bottom-right"}
        />
    </div>
{/if}

<style>
    #back-button{
        position: absolute;
        bottom:0;
        left:0;
        margin: 2rem 2.5rem;
        font-size: var(--text-md);
    }
</style>
