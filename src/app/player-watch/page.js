"use client";
import "./player-watch.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { UsattModal } from "../(components)/UsattModal";

export default function PlayerWatch() {
    const [watchPlayers, setWatchPlayers] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    function modalFunction(player) {
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
    };

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
            <section className="main-header">
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
                                    <button onClick={() => removeWatchPlayer(watchPlayer.id)}><i className="fa-solid fa-x" /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            <section className="add-player-button">
                <div>
                    <button onClick={() => setOpenModal(true)}><i className="fa-solid fa-plus" /> Add player</button>
                </div>
            </section>
            {
                openModal ? (
                    <UsattModal modalTitle="USATT Rating Lookup" setOpenModal={setOpenModal} placeholderText="Search for USATT member" onClickFunction={modalFunction} />
                ) : null
            }
        </main>
    );
};