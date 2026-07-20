<script lang="ts">
    let {mode}: {
        mode: "loading" | "success" ;
    } = $props();

</script>

<div id="status-screen">
    {#if mode === "loading"}
        <div id="container">
            <img src="/images/walking.gif" alt="Fallout boy walking gif">
            <p>Initiating...</p>
        </div>
    {:else if mode === "success"}
        <div id="container">
            <img src="/images/thumbs_up.gif" alt="Fallout boy making thumbs up gif">
            <p>Password Accepted</p>
        </div>
    {/if}
</div>

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