<script lang="ts">
    import { goto } from "$app/navigation";
    import { levels } from "$lib/gameConfig";
    import MenuLink from "../../components/MenuLink.svelte";
    import { gameStateData } from "../../state/gameState.svelte";
</script>

<div id="screen">
    <header>
        <h1>ROBCO Industries (TM) Termlink</h1>
        <h2>Select Difficulty Level</h2>
    </header>
    <main>
        <div id="levels-container">
            {#each levels as level}
                <a 
                    href="/practice-mode"
                    class="level"
                    onclick={() => {gameStateData.currentLevel = level.level}}
                >{level.level < 10 ? "0" + level.level : level.level}</a>
            {/each}
        </div>
        <MenuLink
            onClick={() => {}}
            link="/main-menu"
            text={"[Back]"}
            linkStyle={"bottom-left-block"}
        />
    </main>
</div>

<style> 
    #screen{
        padding: 2rem 2.5rem;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #levels-container{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap:1.25vw;
    }

    main{
        display: flex;
        flex-direction: column;
        gap:5rem;
    }

    header{
        display: flex;
        flex-direction: column;
        gap:0.4rem;
    }

    header h1{
        font-size: var(--text-md);
    }

    header h2{
        color: var(--main-darker-color);
        font-size: var(--text-sm);
    }

    a.level{
        display: flex;
        justify-content: center;
        align-items: center;
        padding:0.8vw 0.5vw;
        border:1px solid var(--main-color);
        font-size: var(--text-md);
    }

    a:hover{
        background-color: var(--main-color);
        color: black;
    }
</style>