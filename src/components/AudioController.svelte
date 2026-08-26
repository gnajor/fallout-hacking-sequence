<script lang="ts">
    import { audio } from "$lib/audioState.svelte";
    import { onMount } from "svelte";

    let inputEl = $state<HTMLInputElement>();

    onMount(() => {audio.volume = Number(inputEl?.value) ?? 0;});

    function oninput(e: Event) {
        if(audio.activeEl){
            audio.activeEl.play();
        }
    
        const v = parseFloat((e.target as HTMLInputElement).value);
        audio.volume = v;
        if (audio.activeEl) audio.activeEl.volume = v / 100;
    }
</script>

<div id="second-screen">
    <input 
        bind:this={inputEl}
        type="range" 
        min="0" 
        max="100" 
        bind:value={audio.volume}
        style="--val: {audio.volume}%"
        {oninput}
    />
    {#if audio.volume === 0}
        <svg id="audioOff" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--main-color)">
            <path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Z"/>
        </svg>
    {:else}
        <svg id="audioOn" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--main-color)">
            <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"/>
        </svg>
    {/if}
</div>

<style>
    svg{
        width: 2.5rem;
        height: 2.5rem;
    }

    #second-screen{
        position: absolute;
        width: 6.5%;
        height: 25%;
        background-color: black;
        right:12.5%;
        top:28%;
        border-radius: 1.25rem;
        box-shadow: 0 0 21px 10px hsla(0, 0%, 0%, 0.80);
        color: var(--main-color);
        padding: 1.5rem 0;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap:0.5rem;
    }

    input{
        -webkit-appearance: none;
        appearance: none;
        writing-mode: vertical-lr;
        direction: rtl;
        width: 4px;
        height: 100%;
        background: var(--main-color);
        outline: none;
        border: none;
        cursor: none;
        background: linear-gradient(
            to top,
            var(--main-color) var(--val),
            #111 var(--val)
        );
        cursor: var(--cursor);
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 11px;
        height: 11px;
        background: var(--main-color);
        cursor: var(--cursor);
        border-radius: 50%;
    }

    input[type="range"]::-moz-range-thumb {
        width: 11px;
        height: 11px;
        background: var(--main-color);
        border-radius: 50%;
        border: 2px solid black;
        cursor: var(--cursor);
    }
</style>