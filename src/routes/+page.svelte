<script lang="ts">
    import { goto } from "$app/navigation";
</script>



<div id="terminal">
    <video autoplay loop>
        <source
            src="/videos/fallout-video-smaller.mp4"
            type="video/mp4"

        >
    </video>
    <p>Press any button to start</p>
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
        font-size: 1.25rem;
        right: 30%;
        bottom:10%;
    }
</style>



