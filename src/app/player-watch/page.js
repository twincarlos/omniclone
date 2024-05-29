"use client";
import "./player-watch.css";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export default function PlayerWatch() {
    const [watchPlayers, setWatchPlayers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [players, setPlayers] = useState([]);

    const debouncedFetch = useCallback(
        debounce(keyword => {
            if (keyword.length) {
                fetch(`/api/usatt/player-lookup/${keyword}`)
                    .then(response => response.json())
                    .then(data => setPlayers(data));
            } else {
                setPlayers([]);
            };
        }, 500), []);

    function removeWatchPlayer(playerId) {
        const filteredWatchPlayers = watchPlayers.filter(watchPlayer => watchPlayer.id != playerId);
        setWatchPlayers(filteredWatchPlayers);
        localStorage.setItem("watchPlayers", JSON.stringify(filteredWatchPlayers));
    };

    useEffect(() => {
        const localWatchPlayers = JSON.parse(localStorage.getItem("watchPlayers"));
        if (localWatchPlayers) {
            setWatchPlayers(localWatchPlayers);
        };
    }, []);

    return (
        <main className="player-watch">
            <section className="player-watch-header">
                <div>
                    <Link href="/" className="back-link"><i className="fa-solid fa-chevron-left" /> Back</Link>
                </div>
                <div className="header-title">
                    <h1>Player watch</h1>
                </div>
            </section>
            <section className="player-watch-content">
                <div className="player-watch-list">
                    {
                        watchPlayers.map(watchPlayer => (
                            <div className="player-watch-card" key={watchPlayer.id}>
                                <div className="player-watch-content">
                                    <div className="player-watch-rating">
                                        <p>{watchPlayer.rating}</p>
                                    </div>
                                    <div className="player-watch-name">
                                        <p>{watchPlayer.name}</p>
                                    </div>
                                </div>
                                <div className="player-watch-buttons">
                                    <button onClick={() => removeWatchPlayer(watchPlayer.id)}><i class="fa-solid fa-x" /></button>
                                    <button className="vs">VS</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="add-player-button">
                    <button onClick={() => setOpenModal(true)}><i className="fa-solid fa-plus" /> Add player</button>
                </div>
            </section>
            {
                openModal ? (
                    <div className="modal">
                        <div className="sync-usatt-modal">
                            <div className="modal-header">
                                <div className="modal-title">
                                    <p>USATT Rating Lookup</p>
                                </div>
                                <div className="exit-modal">
                                    <button onClick={() => setOpenModal(false)}><i className="fa-regular fa-circle-xmark" /></button>
                                </div>
                            </div>
                            <div className="modal-input">
                                <input type="text" placeholder="Search for a USATT member" onChange={e => debouncedFetch(e.target.value)} />
                            </div>
                            <div className="modal-content">
                                {
                                    players.length ? (
                                        players.map(player => (
                                            <div className="player-lookup-result list-card" key={player.id} onClick={() => {
                                                const localWatchPlayers = JSON.parse(localStorage.getItem("watchPlayers"));
                                                if (localWatchPlayers) {
                                                    if (!localWatchPlayers.find(localPlayer => localPlayer.id === player.id)) {
                                                        localStorage.setItem("watchPlayers", JSON.stringify([...localWatchPlayers, {
                                                            id: player.id,
                                                            name: `${player.firstName} ${player.lastName}`,
                                                            location: player.location,
                                                            rating: player.rating
                                                        }]));
                                                        setWatchPlayers([...watchPlayers, {
                                                            id: player.id,
                                                            name: `${player.firstName} ${player.lastName}`,
                                                            location: player.location,
                                                            rating: player.rating
                                                        }]);
                                                    };
                                                } else {
                                                    localStorage.setItem("watchPlayers", JSON.stringify([{
                                                        id: player.id,
                                                        name: `${player.firstName} ${player.lastName}`,
                                                        location: player.location,
                                                        rating: player.rating
                                                    }]));
                                                };
                                                setOpenModal(false);
                                                setPlayers([]);
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
                ) : null
            }
        </main>
    );
};