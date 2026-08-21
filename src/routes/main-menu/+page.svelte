<script lang="ts">
    import MenuLink from "../../components/MenuLink.svelte";

    const menuLinks = [
        {
            link: "/daily-mode",
            text: "DAILY CHALLANGE"
        },
        {
            link: "/run-mode",
            text: "RUN MODE"
        },
        {
            link: "/levels",
            text: "PRACTICE MODE"
        },
        {
            link: "",
            text: "LEADERBOARD"
        }
    ]

</script>

<div id="screen">
    <header>
        <h1>ROBCO Industries (TM) Termlink</h1>
        <h2>Main Menu</h2>
    </header>
    <main>
        {#each menuLinks as item}   
            <MenuLink 
                onClick={() => {}}
                link={item.link}
                text={item.text}
                linkStyle={"menu-link"}
            />
        {/each}
    </main>
    <footer>
        <p>Daily Streak:</p>
        <p>Best Run:</p>
    </footer>
</div>

<style>
    #screen{
        padding: 2rem 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    footer{
        border-top: 1px solid var(--main-color);
        display: flex;
        justify-content: space-between;
    }

    footer p{
        padding: 0.75rem 0;
        font-size: var(--text-sm);
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

    main{
        display: flex;
        flex-direction: column;
        gap: calc(var(--text-md));
        font-size: 1.3rem;
    }

    a{
        padding: 0.25rem 3rem;
        display: block;
        cursor: var(--main-cursor);
        font-size:var(--text-md);
    }
</style>
