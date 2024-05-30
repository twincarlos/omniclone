"use client";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

export function UsattModal({ modalTitle, setOpenModal, placeholderText, onClickFunction }) {
    const [players, setPlayers] = useState([]);
    const debouncedFetch = useCallback(
        debounce(keyword => {
            if (keyword.length) {
                fetch(`/api/usatt/player-lookup/${keyword}`)
                    .then(response => response.json())
                    .then(data => setPlayers(data))
            } else {
                setPlayers([]);
            };
        }, 500), []);

    return (
        <div className="modal">
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal-title">
                        <p>{modalTitle}</p>
                    </div>
                    <div className="exit-modal">
                        <button onClick={() => setOpenModal(false)}><i className="fa-regular fa-circle-xmark" /></button>
                    </div>
                </div>
                <div className="modal-input">
                    <input type="text" placeholder={placeholderText} onChange={e => debouncedFetch(e.target.value)} />
                </div>
                <div className="modal-content">
                    {
                        players.length ? (
                            players.map(player => (
                                <div className="player-lookup-result list-card" key={player.id} onClick={() => {
                                    onClickFunction(player);
                                    setPlayers([]);
                                    setOpenModal(false);
                                }}>
                                    <div className="player-lookup-result-top">
                                        <p>{player.rating}</p>
                                        <p>{player.firstName} {player.lastName}</p>
                                    </div>
                                    <div className="player-lookup-result-bottom">
                                        <p>{player.location}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-list">
                                <i className="fa-solid fa-magnifying-glass" />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};