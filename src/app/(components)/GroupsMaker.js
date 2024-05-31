import "../style.css";

export function GroupsMaker({ event, setEvent }) {
    function generateGroups() {
        const groups = [[], []];
        for (let i = 9; i <= event.players.length; i = i + 4) {
            groups.push([]);
        };

        const counter = {
            number: 0,
            direction: "up",
            hasBegan: false
        };

        for (let i = 0; i < event.players.length; i++) {
            groups[counter.number].push(event.players[i]);
            if (counter.hasBegan) {
                if (counter.direction === "up") {
                    if (counter.number === groups.length - 1) {
                        counter.direction = "down";
                    }
                    else {
                        counter.number++;
                    };
                } else {
                    if (counter.number === 0) {
                        counter.direction = "up";
                    } else {
                        counter.number--;
                    };
                };
            }
            else {
                counter.number++;
                counter.hasBegan = true;
            };
        };

        return groups;
    };

    const groups = generateGroups();

    return (
        <div className="modal groups-modal">
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal-title">
                        <p>{event.name}</p>
                    </div>
                    <div className="exit-modal">
                        <button onClick={() => setEvent(null)}><i className="fa-regular fa-circle-xmark" /></button>
                    </div>
                </div>
                <div className="modal-content">
                    {
                        groups.map((group, groupIndex) => (
                            <div className="group" key={groupIndex}>
                                <div className="group-header">
                                    <p>Group {groupIndex + 1}</p>
                                </div>
                                <div className="group-players">
                                    {
                                        group.map((player, playerIndex) => (
                                            <div className="group-player list-card" key={playerIndex}>
                                                <div className="player-rating">
                                                    <p>{player.rating}</p>
                                                </div>
                                                <div className="player-name">
                                                    <p>{player.name}</p> 
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};