export const gameConfig = {
    gridColsInter: 24,
    gridRows: 16,
    gridColsNonInter: 12,
} as const;

export const levels = [
    // Very Easy — 4-letter words, likeness up to 3-4
    { level: 1,  label: 'Very Easy', wordLength: 4, wordsAmount: 5,  distribution: [{ likeness: 0, count: 0 }, { likeness: 1, count: 1 }, { likeness: 2, count: 2 }, { likeness: 3, count: 1 }, { likeness: 4, count: 1 }] },
    { level: 2,  label: 'Very Easy', wordLength: 4, wordsAmount: 7,  distribution: [{ likeness: 0, count: 1 }, { likeness: 1, count: 2 }, { likeness: 2, count: 2 }, { likeness: 3, count: 1 }, { likeness: 4, count: 1 }] },
    { level: 3,  label: 'Very Easy', wordLength: 5, wordsAmount: 6,  distribution: [{ likeness: 0, count: 0 }, { likeness: 1, count: 1 }, { likeness: 2, count: 2 }, { likeness: 3, count: 2 }, { likeness: 4, count: 1 }] },
    { level: 4,  label: 'Very Easy', wordLength: 5, wordsAmount: 8,  distribution: [{ likeness: 0, count: 1 }, { likeness: 1, count: 2 }, { likeness: 2, count: 2 }, { likeness: 3, count: 2 }, { likeness: 4, count: 1 }] },

    // Easy — 5-6 letter words, likeness up to 5
    { level: 5,  label: 'Easy', wordLength: 5, wordsAmount: 9,  distribution: [{ likeness: 0, count: 2 }, { likeness: 1, count: 2 }, { likeness: 2, count: 2 }, { likeness: 3, count: 2 }, { likeness: 4, count: 1 }] },
    { level: 6,  label: 'Easy', wordLength: 6, wordsAmount: 8,  distribution: [{ likeness: 0, count: 1 }, { likeness: 1, count: 1 }, { likeness: 2, count: 2 }, { likeness: 3, count: 2 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }] },
    { level: 7,  label: 'Easy', wordLength: 6, wordsAmount: 10, distribution: [{ likeness: 0, count: 2 }, { likeness: 1, count: 2 }, { likeness: 2, count: 2 }, { likeness: 3, count: 2 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }] },
    { level: 8,  label: 'Easy', wordLength: 6, wordsAmount: 12, distribution: [{ likeness: 0, count: 3 }, { likeness: 1, count: 3 }, { likeness: 2, count: 2 }, { likeness: 3, count: 2 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }] },

    // Average — 7-letter words, likeness up to 6
    { level: 9,  label: 'Average', wordLength: 7, wordsAmount: 9,  distribution: [{ likeness: 0, count: 2 }, { likeness: 1, count: 2 }, { likeness: 2, count: 2 }, { likeness: 3, count: 1 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }] },
    { level: 10, label: 'Average', wordLength: 7, wordsAmount: 11, distribution: [{ likeness: 0, count: 3 }, { likeness: 1, count: 3 }, { likeness: 2, count: 2 }, { likeness: 3, count: 1 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }] },
    { level: 11, label: 'Average', wordLength: 7, wordsAmount: 13, distribution: [{ likeness: 0, count: 4 }, { likeness: 1, count: 3 }, { likeness: 2, count: 2 }, { likeness: 3, count: 2 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }] },
    { level: 12, label: 'Average', wordLength: 8, wordsAmount: 10, distribution: [{ likeness: 0, count: 2 }, { likeness: 1, count: 2 }, { likeness: 2, count: 2 }, { likeness: 3, count: 2 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }] },

    // Hard — 8-letter words, likeness up to 7
    { level: 13, label: 'Hard', wordLength: 8, wordsAmount: 11, distribution: [{ likeness: 0, count: 3 }, { likeness: 1, count: 3 }, { likeness: 2, count: 2 }, { likeness: 3, count: 1 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }, { likeness: 6, count: 0 }] },
    { level: 14, label: 'Hard', wordLength: 8, wordsAmount: 12, distribution: [{ likeness: 0, count: 4 }, { likeness: 1, count: 3 }, { likeness: 2, count: 2 }, { likeness: 3, count: 1 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }, { likeness: 6, count: 0 }] },
    { level: 15, label: 'Hard', wordLength: 8, wordsAmount: 13, distribution: [{ likeness: 0, count: 4 }, { likeness: 1, count: 3 }, { likeness: 2, count: 2 }, { likeness: 3, count: 2 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }, { likeness: 6, count: 0 }] },
    { level: 16, label: 'Hard', wordLength: 9, wordsAmount: 11, distribution: [{ likeness: 0, count: 3 }, { likeness: 1, count: 2 }, { likeness: 2, count: 2 }, { likeness: 3, count: 1 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }, { likeness: 6, count: 1 }] },

    // Very Hard — 9-letter words, likeness up to 8
    { level: 17, label: 'Very Hard', wordLength: 9, wordsAmount: 12, distribution: [{ likeness: 0, count: 4 }, { likeness: 1, count: 3 }, { likeness: 2, count: 2 }, { likeness: 3, count: 1 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }, { likeness: 6, count: 0 }, { likeness: 7, count: 0 }] },
    { level: 18, label: 'Very Hard', wordLength: 9, wordsAmount: 13, distribution: [{ likeness: 0, count: 5 }, { likeness: 1, count: 3 }, { likeness: 2, count: 2 }, { likeness: 3, count: 1 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }, { likeness: 6, count: 0 }, { likeness: 7, count: 0 }] },
    { level: 19, label: 'Very Hard', wordLength: 9, wordsAmount: 14, distribution: [{ likeness: 0, count: 5 }, { likeness: 1, count: 3 }, { likeness: 2, count: 2 }, { likeness: 3, count: 2 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }, { likeness: 6, count: 0 }, { likeness: 7, count: 0 }] },
    { level: 20, label: 'Very Hard', wordLength: 9, wordsAmount: 16, distribution: [{ likeness: 0, count: 6 }, { likeness: 1, count: 4 }, { likeness: 2, count: 2 }, { likeness: 3, count: 1 }, { likeness: 4, count: 1 }, { likeness: 5, count: 1 }, { likeness: 6, count: 1 }, { likeness: 7, count: 0 }] },
] as const;