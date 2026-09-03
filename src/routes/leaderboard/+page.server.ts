import type { PageServerLoad } from "./$types";
import { getDB } from "../server/db";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({cookies, platform}) => {
    const userId = cookies.get("userId");
    const db = getDB(platform);

    const data = async () => {
        try{
            const topUsers = await db.prepare(`
                SELECT 
                    id,
                    name, 
                    best_run_score,
                    daily_streak, 
                    (best_run_score * MAX(daily_streak, 1)) AS score,
                    ROW_NUMBER() OVER (ORDER BY (best_run_score * MAX(daily_streak, 1)) DESC) AS rank
                FROM users
                LIMIT 100
            `).all();

            let currentUser: any = null;

            if(userId){
                currentUser = await db.prepare(`
                    SELECT name, best_run_score, daily_streak, score, rank
                    FROM (
                        SELECT 
                            id,
                            name, 
                            best_run_score, 
                            daily_streak,
                            (best_run_score * MAX(daily_streak, 1)) AS score,
                            RANK() OVER (ORDER BY (best_run_score * MAX(daily_streak, 1)) DESC) AS rank
                        FROM users
                    )
                    WHERE id = ?1
                `).bind(userId).first();

                if(currentUser && topUsers.results && Array.isArray(topUsers.results)){
                    const index = topUsers.results.findIndex(user => user.id === userId);
                    if(index !== -1){
                        topUsers.results[index].currentUser = true;
                    } else {
                        currentUser.currentUser = true;
                    }
                }
            }

            const users = (topUsers.results as any[]).map(({ id, ...rest }) => rest);

            return {
                success: true, 
                users: users, 
                currentUser: currentUser ?? null
            };
        } catch(err){
            console.error("Failed to get the top 100 users:", err);
            throw error(500, "Something went wrong");
        }
    }

    return { data: data() };
}