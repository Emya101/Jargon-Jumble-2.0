type QuitDialogProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

export function QuitDialog({
    onConfirm,
    onCancel
}: QuitDialogProps) {
    return (
        <div
            aria-labelledby="quit-title"
            aria-modal="true"
            className="dialog-backdrop"
            onClick={onCancel}
            role="dialog"
        >
            <div
                className="quit-dialog"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="dialog-icon">?</div>

                <h2 id="quit-title">Leaving so soon?</h2>

                <p>
                    Are you sure you want to quit? We'll miss you!
                </p>

                <div className="dialog-actions">
                    <button
                        className="dialog-secondary"
                        onClick={onConfirm}
                    >
                        Yes, Quit
                    </button>

                    <button
                        autoFocus
                        className="submit-button"
                        onClick={onCancel}
                    >
                        Keep Playing
                    </button>
                </div>
            </div>
        </div>
    );
}
