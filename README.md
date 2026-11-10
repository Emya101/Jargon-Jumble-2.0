# Jargon Jumble 2.0

**Ten rounds. One guess per word. How many can you solve?**

Jargon Jumble 2.0 is a lightweight, browser-based word scramble game built with **React, TypeScript, and Vite**. Players unscramble randomly selected words, request hints when they need a nudge, and earn points for correct answers.

This project reimagines an earlier **Python command-line game** as a responsive, single-page web application. The gameplay stays intentionally simple: no accounts, no timer, no backend—just a quick word challenge.

## Features

- **10-round games:** Each session selects 10 words from the word bank without repeats.
- **Shuffled word tiles:** Letters appear scrambled at the start of each round.
- **One submitted guess per round:** A correct guess earns **1 point**; an incorrect guess reveals the answer before advancing.
- **Free hints:** Reveal a clue without losing points or using up your guess.
- **Skip a word:** Reveal the answer and advance with no points for that round.
- **Quit confirmation:** Choose whether to end early or keep playing.
- **Results screen:** Review your score out of 10 and get a performance message.
- **Play again:** Start a fresh game with another randomized selection.
- **Responsive design:** Navy-themed interface with subtle transitions and feedback animations.

Guesses are **case-insensitive**, and leading/trailing spaces are ignored.

## How to Play

1. Look at the scrambled letters shown on the game board.
2. Type the word you think they form and select **Submit Guess** (or press **Enter**).
3. If you're stuck, select **Hint** to reveal a clue, or **Skip** to move on.
4. Complete all 10 rounds to see your final score—or choose **Quit** to end early.
5. Select **Play Again** to start over.

**Scoring:** Correct answer = **1 point**. Incorrect or skipped answer = **0 points**. Hints have no penalty. The maximum score is **10/10**.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| **React** | Component-based interface and state management |
| **TypeScript** | Typed game data, component props, and gameplay logic |
| **Vite** | Local development server and production build |
| **CSS** | Responsive layout, styling, and lightweight animations |
| **GitHub Actions** | Automated production builds and deployment |
| **GitHub Pages** | Static website hosting |

The game runs entirely in the browser and does **not** require a backend, database, or API key.

## Getting Started

**Prerequisites:** A recent Node.js LTS release and npm.

```bash
# Clone the repository
git clone https://github.com/Emya101/Jargon-Jumble-Game.git
cd Jargon-Jumble-Game

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open the local address printed by Vite (typically `http://localhost:5173/`).

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── GameBoard.tsx       # Round progress, scrambled letters, hints, feedback
│   ├── GameControls.tsx    # Hint, Skip, and Quit controls
│   ├── GuessInput.tsx      # Guess textbox and submission form
│   ├── QuitDialog.tsx      # Confirmation before ending a game
│   ├── ScoreResult.tsx     # Final score and restart interface
│   └── *.css               # Component-specific styling
├── data/
│   └── words.ts            # Word/hint pool and round count
├── types/
│   └── game.ts             # Shared TypeScript types
├── utils/
│   └── gameLogic.ts        # Word shuffling, game creation, answer checks, score messages
├── App.tsx                 # Game state, actions, and screen transitions
├── App.css                 # Global app layout and shared styling
└── main.tsx                # React entry point

public/
└── favicon.svg             # Custom J favicon

.github/workflows/
└── deploy.yml              # GitHub Pages deployment workflow
```

## How It Works

The **game logic** lives in `src/utils/gameLogic.ts`, and the word/hint pairs live in `src/data/words.ts`. At the beginning of a game, 10 unique words are selected and scrambled. The word bank must contain at least 10 entries for games without repeated words.

`App.tsx` manages the current round, score, guess, hint visibility, feedback, and game completion. It passes those values and event handlers into smaller UI components through React props. After a submitted answer or skip, the game briefly shows feedback before moving to the next round.

This separation keeps the rules independent from the interface and makes the game easier to extend.

## Deployment

The application is configured for **GitHub Pages** using a GitHub Actions workflow in `.github/workflows/deploy.yml`.

On a push to `main`, the workflow installs dependencies, builds the Vite application, uploads the generated `dist/` directory, and deploys it to GitHub Pages. In the repository's **Settings → Pages**, set the publishing source to **GitHub Actions**.

For this repository, `vite.config.ts` should use the appropriate project base path:

```ts
base: "/Jargon-Jumble-Game/",
```

**Live demo:** Add the published GitHub Pages URL here after deployment succeeds.

## Project Background

Jargon Jumble began as a Python terminal-based word scramble game. Version 2.0 brings the one-guess-per-round gameplay into the browser with 10 rounds, while exploring React component composition, TypeScript types, client-side state, responsive CSS, and automated static deployment.
