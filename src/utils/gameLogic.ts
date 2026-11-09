import { ROUNDS, WORDS } from "../data/words";
import type { Gameword } from "../types/game";

export function shuffle<T>(items: T[]) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex: number = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
}

export function scramble(answer: string) {
    const letters = answer.toUpperCase().split("");
    let jumbled = shuffle(letters).join("");

    while (jumbled === letters.join("")) {
        jumbled = shuffle(letters).join("");
    }

    return jumbled;
}

export function createGame(): Gameword[] {
    return shuffle(WORDS)
        .slice(0, ROUNDS)
        .map((word) => ({ ...word, jumble: scramble(word.answer) }));
}

export function scoreMessage(score: number) {
    if (score === 5) return "Flawless! All tests passed. You're a natural!";
    if (score === 4) return "Near perfect! You only missed one. Great effort!";
    if (score === 3) return "Good effort! More than halfway there!";
    return "Dust yourself off and go again. There is always a way!";
}

export function isCorrectGuess(
    guess: string,
    answer: string
): boolean{
    return guess.trim().toLowerCase() === answer.toLowerCase()
}