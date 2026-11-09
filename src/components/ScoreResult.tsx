
import { ROUNDS } from "../data/words";
import { scoreMessage } from "../utils/gameLogic";
import "./ScoreResult.css";

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
        <div className="score-result">
            <p className="score-result-eyebrow">
                {quitEarly ? "GAME ENDED" : "ALL ROUNDS COMPLETE"}
            </p>

            <h2 className="score-result-heading">
                {quitEarly ? "Thanks for playing!" : "Game Complete! 🎉"}
            </h2>

            <p className="score-result-message">
                {quitEarly
                    ? "Goodbye for now. Your next word challenge is waiting whenever you are."
                    : scoreMessage(score)}
            </p>

            <div className="score-result-card">
                <span className="score-result-label">
                    {quitEarly ? "Score so far" : "Final score"}
                </span>

                <strong className="score-result-value">
                    {score}
                    <em className="score-result-total">
                        / {ROUNDS}
                    </em>
                </strong>
            </div>

            {quitEarly && (
                <p className="score-result-rounds">
                    {roundsCompleted} of {ROUNDS} rounds completed
                </p>
            )}

            <button
                type="button"
                className="score-result-restart"
                onClick={onRestart}
            >
                {quitEarly ? "Start Again" : "Play Again"}
            </button>
        </div>
    );
}
