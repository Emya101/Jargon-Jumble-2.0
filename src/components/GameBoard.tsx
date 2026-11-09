import type { FormEventHandler, Ref } from "react";
import type { Gameword, Feedback } from "../types/game";

import { ROUNDS } from "../data/words";
import { GuessInput } from "./GuessInput";
import { GameControls } from "./GameControls";
import "./GameBoard.css";

type GameBoardProps = {
  word: Gameword;
  round: number;
  score: number;
  guess: string;
  hintVisible: boolean;
  feedback: Feedback;
  shakeKey: number;
  inputRef: Ref<HTMLInputElement>;

  onGuessChange: (value: string) => void;
  onSubmitGuess: FormEventHandler<HTMLFormElement>;
  onHint: () => void;
  onSkip: () => void;
  onQuit: () => void;
};

export function GameBoard({
  word,
  round,
  score,
  guess,
  hintVisible,
  feedback,
  shakeKey,
  inputRef,
  onGuessChange,
  onSubmitGuess,
  onHint,
  onSkip,
  onQuit,
}: GameBoardProps) {
  const progress = (round / ROUNDS) * 100;
  const roundLocked = feedback !== null;

  return (
    <section className="game-board" aria-label="Current word puzzle">
      <div className="progress-block">
        <div className="progress-labels">
          <span className="round-label">
            Round {round + 1} <em>of {ROUNDS}</em>
          </span>
          <span className="score-pill">
            Score: {score} / {ROUNDS}
          </span>
        </div>
        <div
          aria-label={`${Math.round(progress)} percent complete`}
          aria-valuemax={ROUNDS}
          aria-valuemin={0}
          aria-valuenow={round}
          className="progress-track"
          role="progressbar"
        >
          <span className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="puzzle" key={round}>
        <p className="eyebrow">UNSCRAMBLE THE WORD</p>
        <div
          className={`letter-row ${word.jumble.length > 8 ? "compact" : ""}`}
          aria-label={`Jumbled letters: ${word.jumble.split("").join(" ")}`}
        >
          {word.jumble.split("").map((letter, index) => (
            <span
              className="letter-tile"
              key={`${letter}-${index}`}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="hint-space">
          {hintVisible && (
            <p className="hint-message">
              <span className="hint-icon" aria-hidden="true">💡</span>
              {word.hint}
            </p>
          )}
        </div>
      </div>

      <GuessInput
        guess={guess}
        locked={roundLocked}
        incorrect={feedback?.kind === "incorrect"}
        shakeKey={shakeKey}
        inputRef={inputRef}
        onGuessChange={onGuessChange}
        onSubmit={onSubmitGuess}
      />

      <div aria-live="polite" className="feedback-space">
        {feedback && (
          <p className={`feedback ${feedback.kind}-feedback`}>
            {feedback.message}
          </p>
        )}
      </div>

      <GameControls
        hintVisible={hintVisible}
        locked={roundLocked}
        onHint={onHint}
        onSkip={onSkip}
        onQuit={onQuit}
      />
    </section>
  );
}