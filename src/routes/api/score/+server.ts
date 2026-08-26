import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request, cookies, platform}) => {
    let userId = cookies.get("userId");

    if(!userId){
        userId = crypto.randomUUID();
        cookies.set("userId", userId, {
            path: "/",
            maxAge: 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        });
    }

    const body = await request.json();
    const {name, bestRun} = body;

    if(!name || typeof name !== "string"){
        return json({error: "Missing or invalid name"}, {status: 400});
    }

    if(typeof bestRun !== "number" || bestRun < 0){
        return json({error: "Missing or invalid best run score"}, {status: 400});
    }

    const db = platform?.env.users;

    await db?.prepare(`
        INSERT INTO users (id, name, best_run)
        VALUES (1?, ?2, ?3)
        ON CONFLICT(id) DO UPDATE SET
            name = ?2,
            best_run = ?3    
    `).bind(userId, name, bestRun).run();

    return json({success: true});
}