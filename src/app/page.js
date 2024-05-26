"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./style.css";

export default function Home() {
  const [groups, setGroups] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [sorting, setSorting] = useState({ category: "state", type: "ASC" });
  const [favorites, setFavorites] = useState({});
  const [expandFavorites, setExpandFavorites] = useState(true);
  const [viewMoreLess, setViewMoreLess] = useState(null);

  useEffect(() => {
    const localStorageFavorites = localStorage.getItem("favorites");
    if (localStorageFavorites) {
      setFavorites(JSON.parse(localStorageFavorites));
    } else {
      localStorage.setItem("favorites", JSON.stringify({}));
    };

    const fetchData = async () => {
      const response = await fetch('/api');
      const data = await response.json();
      setGroups(data);
    };

    fetchData();
  }, []);

  function sortByName() {
    const sortedTournaments = [];
    groups.forEach(group => sortedTournaments.push(...group.tournaments));
    if (sorting.category === "name") {
      if (sorting.type === "ASC") {
        sortedTournaments.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
        setSorting({ ...sorting, type: "DESC" });
      } else {
        sortedTournaments.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        setSorting({ ...sorting, type: "ASC" });
      };
    } else {
      sortedTournaments.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setSorting({ category: "name", type: "ASC" });
    };
    const groupedTournaments = [];
    sortedTournaments.forEach(tournament => {
      const currentGroup = groupedTournaments[groupedTournaments.length - 1]?.group;
      if (currentGroup === tournament.name[0]) {
        groupedTournaments[groupedTournaments.length - 1].tournaments.push(tournament);
      } else {
        groupedTournaments.push({
          group: tournament.name[0],
          tournaments: [tournament]
        });
      };
    });
    setGroups(groupedTournaments);
  };

  function sortByState() {
    const sortedTournaments = [];
    groups.forEach(group => sortedTournaments.push(...group.tournaments));
    if (sorting.category === "state") {
      if (sorting.type === "ASC") {
        sortedTournaments.sort((a, b) => {
          if (a.state > b.state) return -1;
          if (a.state < b.state) return 1;
          return 0;
        });
        setSorting({ ...sorting, type: "DESC" });
      } else {
        sortedTournaments.sort((a, b) => {
          if (a.state < b.state) return -1;
          if (a.state > b.state) return 1;
          return 0;
        });
        setSorting({ ...sorting, type: "ASC" });
      };
    } else {
      sortedTournaments.sort((a, b) => {
        if (a.state < b.state) return -1;
        if (a.state > b.state) return 1;
        return 0;
      });
      setSorting({ category: "state", type: "ASC" });
    };
    const groupedTournaments = [];
    sortedTournaments.forEach(tournament => {
      const currentGroup = groupedTournaments[groupedTournaments.length - 1]?.group;
      if (currentGroup === tournament.state) {
        groupedTournaments[groupedTournaments.length - 1].tournaments.push(tournament);
      } else {
        groupedTournaments.push({
          group: tournament.state,
          tournaments: [tournament]
        });
      };
    });
    setGroups(groupedTournaments);
  };

  function sortByDate() {
    const sortedTournaments = [];
    groups.forEach(group => sortedTournaments.push(...group.tournaments));
    if (sorting.category === "date") {
      if (sorting.type === "ASC") {
        sortedTournaments.sort((a, b) => {
          const dateA = new Date(`20${a.date.split("-")[0].trim().slice(6, 8)}`, a.date.split("-")[0].trim().slice(0, 2) - 1, a.date.split("-")[0].trim().slice(3, 5));
          const dateB = new Date(`20${b.date.split("-")[0].trim().slice(6, 8)}`, b.date.split("-")[0].trim().slice(0, 2) - 1, b.date.split("-")[0].trim().slice(3, 5));
          return dateB - dateA;
        });
        setSorting({ ...sorting, type: "DESC" });
      } else {
        sortedTournaments.sort((a, b) => {
          const dateA = new Date(`20${a.date.split("-")[0].trim().slice(6, 8)}`, a.date.split("-")[0].trim().slice(0, 2) - 1, a.date.split("-")[0].trim().slice(3, 5));
          const dateB = new Date(`20${b.date.split("-")[0].trim().slice(6, 8)}`, b.date.split("-")[0].trim().slice(0, 2) - 1, b.date.split("-")[0].trim().slice(3, 5));
          return dateA - dateB;
        });
        setSorting({ ...sorting, type: "ASC" });
      };
    } else {
      sortedTournaments.sort((a, b) => {
        const dateA = new Date(`20${a.date.split("-")[0].trim().slice(6, 8)}`, a.date.split("-")[0].trim().slice(0, 2) - 1, a.date.split("-")[0].trim().slice(3, 5));
        const dateB = new Date(`20${b.date.split("-")[0].trim().slice(6, 8)}`, b.date.split("-")[0].trim().slice(0, 2) - 1, b.date.split("-")[0].trim().slice(3, 5));
        return dateA - dateB;
      });
      setSorting({ category: "date", type: "ASC" });
    };
    const groupedTournaments = [];
    sortedTournaments.forEach(tournament => {
      const currentGroup = groupedTournaments[groupedTournaments.length - 1]?.group;
      if (currentGroup === `${tournament.date.split("-")[0].trim().slice(0, 2)}/${tournament.date.split("-")[0].trim().slice(6)}`) {
        groupedTournaments[groupedTournaments.length - 1].tournaments.push(tournament);
      } else {
        groupedTournaments.push({
          group: `${tournament.date.split("-")[0].trim().slice(0, 2)}/${tournament.date.split("-")[0].trim().slice(6)}`,
          tournaments: [tournament]
        });
      };
    });
    setGroups(groupedTournaments);
  };

  function updateFavorites(tournamentId) {
    const updatedFavorites = { ...favorites };
    if (updatedFavorites[tournamentId] != undefined) {
      delete updatedFavorites[tournamentId]
    } else {
      updatedFavorites[tournamentId] = tournamentId
    };
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return setFavorites(updatedFavorites);
  };

  if (!groups.length) {
    return (
        <main className="loading">
            <img className="gif" src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmc0bGduamJqb3V1d2E3YW1nNHBhaTczdzA2bXEyMWgwbXc5eHhoMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41lIvPtFdU3cLQjK/giphy.gif"}></img>
        </main>
    );
};

  return (
    <main className="all-tournaments">
      <section className="filters">
        <div className="input-filter">
          <input type="text" placeholder="Search tournaments" onChange={e => setFilterText(e.target.value)} />
        </div>
        <div className="sorting-buttons">
          <button onClick={sortByName} className={`${sorting.category === "name" ? "active" : ""}`}>
            {sorting.category === "name" && sorting.type === "ASC" && <i className="fa-solid fa-arrow-down-a-z" />}
            {sorting.category === "name" && sorting.type === "DESC" && <i className="fa-solid fa-arrow-down-z-a" />}
            Sort by name
          </button>
          <button onClick={sortByState} className={`${sorting.category === "state" ? "active" : ""}`}>
            {sorting.category === "state" && sorting.type === "ASC" && <i className="fa-solid fa-arrow-down-a-z" />}
            {sorting.category === "state" && sorting.type === "DESC" && <i className="fa-solid fa-arrow-down-z-a" />}
            Sort by state
          </button>
          <button onClick={sortByDate} className={`${sorting.category === "date" ? "active" : ""}`}>
            {sorting.category === "date" && sorting.type === "ASC" && <i className="fa-solid fa-arrow-down-1-9" />}
            {sorting.category === "date" && sorting.type === "DESC" && <i className="fa-solid fa-arrow-down-9-1" />}
            Sort by date
          </button>
        </div>
      </section>
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
          groups.map(group => group.tournaments.filter(tournament => favorites[tournament.id] != undefined).map(tournament => (
            <div key={tournament.id} className="card">
              <div className="card-section card-main">
                <div className="card-subsection">
                  {
                    favorites[tournament.id] != undefined ? <i className="fa-solid fa-star" onClick={() => updateFavorites(tournament.id)} /> : <i className="fa-regular fa-star" onClick={() => updateFavorites(tournament.id)} />
                  }
                </div>
                <div className="card-subsection">
                  <Link href={`/tournament/${tournament.url}#${tournament.state}#${tournament.city}#${tournament.date}`}>{tournament.name}</Link>
                </div>
              </div>
            </div>
          )))
        }
      </section>
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
                        <Link href={`/tournament/${tournament.url}#${tournament.pdf}#${tournament.state}#${tournament.city}#${tournament.date}`}>{tournament.name}</Link>
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
    </main>
  );
};
