export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomItem<T>(arr: T[]): T {
    return arr[randomInt(0, arr.length - 1)];
}

export function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

export function wait(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function isNextDay(earlier: Date | string, later: Date | string): boolean {
    const a = new Date(earlier);
    const b = new Date(later);

    const dayA = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
    const dayB = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());

    const oneDayMs = 24 * 60 * 60 * 1000;
    return dayB - dayA === oneDayMs;
}

export function isSameDay(a: Date | string, b: Date | string): boolean {
    const dateA = new Date(a);
    const dateB = new Date(b);

    return dateA.getUTCFullYear() === dateB.getUTCFullYear()
        && dateA.getUTCMonth() === dateB.getUTCMonth()
        && dateA.getUTCDate() === dateB.getUTCDate();
}