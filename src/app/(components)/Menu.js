import { useState } from "react";
import Link from "next/link";
import { UsattModal } from "./UsattModal";

export function Menu({ setMyRating, myRating }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    function modalFunction(player) {
        localStorage.setItem("playerId", player.id);
        setMyRating(player.rating);
    };

    return (
        <section className="menu">
            <div className="top-menu">
                {
                    myRating ? (
                        <div className="my-rating-container">
                            <div className="my-rating-box">
                                <div className="my-rating-text"><p>My rating</p></div>
                                <div className="my-rating-value"><p>{myRating}</p></div>
                            </div>
                            <div className="edit-rating-box">
                                <button onClick={() => setOpenModal(true)}><i className="fa-solid fa-gear" /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="sync-usatt">
                            <button onClick={() => setOpenModal(true)}><i className="fa-solid fa-link" /> Sync USATT</button>
                        </div>
                    )
                }
                <div className="hamburger-icon">
                    <i className="fa-solid fa-bars" onClick={() => setOpenMenu(!openMenu)} />
                </div>
            </div>
            {
                openMenu ? (
                    <div className="bottom-menu">
                        <div className="row row-1">
                            <Link href="/player-watch">Player watch</Link>
                            <Link href="/rating-calculator">Rating calculator</Link>
                        </div>
                        <div className="row row-2">
                            <Link href="/head-to-head">Head to Head</Link>
                            <Link href="/theme-selector">Theme selector</Link>
                        </div>
                    </div>
                ) : null
            }
            {
                openModal ? (
                    <UsattModal modalTitle="USATT Rating Lookup" setOpenModal={setOpenModal} placeholderText="Search for USATT member" onClickFunction={modalFunction} />
                ) : null
            }
        </section>
    );
};