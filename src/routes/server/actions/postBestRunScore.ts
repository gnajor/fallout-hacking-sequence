import { fail } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { getDB } from "../db";

export async function postBestRunScoreAction({request, cookies, platform} : RequestEvent){
    const userId = cookies.get("userId");
    if(!userId){
        return fail(401, {error: "Not logged in"});
    }

    const form = await request.formData();
    const scoreRaw = form.get("score");
    const levelRaw = form.get("level");
    const score = Number(scoreRaw);
    const level = Number(levelRaw);

    if(!scoreRaw || isNaN(score) || !levelRaw || isNaN(level)){
        return fail(400, {error: "Invalid score or level"});
    }

    const db = getDB(platform);
    const result: any = {};
    try{
        const updatedScore = await db   
            .prepare("UPDATE users SET best_run_score = ? WHERE id = ? AND best_run_score < ?")
            .bind(score, userId, score)
            .run();

        const updatedLevel = await db   
            .prepare("UPDATE users SET best_run_level = ? WHERE id = ? AND best_run_level < ?")
            .bind(level, userId, level)
            .run();

        if(updatedScore.meta.changed_db) result.score = score;
        if(updatedLevel.meta.changed_db) result.level = level;
        result.success = true;

        return result;
    } catch(err){
        console.error("Failed to post bestRunScore:", err);
        return fail(500, {error: "Something went wrong"});        
    }
}