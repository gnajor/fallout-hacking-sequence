<script lang="ts">
    import { playEnter, playTyping } from "$lib/keySounds";

    let {onClick, text, position}: {
        onClick: Function,
        text: string;
        position: string;
    } = $props();
</script>

<button
    class={position ?? ""}
    onclick={() => {
        playEnter();
        onClick();
    }}
    onmouseenter={() => {playTyping()}}
>{text}</button>

<style>
    button{
        margin: 2rem 2.5rem;
        font-size: var(--text-md);
    }

    button.bottom-right{
        position: absolute;
        bottom:0;
        right:0;
    }

    button:hover{
        background-color: var(--main-color);
        color: black;
    }
</style>