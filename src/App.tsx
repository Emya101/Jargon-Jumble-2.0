import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";

import { GameBoard } from "./components/GameBoard";
import { ScoreResult } from "./components/ScoreResult";
import { QuitDialog } from "./components/QuitDialog";
import { createGame, isCorrectGuess } from "./utils/gameLogic";
import { ROUNDS } from "./data/words";
import type { Gameword, Feedback } from "./types/game";

import "./App.css";

function App() {
  const [gameWords, setGameWords] = useState<Gameword[]>(createGame);
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const [quitConfirmation, setQuitConfirmation] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [finished, setFinished] = useState(false);
  const [quitEarly, setQuitEarly] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const word = gameWords[round];
  const roundLocked = feedback !== null;

  const advanceRound = () => {
    if (round + 1 === ROUNDS) {
      setFinished(true);
      return;
    }

    setRound((current) => current + 1);
    setGuess("");
    setHintVisible(false);
    setFeedback(null);
  };

  const skipRound = () => {
    if (roundLocked) return;

    setFeedback({
      kind: "skipped",
      message: `No problem! Your word was ${word.answer.toUpperCase()}.`
    });

    queueNextRound();
  };

  const confirmQuit = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }

    setQuitConfirmation(false);
    setQuitEarly(true);
    setFinished(true);
  };

  const restart = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }

    setGameWords(createGame());
    setRound(0);
    setGuess("");
    setScore(0);
    setHintVisible(false);
    setQuitConfirmation(false);
    setFeedback(null);
    setShakeKey(0);
    setFinished(false);
    setQuitEarly(false);
  };

  const queueNextRound = () => {
    advanceTimer.current = setTimeout(advanceRound, 1250);
  };

  const submitGuess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!guess.trim() || roundLocked) return;

    if (isCorrectGuess(guess, word.answer)) {
      setScore((current) => current + 1);
      setFeedback({
        kind: "correct",
        message: "Correct! ✅ Keep Going"
      });
    } else {
      setFeedback({
        kind: "incorrect",
        message: `Sorry! The correct word was ${word.answer.toUpperCase()}.`
      });

      setShakeKey((current) => current + 1);
    }

    queueNextRound();
  };

  useEffect(() => {
    if (!finished) {
      inputRef.current?.focus();
    }
  }, [round, finished]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) {
        clearTimeout(advanceTimer.current);
      }
    };
  }, []);

return (
    <main className="app-shell">
        <section
            className="game-wrap"
            aria-label="Jargon Jumble word game"
        >

            {/* Game header */}

            <header className="page-header">
                <div className="brand">
                    <div className="brand-mark">
                        <span>J</span>
                    </div>

                    <h1>JARGON JUMBLE</h1>

                    <span className="version">
                        2.0
                    </span>
                </div>

                <p className="subtitle">
                    Unscramble the word. Test your knowledge.
                </p>
            </header>

            {/* Main game container */}

            <div className="game-card">
                {finished ? (
                    <ScoreResult
                        score={score}
                        roundsCompleted={round}
                        quitEarly={quitEarly}
                        onRestart={restart}
                    />
                ) : (
                    <GameBoard
                        word={word}
                        round={round}
                        score={score}
                        guess={guess}
                        hintVisible={hintVisible}
                        feedback={feedback}
                        shakeKey={shakeKey}
                        inputRef={inputRef}
                        onGuessChange={setGuess}
                        onSubmitGuess={submitGuess}
                        onHint={() => setHintVisible(true)}
                        onSkip={skipRound}
                        onQuit={() => setQuitConfirmation(true)}
                    />
                )}
            </div>

            {/* Quit confirmation */}

            {quitConfirmation && !finished && (
                <QuitDialog
                    onConfirm={confirmQuit}
                    onCancel={() => setQuitConfirmation(false)}
                />
            )}

            {/* Footer */}

            <p className="footer-note">
                Five words. One guess each. How many can you solve?
            </p>

        </section>
    </main>
);
}

export default App
