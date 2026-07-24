<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
    import { audio, tracks } from "$lib/audioState.svelte";
    import { onMount } from "svelte";
	import "../app.css";
    import AudioController from "../components/AudioController.svelte";
    import { page } from "$app/state";

	let { children } = $props();
	let musicEl: HTMLAudioElement;
    const isLandingPage = $derived(page.url.pathname === "/");

    onMount(async () => {
        audio.activeEl = musicEl;
    });

    $effect(() => {
        if(audio.activeEl === null && musicEl){
            audio.activeEl = musicEl;
            musicEl.volume = 0;
            audio.volume = 0;
        }
    });

    $effect(() => {
        if(!musicEl) return;
        if(isLandingPage){
            musicEl.pause();
            audio.volume = 0;
        } else{
            musicEl.play();
        }
    });

	function nextTrack() {
        audio.trackIndex = (audio.trackIndex + 1) % tracks.length;
    }
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<audio 
    bind:this={musicEl} 
    src={tracks[audio.trackIndex]} 
    autoplay 
    onended={nextTrack}
></audio>

<div id="wrapper">
    <div id="chassi">
		<div id="terminal">
			{@render children()}
		</div>
		<AudioController/>
        <div id="button"></div>
	</div>
</div>

<style>
    #button{
        position: absolute;
        width: 2.95%;
        height: 2.6%;
        background-color: #00ff1061;
        right: 18%;
        top: 89.5%;
        color: #21c84b;
        transform: scaleY(1);
        transform: skewX(10deg);
    }

    #button:hover{
        background-color: rgba(255, 0, 0, 0.74);
    }

	#wrapper{
		background-image: url("/images/background.png");
		background-size: cover;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#chassi{
        background-image: url("/images/background5.png");
        background-size: cover;
        background-position: center;
        width: 83rem;
        aspect-ratio: 1450 / 980;
        position: relative; 
    }

    #terminal{
        position: absolute;
        top: 12.5%;    
        left: 17%;
        width: 55%;
        height: 63%;

        border-radius: 2rem;
        background-color: black;
        box-shadow:
        inset 0 0 60px rgba(0, 0, 0, 0.95),
        inset 0 0 20px rgba(0, 0, 0, 0.9),
        0 0 8rem 6rem rgba(0, 0, 0, 0.9),
        0 0 3rem 2rem rgba(255, 255, 255, 0.06);
        overflow: hidden;
        filter: blur(0.3px);
    }
</style>
