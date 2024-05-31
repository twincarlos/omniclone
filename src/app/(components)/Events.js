"use client";
import "../style.css";

import { GroupsMaker } from "./GroupsMaker";
import { useState } from "react";

export function Events({ events }) {
    const [eventToGenerateGroups, setEventToGenerateGroups] = useState(null);
    return (
        <>
            {
                eventToGenerateGroups ? <GroupsMaker event={eventToGenerateGroups} setEvent={setEventToGenerateGroups} /> : (
                    events.map((event, eventIndex) => (
                        <div className="group" key={eventIndex}>
                            <div className="group-header">
                                <div className="event-name">
                                    <h2>{event.name}</h2>
                                    {event.players.length >= 6 ? <i onClick={() => setEventToGenerateGroups(event)} className="fa-solid fa-bolt-lightning" /> : null}
                                </div>
                                <div className="event-details bubbles">
                                    {event.maxSlots ? <span className="bubble">{event.maxSlots}</span> : null}
                                    <span className="bubble">{event.date}</span>
                                    <span className="bubble">{event.time}</span>
                                </div>
                            </div>
                            <div className="group-list">
                                {
                                    event.players.map((player, playerIndex) => (
                                        <div className="player list-card" key={playerIndex}>
                                            <div className="player-rating">
                                                <p>{player.rating}</p>
                                            </div>
                                            <div className="player-name">
                                                <p>{player.name}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="total-row">
                                    <p>Total: {event.players.length}</p>
                                </div>
                            </div>
                        </div>
                    ))

                )
            }
        </>
    );
};