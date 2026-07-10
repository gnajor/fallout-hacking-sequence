<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="wrapper">
    <div id="chassi">
		{@render children()}
	</div>
</div>

<style>
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
</style>
