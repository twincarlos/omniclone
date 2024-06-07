import "../style.css";

export function ManualModal({ setOpenModal }) {
    return (
        <div className="manual-modal modal">
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal-title">
                        <p>Add Player Manually</p>
                    </div>
                    <div className="exit-modal">
                        <button onClick={() => setOpenModal(false)}><i className="fa-regular fa-circle-xmark" /></button>
                    </div>
                </div>
                <div className="manual-modal-inputs">
                    <input type="number" placeholder="Rating"/>
                    <input type="text" placeholder="Name (optional)" />
                    <button onClick={() => setOpenModal(false)}><i className="fa-solid fa-plus" /> Add player</button>
                </div>
            </div>
        </div>
    );
};