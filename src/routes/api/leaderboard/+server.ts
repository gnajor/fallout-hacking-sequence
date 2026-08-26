import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({platform}) => {
    const db = platform!.env.users;

    const { results } = await db.prepare(`
        SELECT name, best_run, daily_streak
        FROM users
        ORDER BY best_run DESC, daily_streak DESC
        LIMIT 10
    `).all();

    return json(results);
}