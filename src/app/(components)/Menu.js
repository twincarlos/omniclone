import { useState } from "react";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import debounce from 'lodash/debounce';

export function Menu({ setMyRating, myRating }) {
    const [openMenu, setOpenMenu] = useState(false);
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
                        <Link href="/">Player watch</Link>
                        <Link href="/">Rating calculator</Link>
                    </div>
                ) : null
            }
            {
                openModal ? (
                    <div className="modal">
                        <div className="sync-usatt-modal">
                            <div className="exit-modal">
                                <button onClick={() => setOpenModal(false)}><i className="fa-regular fa-circle-xmark" /></button>
                            </div>
                            <div className="modal-header">
                                <input type="text" placeholder="Search for a USATT member" onChange={e => debouncedFetch(e.target.value)} />
                            </div>
                            <div className="modal-content">
                                {
                                    players.length ? (
                                        players.map(player => (
                                            <div className="player-lookup-result list-card" key={player.id} onClick={() => {
                                                localStorage.setItem("playerId", player.id);
                                                setMyRating(player.rating);
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
                ) : null
            }
        </section>
    );
};