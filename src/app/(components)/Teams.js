"use client";
import "../style.css";

import { GroupsMaker } from "./GroupsMaker";
import { useState } from "react";

export function Teams({ teamEvents }) {
    const [eventToGenerateGroups, setEventToGenerateGroups] = useState(null);
    return (
        <>
            {
                eventToGenerateGroups ? <GroupsMaker event={eventToGenerateGroups} setEvent={setEventToGenerateGroups} /> : (
                    teamEvents.map((teamEvent, teamEventIndex) => (
                        <div className="group" key={teamEventIndex}>
                            <div className="group-header">
                                <div className="event-name">
                                    <h2>{teamEvent.eventName}</h2>
                                    {/* {teamEvent.eventTeams.length >= 6 ? <i onClick={() => setEventToGenerateGroups(teamEvent)} className="fa-solid fa-bolt-lightning" /> : null} */}
                                </div>
                                {/* <div className="event-details bubbles">
                                    {teamEvent.maxSlots ? <span className="bubble">{teamEvent.maxSlots}</span> : null}
                                    <span className="bubble">{teamEvent.date}</span>
                                    <span className="bubble">{teamEvent.time}</span>
                                </div> */}
                            </div>
                            <div className="group-list">
                                {
                                    teamEvent.eventTeams.map((player, playerIndex) => (
                                        <div className="player list-card" key={playerIndex}>
                                            <div className="player-rating">
                                                <p>{player.rating}</p>
                                            </div>
                                            <div className="team-name">
                                                <p>{player.name}</p>
                                            </div>
                                            <div className="team-members">
                                                <p>{player.members}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="total-row">
                                    <p>Total: {teamEvent.eventTeams.length}</p>
                                </div>
                            </div>
                        </div>
                    ))

                )
            }
        </>
    );
};