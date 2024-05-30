"use client";

import Link from "next/link";
import "./head-to-head.css";
import { UsattModal } from "../(components)/UsattModal";
import { useEffect, useState } from "react";

export default function HeadToHead() {
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);

    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);

    const [headToHeadData, setHeadToHeadData] = useState(null);

    useEffect(() => {
        const fetchHeadToHeadData = async () => {
            const response = await fetch(`/api/usatt/head-to-head/${player1.id}/${player2.id}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await response.json();
            setHeadToHeadData(data);
        };

        if (player1 && player2) fetchHeadToHeadData();
    }, [player1, player2]);

    return (
        <main>
            <section className="main-header">
                <div>
                    <Link href="/" className="back-link"><i className="fa-solid fa-chevron-left" /> Back</Link>
                </div>
                <div className="header-title">
                    <h1>Head to Head</h1>
                </div>
            </section>
            <section>
                <div className="add-player-buttons">
                    <button onClick={() => setOpenModal1(true)}>{player1 ? "Edit" : "Add"} Player 1</button>
                    <button onClick={() => setOpenModal2(true)}>{player2 ? "Edit" : "Add"} Player 2</button>
                </div>
            </section>
            <section className="head-to-head-header">
                <div className="player-card player1-card">
                    <div className="player-rating">
                        <h1>{player1?.rating}</h1>
                    </div>
                    <div className="player-name">
                        <p>{player1?.firstName} {player1?.lastName}</p>
                    </div>
                </div>
                <div className="player-card player2-card">
                    <div className="player-rating">
                        <h1>{player2?.rating}</h1>
                    </div>
                    <div className="player-name">
                        <p>{player2?.firstName} {player2?.lastName}</p>
                    </div>
                </div>
            </section>
            {
                headToHeadData ? (
                    <section className="head-to-head-content">
                        <div className="head-to-head-count">
                            <div className="matches-count">
                                <h1>{headToHeadData.player1Score}</h1>
                            </div>
                            -
                            <div className="matches-count">
                                <h1>{headToHeadData.player2Score}</h1>
                            </div>
                        </div>
                        <div className="head-to-head-list">
                            <div className="head-to-head-list-card list-card list-headers">
                                <div className="head-to-head-tournament head-to-head-cell">
                                    <p>Tournament</p>
                                </div>
                                <div className="head-to-head-date head-to-head-cell">
                                    <p>Date</p>
                                </div>
                                <div className="head-to-head-winner head-to-head-cell">
                                    <p>Winner</p>
                                </div>
                                <div className="head-to-head-loser head-to-head-cell">
                                    <p>Loser</p>
                                </div>
                                <div className="head-to-head-event head-to-head-cell">
                                    <p>Event</p>
                                </div>
                                <div className="head-to-head-score head-to-head-cell">
                                    <p>Score</p>
                                </div>
                            </div>
                            {
                                headToHeadData.headToHeadData.map((tournament, index) => (
                                    <div className="head-to-head-list-card list-card" key={index}>
                                        <div className="head-to-head-tournament head-to-head-cell">
                                            <p>{tournament.tournament}</p>
                                        </div>
                                        <div className="head-to-head-date head-to-head-cell">
                                            <p>{tournament.date.split("-")[0].trim()}</p>
                                        </div>
                                        <div className="head-to-head-winner head-to-head-cell">
                                            <p>{tournament.winner.name}</p>
                                        </div>
                                        <div className="head-to-head-loser head-to-head-cell">
                                            <p>{tournament.loser.name}</p>
                                        </div>
                                        <div className="head-to-head-event head-to-head-cell">
                                            <p>{tournament.event}</p>
                                        </div>
                                        <div className="head-to-head-score head-to-head-cell">
                                            <p>{tournament.score}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                ) : null
            }
            {
                openModal1 ? (
                    <UsattModal modalTitle="USATT Rating Lookup" setOpenModal={setOpenModal1} placeholderText="Search for USATT member" onClickFunction={setPlayer1} />
                ) : null
            }
            {
                openModal2 ? (
                    <UsattModal modalTitle="USATT Rating Lookup" setOpenModal={setOpenModal2} placeholderText="Search for USATT member" onClickFunction={setPlayer2} />
                ) : null
            }
        </main>
    );
};