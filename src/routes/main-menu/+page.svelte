<script lang="ts">

</script>

<div id="screen">
    <header>
        <p>ROBCO Industries (TM) Termlink</p>
        <p>Main Menu</p>
    </header>
    <main>
        <a href="/hacking">DAILY CHALLANGE</a>
        <a href="run-mode">RUN MODE</a>
        <a href="/practice-mode">PRACTICE MODE</a>
        <a href="">LEADERBOARD</a>
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

    p{
        color: var(--main-color);
    }

    footer{
        border-top: 1px solid var(--main-color);
        display: flex;
        justify-content: space-between;
    }

    footer p{
        padding: 0.75rem 0;
    }

    header{
        display: flex;
        flex-direction: column;
        gap:0.4rem;
    }

    header p:nth-child(2){
        color: var(--main-darker-color);
    }

    main{
        display: flex;
        flex-direction: column;
        gap: 1.5vw;
        font-size: 1.3rem;
    }

    a{
        padding: 0.25rem 3rem;
        display: block;
        cursor: var(--main-cursor);
    }

    a:hover{
        background-color: var(--main-color);
        color: black;
    }





</style>
