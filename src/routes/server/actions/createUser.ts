import { fail } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { getDB } from "../db";
import { sessionState } from "../../../state/sessionState.svelte";


export async function createUserAction({request, cookies, platform}: RequestEvent){
    const form = await request.formData();
    const username = form.get("username") as string;
    const cleanUsername = username.trim();

    if(!cleanUsername || typeof cleanUsername !== "string" || cleanUsername.trim().length < 2){
        return fail(400, {error: "Username invalid"});
    }
    
    const db = getDB(platform);
    const userId = crypto.randomUUID();

    try{
        const result = await db
            .prepare("INSERT INTO users (id, name) VALUES (?, ?)")
            .bind(userId, cleanUsername)
            .run();

        cookies.set("userId", userId, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 60 * 60 * 24 * 365 * 5
        });

        return {success: true, username: cleanUsername};
    } catch(err){
        console.error("Failed to create user:", err);
        return fail(500, { error: "Something went wrong" });
    }
}
