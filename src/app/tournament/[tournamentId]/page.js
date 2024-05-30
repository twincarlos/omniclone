"use client";

import "./tournament.css";

import { useState, useEffect } from "react";
import { Events } from "@/app/(components)/Events";
import { Players } from "@/app/(components)/Players";
import Link from "next/link";

export default function Tournament() {
    const [category, setCategory] = useState("Players");
    const [tournament, setTournament] = useState(null);

    useEffect(() => {
        const url = window.location.href.split("/tournament/")[1].split("#");
        const fetchData = async () => {
            const response = await fetch(`/api/tournament/${url[0]}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await response.json();
            setTournament({
                name: data.name,
                state: url[2].split("%20").join(" "),
                city: url[3].split("%20").join(" "),
                date: url[4].split("%20-%20").join(" - "),
                pdf: url[1],
                players: data.players,
                events: data.events
            });
        };

        fetchData();
    }, []);

    if (!tournament) {
        return (
            <main className="loading">
                <img className="gif" src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmc0bGduamJqb3V1d2E3YW1nNHBhaTczdzA2bXEyMWgwbXc5eHhoMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41lIvPtFdU3cLQjK/giphy.gif"} />
            </main>
        );
    };

    return (
        <main className="tournament-page">
            <section className="tournament-header">
                <div>
                    <Link href="/" className="back-link"><i className="fa-solid fa-chevron-left" /> Back</Link>
                </div>
                <div>
                    {
                        tournament.pdf === "undefined" ? null :
                            <Link href={`https://omnipong.com/${tournament.pdf}`} target="_blank" className="pdf">
                                <i className="fa-regular fa-file-pdf" /><p>Prospect</p>
                            </Link>
                    }
                </div>
            </section>
            <section className="header">
                <div className="page-title">
                    <h1>{tournament.name}</h1>
                </div>
                <div className="header-details">
                    <div>
                        <p>{tournament.state}</p>
                    </div>
                    <div>
                        <p>{tournament.city}</p>
                    </div>
                    <div>
                        <p>{tournament.date}</p>
                    </div>
                </div>
            </section>
            {
                tournament.players.length ?
                    <section>
                        <div className="tabs">
                            <button className={`tab ${category === "Players" ? "tab-selected" : ""}`} onClick={() => setCategory("Players")}>Players</button>
                            <button className={`tab ${category === "Events" ? "tab-selected" : ""}`} onClick={() => setCategory("Events")}>Events</button>
                        </div>
                        <div className="page-content">
                            {
                                category === "Players" ? <Players players={tournament.players} /> : <Events events={tournament.events} />
                            }
                        </div>
                    </section> :
                    <section className="no-players-registered">
                        <h2>No players registered at this time</h2>
                        <img className="gif" src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZThheG92bnM3d3J4Mzd3cnZtYm44dzM1YzhiZTRwN2p5bzhrbzY2MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kpy18R3NVSLy8/giphy.gif"} />
                    </section>
            }
        </main>
    );
};