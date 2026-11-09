export type Word = {
    answer: string;
    hint: string;
}

export type Gameword = Word & {
    jumble: string
}

export type Feedback = {
    kind: "correct" | "incorrect" | "skipped";
    message: string;
} | null;