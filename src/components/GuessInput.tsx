import type { Ref } from "react";
import type { FormEventHandler } from "react";

type GuessInputProps = {
    guess: string;
    locked: boolean;
    incorrect: boolean;
    shakeKey: number;
    inputRef: Ref<HTMLInputElement>;
    onGuessChange: (value: string) => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
}

export function GuessInput({
    guess,
    locked,
    incorrect,
    shakeKey,
    inputRef,
    onGuessChange,
    onSubmit,
}: GuessInputProps) {
    return (
        <form className="guess-form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="guess">
                Your guess
            </label>
            <div
                className={`input-wrap ${incorrect ? "shake" : ""}`}
                key={shakeKey}
            >
                <input
                    autoComplete="off"
                    disabled={locked}
                    id="guess"
                    onChange={(event) => onGuessChange(event.target.value)}
                    placeholder="What's your guess?"
                    ref={inputRef}
                    spellCheck={false}
                    type="text"
                    value={guess}
                />
                {guess && !locked && (
                    <button
                        aria-label="Clear guess"
                        className="clear-button"
                        onClick={() => onGuessChange("")}
                        type="button"
                    >
                        ×
                    </button>
                )}
            </div>
            <button
                className="submit-button"
                disabled={!guess.trim() || locked}
                type="submit"
            >
                Submit Guess
            </button>
        </form>
    );
}