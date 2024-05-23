import "./tournament.css";

export function Events({ events }) {
    return (
        <>
            {
                events.map((event, eventIndex) => (
                    <div className="group" key={eventIndex}>
                        <div className="group-header">
                            <div className="event-name">
                                <h2>{event.name}</h2>
                            </div>
                            <div className="event-details bubbles">
                                { event.maxSlots ? <span className="bubble">{event.maxSlots}</span> : null }
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
            }
        </>
    );
};