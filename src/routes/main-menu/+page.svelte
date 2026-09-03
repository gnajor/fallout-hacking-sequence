<script lang="ts">
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import MenuLink from "../../components/MenuLink.svelte";
    import { getDisplayableUsername, sessionState } from "../../state/sessionState.svelte";

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
            link: "/leaderboard",
            text: "LEADERBOARD"
        }
    ]
</script>

<div id="screen">
    <Header text="Main Menu"/>
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
    <Footer/>
</div>

<style>
    #screen{
        padding: 2rem 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    main{
        display: flex;
        flex-direction: column;
        gap: calc(var(--text-md));
        font-size: 1.3rem;
    }
</style>
