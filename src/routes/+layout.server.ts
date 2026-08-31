import { getDB } from './server/db.js';
import type { LayoutServerLoad } from './$types.js';
import { sessionState } from '../state/sessionState.svelte.js';
import type { user } from '../types/game.js';

export const load: LayoutServerLoad = async ({cookies, platform}) => {
    const userId = cookies.get("userId");
    if(!userId) return {user: null}
    
    const db = getDB(platform);
    const user: user | null = await db
        .prepare('SELECT * FROM users WHERE id = ?')
        .bind(userId)
        .first();

    if(user){
        sessionState.username = user.name;
        sessionState.bestRunScore = user.best_run_score;
        sessionState.bestRunLevel = user.best_run_level;
        sessionState.leaderboardScore = user.best_run_score  * user.daily_streak;
        sessionState.dailyStreak = user.daily_streak;
    }
}