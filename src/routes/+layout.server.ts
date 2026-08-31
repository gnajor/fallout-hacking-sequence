import { getDB } from './server/db.js';
import type { LayoutServerLoad } from './$types.js';
import type { user } from '../types/game.js';

export const load: LayoutServerLoad = async ({cookies, platform}) => {
    const userId = cookies.get("userId");
    if(!userId) return {user: null}
    
    const db = getDB(platform);
    const user: user | null = await db
        .prepare('SELECT * FROM users WHERE id = ?')
        .bind(userId)
        .first();

    
    return {user: user ?? null}
}