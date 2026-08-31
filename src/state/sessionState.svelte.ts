export const sessionState = $state({
    username: "",
    dailyStreak: 0,
    bestRunScore: 0,
    bestRunLevel: 0,
    leaderboardScore: 0,
});

export function getDisplayableUsername(): string{
    let username = sessionState.username;
    if(username.length > 20){
        username = username.split("").toSpliced(20, username.length).join("") + "...";
    }
    return username;
}