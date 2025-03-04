export function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}