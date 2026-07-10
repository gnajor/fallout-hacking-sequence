<script lang="ts">
    import { goto } from "$app/navigation";

    $effect(() => {
        const onKeydown = () => {
            goto("/hacking");
        };
        window.addEventListener("keydown", onKeydown, { once: true });
        window.addEventListener("click", onKeydown, {once: true});
    });
</script>

<div id="terminal">
    <video autoplay loop muted>
        <source
            src="/videos/fallout-video-smaller.mp4"
            type="video/mp4"
        >
    </video>
    <p>Press any button to start</p>
</div>
<div id="second-screen">
    <img src="" alt="">
    <img src="" alt="">    
</div>

<style>
    #terminal{
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
        right: 30%;
        bottom:10%;
        filter: blur(1px);
        text-shadow: 2px 2px black;
    }
</style>



