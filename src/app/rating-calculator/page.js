"use client";
import Link from "next/link";
import "./RatingCalculator.css";
import { UsattModal } from "../(components)/UsattModal";
import { ManualModal } from "../(components)/ManualModal";
import { useState } from "react";
import "./RatingCalculator.css";

export default function RatingCalculator() {
    const [openModal, setOpenModal] = useState(false);

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
                    <input type="number" />
                </label>
                <label>
                    Final rating:
                    <input type="number" />
                </label>
            </section>
            <section className="win-loss-container">
                <div className="rating-calculator-player">
                    <div className="rating-calculator-player-info">
                        <p>2096</p>
                        <p>Carlos Rodriguez</p>
                    </div>
                    <div className="rating-calculator-player-inputs">
                        <label className="label-win">
                            W
                            <input type="radio" name="carlos" />
                        </label>
                        <label className="label-loss">
                            L
                            <input type="radio" name="carlos" />
                        </label>
                        <button><i className="fa-solid fa-trash" /></button>
                    </div>
                </div>
                <div className="rating-calculator-player">
                    <div className="rating-calculator-player-info">
                        <p>3000</p>
                        <p>Ma Long</p>
                    </div>
                    <div className="rating-calculator-player-inputs">
                        <label className="label-win">
                            W
                            <input type="radio" name="malong" />
                        </label>
                        <label className="label-loss">
                            L
                            <input type="radio" name="malong" />
                        </label>
                        <button><i className="fa-solid fa-trash" /></button>
                    </div>
                </div>
                <button onClick={() => setOpenModal(true)}><i className="fa-solid fa-plus" /> Add player</button>
            </section>
            {
                openModal ? (
                    <div className="usatt-and-manual-modals">
                        <ManualModal
                            setOpenModal={setOpenModal}
                        />
                        <UsattModal
                            modalTitle="USATT Player Lookup"
                            setOpenModal={setOpenModal}
                            placeholderText={"Search players"}
                        />
                    </div>
                ) : null
            }
        </main>
    );
};