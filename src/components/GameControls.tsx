import "./GameControls.css";

type GameControlsProps = {
  hintVisible: boolean;
  locked: boolean;
  onHint: () => void;
  onSkip: () => void;
  onQuit: () => void;
};

export function GameControls({
  hintVisible,
  locked,
  onHint,
  onSkip,
  onQuit,
}: GameControlsProps) {
  return (
    <div className="controls" role="group" aria-label="Game actions">
      <button
        type="button"
        className="control-button hint-button"
        disabled={hintVisible || locked}
        onClick={onHint}
      >
        <span className="control-icon" aria-hidden="true">💡</span>
        <span className="control-label">Hint</span>
      </button>

      <button
        type="button"
        className="control-button skip-button"
        disabled={locked}
        onClick={onSkip}
      >
        <span className="control-icon" aria-hidden="true">⏭</span>
        <span className="control-label">Skip</span>
      </button>

      <button
        type="button"
        className="control-button quit-button"
        disabled={locked}
        onClick={onQuit}
      >
        <span className="control-icon" aria-hidden="true">×</span>
        <span className="control-label">Quit</span>
      </button>
    </div>
  );
}
