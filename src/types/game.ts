export type TokenType = "word" | "bracket" | "junk" | "non_inter";


export interface Token {
    type: TokenType,
    value: string,
    groupId?: string,
    used?: boolean,
}

export interface user{
    name: string,
    best_run_score: number,
    best_run_level: number,
    daily_streak: number,
    created_at: string,
    last_daily_date: string,
}

export interface leaderboardUser{
    name: string,
    daily_streak: number,
    rank: number,
    score: number,
    best_run_score: number,
    currentUser?: boolean
}