"use client";
import "./style.css";
import { useEffect, useState } from "react";
import { Favorites } from "./(components)/Favorites";
import { Filters } from "./(components)/Filters";
import { GroupsList } from "./(components)/GroupsList";
import { Loading } from "./(components)/Loading";
import { Menu } from "./(components)/Menu";

export default function Home() {
  const [groups, setGroups] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [favorites, setFavorites] = useState({});
  const [expandFavorites, setExpandFavorites] = useState(true);
  const [viewMoreLess, setViewMoreLess] = useState(null);
  const [myRating, setMyRating] = useState(null);
  const [loadingRating, setLoadingRating] = useState(true);

  useEffect(() => {
    const localPlayerId = localStorage.getItem("playerId");
    const fetchPlayerData = async () => {
      const response = await fetch(`/api/usatt/player-profile/${localPlayerId}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await response.json();
      setLoadingRating(false);
      setMyRating(data.rating);
    };
    if (localPlayerId) {
      fetchPlayerData();
    } else {
      setLoadingRating(false);
    };

    const localStorageFavorites = localStorage.getItem("favorites");
    if (localStorageFavorites) {
      setFavorites(JSON.parse(localStorageFavorites));
    } else {
      localStorage.setItem("favorites", JSON.stringify({}));
    };
    const fetchTournamentsData = async () => {
      const response = await fetch('/api/tournaments', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await response.json();
      setGroups(data);
    };
    fetchTournamentsData();
  }, []);

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

  if (!groups.length || loadingRating) return <Loading />;

  return (
    <main className="all-tournaments">
      <Menu setMyRating={setMyRating} myRating={myRating} />
      <Filters setFilterText={setFilterText} />
      <Favorites groups={groups} expandFavorites={expandFavorites} setExpandFavorites={setExpandFavorites} favorites={favorites} updateFavorites={updateFavorites} />
      <GroupsList groups={groups} filterText={filterText} viewMoreLess={viewMoreLess} setViewMoreLess={setViewMoreLess} favorites={favorites} updateFavorites={updateFavorites} />
    </main>
  );
};
