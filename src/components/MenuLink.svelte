<script lang="ts">
    import { playEnter, playTyping } from "$lib/keySounds";

    let {onClick, link, text, linkStyle}: {
        onClick: Function,
        link: string;
        text: string;
        linkStyle: string;
    } = $props();
</script>

<a 
    class={linkStyle ?? ""}
    href={link}
    onclick={() => {
        playTyping();
        onClick();
    }}
    onmouseenter={() => {playEnter()}}
>
    {text}
</a>

<style>
    a{
        font-size:var(--text-md);
    }

    .menu-link{
        padding: 0.25rem 3rem;
        display: block;
        cursor: var(--main-cursor);
    }

    .bottom-left{
        position: absolute;
        bottom:0;
        left:0;
        margin: 2rem 2.5rem;
    }

    .bottom-right{
        position: absolute;
        bottom:0;
        right:0;
        margin: 2rem 2.5rem;
    }

    .bottom-left-block{
        width:fit-content;
    }

    a:hover{
        background-color: var(--main-color);
        color: black;
    }
</style>