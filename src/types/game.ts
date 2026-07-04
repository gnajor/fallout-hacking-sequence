export type TokenType = "word" | "bracket" | "junk" | "non_inter";


export interface Token {
    type: TokenType,
    value: string,
    groupId?: string,
    used?: boolean,
}