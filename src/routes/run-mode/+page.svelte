<script lang="ts">
    import { wait } from "$lib/utils";
    import Game from "../../components/Game.svelte";
    import { gameStateData } from "../../state/gameState.svelte";

    type Screen = "game" | "success";
    let screen = $state<Screen>("game");

    $effect(() => {
        if(gameStateData.status === "won"){
            async function runSequence(){
                screen = "success";
                await wait(2000);
                gameStateData.currentLevel++;
                screen = "game"
            }
            runSequence();
        }
    });

</script>

{#if screen === "game"}
    <Game showLevel={true}/>
{:else if screen === "success"}
    <div id="status-screen">
        <div id="container">
            <img src="/images/thumbs_up.gif" alt="Fallout boy making thumbs up gif">
            <p>Password Accepted</p>
        </div>
    </div>
{/if}

<style>
    #status-screen{
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
    }

    #container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:2rem;
    }

    p{
        color: var(--main-color);
        font-size: 1.75vw;
    }

    img{
        width: 12vw;
    }
</style>