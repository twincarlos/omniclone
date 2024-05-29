import Link from "next/link";

export function Favorites({ expandFavorites, setExpandFavorites, groups, favorites, updateFavorites }) {
    return (
        <section className="favorites-list tournaments-list expandable-card">
            <div className="card-section card-header expandable-card-header">
                <div className="card-subsection">
                    {expandFavorites ? <i className="fa-solid fa-chevron-down" onClick={() => setExpandFavorites(false)} /> : <i className="fa-solid fa-chevron-up" onClick={() => setExpandFavorites(true)} />}
                </div>
                <div className="card-subsection">
                    <p>Favorites</p>
                </div>
            </div>
            {
                expandFavorites &&
                groups.map(group => group.tournaments.filter(tournament => (favorites[tournament.id] != undefined) && (tournament.state != "USATT Events")).map(tournament => (
                    <div key={tournament.id} className="card">
                        <div className="card-section card-main">
                            <div className="card-subsection">
                                {
                                    favorites[tournament.id] != undefined ? <i className="fa-solid fa-star" onClick={() => updateFavorites(tournament.id)} /> : <i className="fa-regular fa-star" onClick={() => updateFavorites(tournament.id)} />
                                }
                            </div>
                            <div className="card-subsection">
                                <Link href={`/tournament/${tournament.id}#${tournament.pdf}#${tournament.state}#${tournament.city}#${tournament.date}`}>{tournament.name}</Link>
                            </div>
                        </div>
                    </div>
                )))
            }
        </section>
    );
};