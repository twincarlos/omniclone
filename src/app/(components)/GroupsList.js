import Link from "next/link"

export function GroupsList({ groups, filterText, viewMoreLess, setViewMoreLess, favorites, updateFavorites }) {
    return (
        <section className="tournaments-list">
            {
                groups.map((group, groupIndex) => group.tournaments.filter(tournament =>
                (
                    tournament.name.toLowerCase().includes(filterText.toLowerCase()) ||
                    tournament.state.toLowerCase().includes(filterText.toLowerCase()) ||
                    tournament.city.toLowerCase().includes(filterText.toLowerCase())
                )).length ? (
                    <div className="group" key={groupIndex}>
                        <div className="group-header">
                            <h2>{group.group}</h2>
                        </div>
                        <div className="group-list">
                            {
                                group.tournaments.filter(tournament =>
                                (
                                    tournament.name.toLowerCase().includes(filterText.toLowerCase()) ||
                                    tournament.state.toLowerCase().includes(filterText.toLowerCase()) ||
                                    tournament.city.toLowerCase().includes(filterText.toLowerCase())
                                )
                                ).map((tournament, tournamentIndex) => ((tournamentIndex < 3) || (tournamentIndex >= 3 && groupIndex === viewMoreLess)) ? (
                                    <div key={tournament.id} className="list-card">
                                        <div className="tournament-name">
                                            <Link href={`/tournament/${tournament.id}#${tournament.pdf}#${tournament.state}#${tournament.city}#${tournament.date}`}>{tournament.name}</Link>
                                        </div>
                                        <div className="tournament-details">
                                            {
                                                favorites[tournament.id] != undefined ? <i className="fa-solid fa-star" onClick={() => updateFavorites(tournament.id)} /> : <i className="fa-regular fa-star" onClick={() => updateFavorites(tournament.id)} />
                                            }
                                            <span className={`status ${tournament.status.toLowerCase()}`}>{tournament.status}</span>
                                            <span>{tournament.city}</span>
                                            <span>{tournament.date}</span>
                                        </div>
                                    </div>
                                ) : null)
                            }
                        </div>
                        <div className="group-footer">
                            {
                                group.tournaments.filter(tournament =>
                                (
                                    tournament.name.toLowerCase().includes(filterText.toLowerCase()) ||
                                    tournament.state.toLowerCase().includes(filterText.toLowerCase()) ||
                                    tournament.city.toLowerCase().includes(filterText.toLowerCase())
                                )
                                ).length > 3 ? (<button onClick={() => groupIndex === viewMoreLess ? setViewMoreLess(null) : setViewMoreLess(groupIndex)}>{groupIndex === viewMoreLess ? "View less" : "View more"}</button>) : null
                            }
                        </div>
                    </div>
                ) : null)
            }
        </section>
    );
};