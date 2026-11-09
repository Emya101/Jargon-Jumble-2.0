
import { ROUNDS } from "../data/words";
import { scoreMessage } from "../utils/gameLogic";

type ScoreResultProps = {
    score: number;
    roundsCompleted: number;
    quitEarly: boolean;
    onRestart: () => void;
};

export function ScoreResult({
    score,
    roundsCompleted,
    quitEarly,
    onRestart,
}: ScoreResultProps) {
    return (
        <div className="results">
            <p className="eyebrow">{quitEarly ? "GAME ENDED" : "ALL 5 ROUNDS COMPLETE"}</p>
            <h2>{quitEarly ? "Thanks for playing!" : "Game Complete! 🎉"}</h2>
            <p className="performance">
                {quitEarly
                    ? "Goodbye for now. Your next word challenge is waiting whenever you are."
                    : scoreMessage(score)}
            </p>

            <div className="result-score">
                <span>{quitEarly ? "Score so far" : "Final score"}</span>
                <strong>
                    {score} <em>/ {ROUNDS}</em>
                </strong>
            </div>

            {quitEarly && (
                <p className="rounds-played">
                    {roundsCompleted} of {ROUNDS} rounds completed
                </p>
            )}

            <button className="submit-button play-again" onClick={onRestart}>
                {quitEarly ? "Start Again" : "Play Again"}
            </button>
        </div>
    )
};
