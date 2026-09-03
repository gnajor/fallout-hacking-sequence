<script lang="ts">
    import type { leaderboardUser } from "../types/game";

    let {rows, users, currentUser}: {rows: number, users: leaderboardUser[], currentUser: leaderboardUser} = $props();
    let pageIndex: number = $state(0);
    let currentRankMin: number = $derived(rows * pageIndex);
    let currentRankMax: number = $derived(rows * (pageIndex + 1));
    let amountPages = $state(Math.ceil(users.length / rows));
    let currentUsers = $derived(users.slice(currentRankMin, currentRankMax));
    let userIsInCurrentUsers = $derived(currentUsers.some(user => user.currentUser));

</script>

<div id="leaderboard">
    <ul>
        {#each currentUsers as user}
            <li 
                class="outer-container"
                class:current-user={user.currentUser}
            >
                <div id="rank-user" class="container">
                    <p>{user.rank < 10 ? "0" + user.rank : user.rank}</p>
                    <p>{user.name}</p>
                </div>
                <p>{user.score}</p>
            </li>
        {/each}
        {#if !userIsInCurrentUsers}
            <li 
                class="outer-container current-user"
                id="user-not-top"
            >
                <div id="rank-user" class="container">
                    <p>{currentUser.rank < 10 ? "0" + currentUser.rank : currentUser.rank}</p>
                    <p>{currentUser.name}</p>
                </div>
                <p>{currentUser.score}</p>
            </li>
        {/if}
    </ul>
    <div id="leaderboard-controls">
        <button onclick={() => {if((pageIndex + 1) > 1) --pageIndex}}> &lt; PREV </button>
        <p>PAGE {(pageIndex+1)}/{amountPages}</p>
        <button onclick={() => {if((pageIndex + 1) < amountPages) ++pageIndex}}> NEXT &gt;</button>
    </div>
</div>


<style>
    #leaderboard{
        height: inherit;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #user-not-top{
        margin-top: 0.25rem;
    }

    .current-user{
        background-color: var(--main-darkest-color);
    }

    .outer-container{
        display: flex;
        justify-content: space-between;
    }

    .container{
        display: flex;
        gap:1rem;
    }

    ul{
        list-style-type: none;
        padding: 0;
        margin: 0;

        display: flex;
        flex-direction: column;
        gap:0.4rem;
    }

    li{
        padding: 0.1rem 0.3rem;
    }

    p{
        font-size: var(--text-sm);
    }

    #leaderboard-controls{
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding-bottom: 1rem;
    }

    button{
        font-size: var(--text-sm);
        padding-bottom: 0;
        padding-top: 0;
    }

    button:hover{
        color:#000;
        background-color: var(--main-color);
    }

    #rank-user{
        display: flex;
        gap:2rem;
    }


</style>