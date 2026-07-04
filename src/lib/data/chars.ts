export const chars = {
    junk: "()/^<>$*=?`!:,.+;-`|{}[]@#%'_\"".split(""),
    lettersNums: "ABCDEF0123456789".split(""),
    fixedChars: "0x",
    brackets: {
        open: "({[<".split(""),
        close: ")}]>".split("")
    }
} as const; 
