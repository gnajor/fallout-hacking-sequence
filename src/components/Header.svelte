<script lang="ts">
    import { getDisplayableUsername, sessionState } from "../state/sessionState.svelte";
    const {text}: {text:string} = $props();

</script>

<header>
    <h1>ROBCO Industries (TM) Termlink</h1>
    <h2>{text} {sessionState.username === "" ? "" : "- Welcome " + getDisplayableUsername()}</h2>
</header>

<style>
    header{
        display: flex;
        flex-direction: column;
        gap:0.4rem;
    }

    header h1{
        font-size: var(--text-md);
    }

    header h2{
        color: var(--main-darker-color);
        font-size: var(--text-sm);
    }
</style>