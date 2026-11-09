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
        <div className="controls">
            <button
                className="control-button hint-button"
                disabled={hintVisible || locked}
                onClick={onHint}
            >
                <span aria-hidden="true">💡</span>
                Hint
            </button>
            <button className="control-button" disabled={locked} onClick={onSkip}>
                <span aria-hidden="true">⏭</span>
                Skip
            </button>
            <button
                className="control-button quit-button"
                disabled={locked}
                onClick={onQuit}
            >
                <span aria-hidden="true">×</span>
                Quit
            </button>
        </div>
    )
}