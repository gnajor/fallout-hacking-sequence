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