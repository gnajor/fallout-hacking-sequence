export async function submitScore(name: string, bestRun: number): Promise<void>{
    await fetch("api/score", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, bestRun}),
        credentials: "same-origin"
    });
}

