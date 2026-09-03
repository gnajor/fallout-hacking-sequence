<script lang="ts">
    import Footer from "../../components/Footer.svelte";
    import Header from "../../components/Header.svelte";
    import Leaderboard from "../../components/Leaderboard.svelte";
    import StatusScreen from "../../components/StatusScreen.svelte";

    let {data} = $props();

</script>

{#await data.data}
    <StatusScreen loadingType="initiating"/>
{:then {users, currentUser}}
    <div id="screen">
        <div id="leaderboard-and-header">
            <Header text="Leaderboard"/>
            <main>
                <div id="leaderboard-header" class="outer-container">
                    <div class="container">
                        <h2>RANK</h2>
                        <h2>USER</h2>
                    </div>
                    <h2>SCORE</h2>
                </div>
                <div id="line"></div>
                <Leaderboard rows={10} users={users} currentUser={currentUser}/>
            </main>
        </div>
        <Footer/>
    </div>
{/await}


<style>
    #screen{
        padding: 2rem 2.5rem;
        padding-bottom: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    #leaderboard-header{
        display: flex;
    }

    #leaderboard-header .container{
        gap: 1.5rem;
    }

    .outer-container{
        display: flex;
        justify-content: space-between;
    }

    .container{
        display: flex;
        gap:1rem;
    }

    #leaderboard-and-header{
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        height: 100%;
    }

    h2{
        font-size: var(--text-ms);
        color: var(--main-darker-color);
    }


    #line{
        width: 100%;
        height: 1px;
        background-color: var(--main-darker-color);
        margin:0.75rem 0;
    }

    main{
        height: 100%;
        display: flex;
        flex-direction: column;
    }

</style>

