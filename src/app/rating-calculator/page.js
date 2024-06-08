"use client";
import Link from "next/link";
import "./RatingCalculator.css";
import { UsattModal } from "../(components)/UsattModal";
import { ManualModal } from "../(components)/ManualModal";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import "./RatingCalculator.css";

export default function RatingCalculator() {
    const [openModal, setOpenModal] = useState(false);
    const [ratingCalculatorPlayers, setRatingCalculatorPlayers] = useState([]);
    const [initialRating, setInitialRating] = useState("");
    const [finalRating, setFinalRating] = useState("");

    useEffect(() => {
        const localRatingCalculatorPlayers = JSON.parse(localStorage.getItem("ratingCalculatorPlayers"));
        const localRatingCalculatorInitialRating = JSON.parse(localStorage.getItem("ratingCalculatorInitialRating"));
        setRatingCalculatorPlayers(localRatingCalculatorPlayers);
        setInitialRating(localRatingCalculatorInitialRating);
        if (localRatingCalculatorInitialRating && localRatingCalculatorPlayers && localRatingCalculatorPlayers.length) {
            determineFinalRating(localRatingCalculatorInitialRating, localRatingCalculatorPlayers);
        };
    }, []);

    function determineFinalRating(myRating, ratingPlayers) {
        let total = 0;
        ratingPlayers.forEach(player => total += determineWinLossPoints(myRating, player.rating, player.outcome));
        setFinalRating(Number(myRating) + total);
    };

    function determineWinLossPoints(myRating, playerRating, outcome) {
        const pointsDifference = Math.abs(Number(myRating) - Number(playerRating));
        if (outcome === "W") {
            console.log("W")
            if (Number(myRating) >= Number(playerRating)) {
                if (pointsDifference >= 0 && pointsDifference <= 12) {
                    return 8;
                }
                else if (pointsDifference >= 13 && pointsDifference <= 37) {
                    return 7;
                }
                else if (pointsDifference >= 38 && pointsDifference <= 62) {
                    return 6;
                }
                else if (pointsDifference >= 63 && pointsDifference <= 87) {
                    return 5;
                }
                else if (pointsDifference >= 88 && pointsDifference <= 112) {
                    return 4;
                }
                else if (pointsDifference >= 113 && pointsDifference <= 137) {
                    return 3;
                }
                else if (pointsDifference >= 138 && pointsDifference <= 162) {
                    return 2;
                }
                else if (pointsDifference >= 163 && pointsDifference <= 187) {
                    return 2;
                }
                else if (pointsDifference >= 188 && pointsDifference <= 212) {
                    return 1;
                }
                else if (pointsDifference >= 213 && pointsDifference <= 237) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else {
                if (pointsDifference >= 0 && pointsDifference <= 12) {
                    return 8;
                }
                else if (pointsDifference >= 13 && pointsDifference <= 37) {
                    return 10;
                }
                else if (pointsDifference >= 38 && pointsDifference <= 62) {
                    return 13;
                }
                else if (pointsDifference >= 63 && pointsDifference <= 87) {
                    return 16;
                }
                else if (pointsDifference >= 88 && pointsDifference <= 112) {
                    return 20;
                }
                else if (pointsDifference >= 113 && pointsDifference <= 137) {
                    return 25;
                }
                else if (pointsDifference >= 138 && pointsDifference <= 162) {
                    return 30;
                }
                else if (pointsDifference >= 163 && pointsDifference <= 187) {
                    return 35;
                }
                else if (pointsDifference >= 188 && pointsDifference <= 212) {
                    return 40;
                }
                else if (pointsDifference >= 213 && pointsDifference <= 237) {
                    return 45;
                }
                else {
                    return 50;
                }
            };
        }
        else {
            if (myRating >= playerRating) {
                if (pointsDifference >= 0 && pointsDifference <= 12) {
                    return -8;
                }
                else if (pointsDifference >= 13 && pointsDifference <= 37) {
                    return -10;
                }
                else if (pointsDifference >= 38 && pointsDifference <= 62) {
                    return -13;
                }
                else if (pointsDifference >= 63 && pointsDifference <= 87) {
                    return -16;
                }
                else if (pointsDifference >= 88 && pointsDifference <= 112) {
                    return -20;
                }
                else if (pointsDifference >= 113 && pointsDifference <= 137) {
                    return -25;
                }
                else if (pointsDifference >= 138 && pointsDifference <= 162) {
                    return -30;
                }
                else if (pointsDifference >= 163 && pointsDifference <= 187) {
                    return -35;
                }
                else if (pointsDifference >= 188 && pointsDifference <= 212) {
                    return -40;
                }
                else if (pointsDifference >= 213 && pointsDifference <= 237) {
                    return -45;
                }
                else {
                    return -50;
                }
            }
            else {
                if (pointsDifference >= 0 && pointsDifference <= 12) {
                    return -8;
                }
                else if (pointsDifference >= 13 && pointsDifference <= 37) {
                    return -7;
                }
                else if (pointsDifference >= 38 && pointsDifference <= 62) {
                    return -6;
                }
                else if (pointsDifference >= 63 && pointsDifference <= 87) {
                    return -5;
                }
                else if (pointsDifference >= 88 && pointsDifference <= 112) {
                    return -4;
                }
                else if (pointsDifference >= 113 && pointsDifference <= 137) {
                    return -3;
                }
                else if (pointsDifference >= 138 && pointsDifference <= 162) {
                    return -2;
                }
                else if (pointsDifference >= 163 && pointsDifference <= 187) {
                    return -2;
                }
                else if (pointsDifference >= 188 && pointsDifference <= 212) {
                    return -1;
                }
                else if (pointsDifference >= 213 && pointsDifference <= 237) {
                    return -1;
                }
                else {
                    return 0;
                }
            };
        };
    };

    const debouncedInitialRatingUpdate = useCallback(
        debounce(rating => {
            localStorage.setItem("ratingCalculatorInitialRating", JSON.stringify(rating));
            determineFinalRating(rating, ratingCalculatorPlayers);
        }, 1000), []);

    function addRatingCalculatorPlayer(player) {
        const localRatingCalculatorPlayers = JSON.parse(localStorage.getItem("ratingCalculatorPlayers"));
        const newLocalRatingCalculatorPlayers = localRatingCalculatorPlayers ? [...localRatingCalculatorPlayers, {
            id: player.id ? player.id : uuidv4(),
            rating: player.rating,
            name: `${player.firstName ? player.firstName : ""} ${player.lastName ? player.lastName : ""}`
        }] : [{
            id: player.id ? player.id : uuidv4(),
            rating: player.rating,
            name: `${player.firstName ? player.firstName : ""} ${player.lastName ? player.lastName : ""}`
        }];
        localStorage.setItem("ratingCalculatorPlayers", JSON.stringify(newLocalRatingCalculatorPlayers));
        setRatingCalculatorPlayers(newLocalRatingCalculatorPlayers);
        determineFinalRating(initialRating, newLocalRatingCalculatorPlayers);
        setOpenModal(false);
    };

    function removeRatingCalculatorPlayer(id) {
        const localRatingCalculatorPlayers = JSON.parse(localStorage.getItem("ratingCalculatorPlayers"));
        const newLocalRatingCalculatorPlayers = localRatingCalculatorPlayers.filter(player => player.id != id);
        localStorage.setItem("ratingCalculatorPlayers", JSON.stringify(newLocalRatingCalculatorPlayers));
        setRatingCalculatorPlayers(newLocalRatingCalculatorPlayers);
        determineFinalRating(initialRating, newLocalRatingCalculatorPlayers);
    };

    function updateRatingCalculatorPlayerOutcome(playerId, outcome) {
        const newRatingCalculatorPlayers = ratingCalculatorPlayers.map(player => playerId === player.id ? { ...player, outcome } : player);
        setRatingCalculatorPlayers(newRatingCalculatorPlayers);
        localStorage.setItem("ratingCalculatorPlayers", JSON.stringify(newRatingCalculatorPlayers));
        determineFinalRating(initialRating, newRatingCalculatorPlayers);
    };

    return (
        <main>
            <section className="main-header">
                <div>
                    <Link href="/" className="back-link"><i className="fa-solid fa-chevron-left" /> Back</Link>
                </div>
                <div className="header-title">
                    <h1>Rating calculator</h1>
                </div>
            </section>
            <section className="rating-calculator-content">
                <label>
                    Initial rating:
                    <input type="number" value={initialRating} onChange={e => {
                        setInitialRating(e.target.value);
                        debouncedInitialRatingUpdate(e.target.value);
                    }} />
                </label>
                <label>
                    Final rating:
                    <input type="number" value={finalRating} readOnly />
                </label>
            </section>
            <section className="win-loss-container">
                {
                    ratingCalculatorPlayers ? ratingCalculatorPlayers.map(player => (
                        <div key={player.id} className="rating-calculator-player">
                            <div className="rating-calculator-player-info">
                                <div className="rating-calculator-player-name-and-rating">
                                    <p>{player.rating}</p>
                                    <p>{player.name}</p>
                                </div>
                                <div className="rating-calculator-player-outcome">
                                    <p>-8</p>
                                </div>
                            </div>
                            <div className="rating-calculator-player-inputs">
                                <label className="label-win">
                                    W
                                    <input type="radio" checked={player.outcome === "W"} name={player.id} value="W" onChange={e => updateRatingCalculatorPlayerOutcome(player.id, e.target.value)} />
                                </label>
                                <label className="label-loss">
                                    L
                                    <input type="radio" checked={player.outcome === "L"} name={player.id} value="L" onChange={e => updateRatingCalculatorPlayerOutcome(player.id, e.target.value)} />
                                </label>
                                <button onClick={() => removeRatingCalculatorPlayer(player.id)}><i className="fa-solid fa-trash" /></button>
                            </div>
                        </div>
                    )) : null
                }
                <button onClick={() => setOpenModal(true)}><i className="fa-solid fa-plus" /> Add player</button>
            </section>
            {
                openModal ? (
                    <div className="usatt-and-manual-modals">
                        <ManualModal
                            setOpenModal={setOpenModal}
                            onClickFunction={addRatingCalculatorPlayer}
                        />
                        <UsattModal
                            modalTitle="USATT Player Lookup"
                            setOpenModal={setOpenModal}
                            placeholderText={"Search players"}
                            onClickFunction={addRatingCalculatorPlayer}
                        />
                    </div>
                ) : null
            }
        </main>
    );
};