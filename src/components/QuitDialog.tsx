
import "./QuitDialog.css";

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
            aria-describedby="quit-description"
            aria-modal="true"
            className="quit-dialog-backdrop"
            onClick={onCancel}
            role="dialog"
        >
            <div
                className="quit-dialog-card"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="quit-dialog-icon">
                    ?
                </div>

                <h2
                    id="quit-title"
                    className="quit-dialog-title"
                >
                    Leaving so soon?
                </h2>

                <p
                    id="quit-description"
                    className="quit-dialog-description"
                >
                    Are you sure you want to quit? We'll miss you!
                </p>

                <div className="quit-dialog-actions">
                    <button
                        type="button"
                        className="quit-dialog-confirm"
                        onClick={onConfirm}
                    >
                        Yes, Quit
                    </button>

                    <button
                        type="button"
                        autoFocus
                        className="quit-dialog-cancel"
                        onClick={onCancel}
                    >
                        Keep Playing
                    </button>
                </div>
            </div>
        </div>
    );
}
