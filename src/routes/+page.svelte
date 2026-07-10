<script lang="ts">
    import { goto } from "$app/navigation";

    $effect(() => {
        if (videoEl){
            videoEl.volume = volume / 100;
            videoEl.play();
        }
    });

    let volume = $state(0);
    let videoEl = $state<HTMLVideoElement>();

    $effect(() => {
  /*       const onKeydown = () => {
            goto("/hacking");
        };
        window.addEventListener("keydown", onKeydown, { once: true });
        window.addEventListener("click", onKeydown, {once: true}); */
    });
</script>

<div id="terminal">
    <video autoplay loop bind:this={videoEl}>
        <source
            src="/videos/fallout-video-smaller.mp4"
            type="video/mp4"
        >
    </video>
    <p>Press any button to start</p>
</div>
<div id="second-screen">
    <input 
        type="range" 
        min="0" 
        max="100" 
        bind:value={volume}
        style="--val: {volume}%"
    />
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--main-color)">
        <path d="M155.08-202.77Q120-237.85 120-287.69q0-49.85 35.08-84.93 35.07-35.07 84.92-35.07 23 0 43.65 8.19 20.66 8.19 36.35 24.58v-337.39l442.31-80v424.62q0 49.84-35.08 84.92t-84.92 35.08q-49.85 0-84.93-35.08-35.07-35.08-35.07-84.92 0-49.85 35.07-84.93 35.08-35.07 84.93-35.07 23 0 43.65 8.19 20.66 8.19 36.35 24.58v-181.16L360-567.69v280q0 49.84-35.08 84.92-35.07 35.08-84.92 35.08t-84.92-35.08Z"/>
    </svg>
</div>

<style>
    #terminal{
        position: relative;
        overflow: hidden;
    }

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
        border-radius: 0px;
        outline: none;
        border: none;
        cursor: none;
        background: linear-gradient(
            to top,
            var(--main-color) var(--val),
            #111 var(--val)
        );
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 11px;
        height: 11px;
        background: var(--main-color);
        cursor: pointer;
    }

    input[type="range"]::-moz-range-thumb {
        width: 11px;
        height: 11px;
        background: var(--main-color);
        border-radius: 0px;
        border: 2px solid black;
        cursor: pointer;
    }

    button{
        font-size: 2.25vw;
        line-height: 1;
        background-color: transparent;
        border: none;
        color: var(--main-color);
        padding:0;
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



