"use client";
import "../style.css";
import { useState } from "react";

export function ManualModal({ setOpenModal, onClickFunction }) {
    const [playerRating, setPlayerRating] = useState(null);
    const [playerName, setPlayerName] = useState("");
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
                    <input type="number" placeholder="Rating" value={playerRating} onChange={e => setPlayerRating(e.target.value)} />
                    <input type="text" placeholder="Name (optional)" value={playerName} onChange={e => setPlayerName(e.target.value)} />
                    <button onClick={() => {
                        if (!playerRating) return alert("Must include a rating.");
                        onClickFunction({
                        rating: playerRating,
                        firstName: playerName.split(" ")[0],
                        lastName: playerName.split(" ")[1]
                    })}}><i className="fa-solid fa-plus" /> Add player</button>
                </div>
            </div>
        </div>
    );
};