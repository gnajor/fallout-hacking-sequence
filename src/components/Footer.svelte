<script lang="ts">
    import { sessionState } from "../state/sessionState.svelte";

</script>

<footer>
    <p>Daily Streak:{sessionState.dailyStreak ?? 0}</p>
    <p>Best Run:{sessionState.bestRunScore ?? 0}</p>
</footer>

<style>
    footer{
        border-top: 1px solid var(--main-color);
        display: flex;
        justify-content: space-between;
    }

    footer p{
        padding: 0.75rem 0;
        font-size: var(--text-sm);
    }
</style>