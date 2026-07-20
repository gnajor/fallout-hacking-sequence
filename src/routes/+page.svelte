<script lang="ts">
    import { goto } from "$app/navigation";
    import { audio } from "$lib/audioState.svelte";
    import { onDestroy, onMount } from "svelte";

    let videoEl: HTMLVideoElement;

    $effect(() => {
        audio.activeEl = videoEl;

        if (videoEl){
            videoEl.volume = audio.volume / 100;
            videoEl.play();
        }
    });

    $effect(() => {
        const onKeydown = () => {
            goto("/main-menu");
        };
        window.addEventListener("keydown", onKeydown, { once: true });
        //window.addEventListener("click", onKeydown, {once: true}); 
    });

    onDestroy(() => {audio.activeEl = null});
</script>

<div id="screen">
    <video autoplay loop bind:this={videoEl}>
        <source
            src="/videos/fallout-video-smaller.mp4"
            type="video/mp4"
        >
    </video>
    <p>Press any button to start</p>
</div>

<style>
    #screen{
        position: relative;
        overflow: hidden;
    }

    video{
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.1);
        transform-origin: center center;
    }

    p{
        color: var(--main-color);
        position: absolute;
        bottom: 0;
        font-size: 1.5vw;
        left: 50%;
        transform: translate(-50%, 0%);
        width:max-content;

        bottom:10%;
        filter: blur(1px);
        text-shadow: 2px 2px black;
    }
</style>



