<script lang="ts">
    import { wait } from "$lib/utils";
    import { onMount } from "svelte";
    import Game from "../../components/Game.svelte";
    import MenuButton from "../../components/MenuButton.svelte";
    import MenuLink from "../../components/MenuLink.svelte";
    import { gameStateData, resetLevel } from "../../state/gameState.svelte";
    import { sessionState } from "../../state/sessionState.svelte";
    import InputName from "../../components/InputName.svelte";
    import type { ActionResult } from "@sveltejs/kit";
    import { applyAction, deserialize } from "$app/forms";

    type Screen = "game" | "success" | "lost";
    let screen = $state<Screen>("game");
    const {form}: {form: any} = $props();

    onMount(() => {gameStateData.status = "playing";});

    async function submitScore(){
        const formData = new FormData();
        formData.append("score", String(gameStateData.currentScore));
        formData.append("level", String(gameStateData.currentLevel - 1));

        const res = await fetch("?/postBestRunScore", {
            method: "POST",
            body: formData
        });

        const result: ActionResult = deserialize(await res.text());
        applyAction(result);
    }

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
        else if(gameStateData.status === "lost"){
            screen = "lost";
            if(sessionState.username !== "") submitScore();
        }
    });

    $effect(() => {
        if(form?.success){
            if(form?.username) {
                sessionState.username = form.username;
            }

            if(form?.level && form?.score){
                sessionState.bestRunLevel = form.level;
                sessionState.bestRunScore = form.score;
            }
        }
    });

    function onRetry(){
        resetLevel();
        screen = "game";
    }
</script>

{#if screen === "game"}
    <Game showLevel={true} runMode={true}/>
{:else if screen === "success"}
    <div id="status-screen">
        <div id="container">
            <img src="/images/thumbs_up.gif" alt="Fallout boy making thumbs up gif">
            <p>Password Accepted</p>
        </div>
    </div>
{:else if screen === "lost"}
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
            <MenuButton
                onClick={onRetry}
                text={"[Retry]"}
                position={"bottom-right"}
            />
        {/if}
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