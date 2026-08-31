import { fail } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { getDB } from "../db";
import type { user } from "../../../types/game";
import { isNextDay, isSameDay } from "$lib/utils";

export async function postDailyStreakAction({cookies, platform} : RequestEvent){
    const userId = cookies.get("userId");
    if(!userId){
        return fail(401, {error: "Not logged in"});
    }

    const db = getDB(platform);
    const currentDate = new Date().toISOString();

    const user: user | null = await db
        .prepare("SELECT daily_streak, last_daily_date FROM users WHERE id = ?")
        .bind(userId)
        .first();

    if(!user){
        return fail(404, {error: "User not found"});
    }

    let newStreak: number;

    if(isNextDay(user.last_daily_date, currentDate)){
        newStreak = user.daily_streak++;
    } else if(isSameDay(user.last_daily_date, currentDate)){
        newStreak = user.daily_streak;
    } else {
        newStreak = 1;
    }

    try{
        const streakResult = await db
            .prepare("UPDATE users SET daily_streak = ?, last_daily_date = ? WHERE id = ?")
            .bind(newStreak, currentDate, userId)
            .run();

        if(streakResult.meta.changed_db) return {success: true, streak: newStreak}; 
        return {success: true};
    } catch(err){
        console.error("Failed to post bestDailyStreak:", err);
        return fail(500, {error: "Something went wrong"});        
    }
}