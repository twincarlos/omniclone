import "./tournament.css";

export function Players({ players }) {
    return (
        <>
            {
                players.map((player, index) => (
                    <div className="player list-card" key={index}>
                        <div className="player-rating">
                            <p>{player.rating}</p>
                        </div>
                        <div className="player-name">
                            <p>{player.name}</p>
                        </div>
                    </div>
                ))
            }
        </>
    );
};