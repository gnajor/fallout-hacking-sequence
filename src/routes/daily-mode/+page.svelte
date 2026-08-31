<script lang="ts">
    import { onMount } from "svelte";
    import Game from "../../components/Game.svelte";
    import MenuLink from "../../components/MenuLink.svelte";
    import { gameStateData } from "../../state/gameState.svelte";
    import { sessionState } from "../../state/sessionState.svelte";
    import InputName from "../../components/InputName.svelte";
    import { deserialize, applyAction } from "$app/forms";
    import type { ActionResult } from "@sveltejs/kit";

    const {form} = $props();
    onMount(() => {gameStateData.status = "playing";});
    $effect(() => {
        if(form?.success){
            if(form?.username) sessionState.username = form.username;
            if(form?.streak) sessionState.dailyStreak = form.streak;
        }
    });

    $effect(() => {
        if(gameStateData.status === "lost" || gameStateData.status === "won"){
            submitScore();
        }
    })

    async function submitScore(){
        const formData = new FormData();
        formData.append("score", String(gameStateData.currentScore));
        formData.append("level", String(gameStateData.currentLevel - 1));

        const res = await fetch("?/postDailyStreak", {
            method: "POST",
            body: formData
        });

        const result: ActionResult = deserialize(await res.text());
        applyAction(result);
    }
</script>

{#if gameStateData.status === "playing"}
    <Game showLevel={false} runMode={false}/>
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