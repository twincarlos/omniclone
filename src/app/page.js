"use client";

import { useEffect, useState } from "react";
import "./style.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [sorting, setSorting] = useState({ category: null, type: null });
  const [favorites, setFavorites] = useState({});
  const [expandFavorites, setExpandFavorites] = useState(true);

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
      setEvents(data);
    };

    fetchData();
  }, []);

  function sortByName() {
    const sortedEvents = [...events];
    if (sorting.category === "name") {
      if (sorting.type === "ASC") {
        sortedEvents.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
        setSorting({ ...sorting, type: "DESC" });
      } else {
        sortedEvents.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        setSorting({ ...sorting, type: "ASC" });
      };
    } else {
      sortedEvents.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setSorting({ category: "name", type: "ASC" });
    };
    setEvents(sortedEvents);
  };

  function sortByState() {
    const sortedEvents = [...events];
    if (sorting.category === "state") {
      if (sorting.type === "ASC") {
        sortedEvents.sort((a, b) => {
          if (a.state > b.state) return -1;
          if (a.state < b.state) return 1;
          return 0;
        });
        setSorting({ ...sorting, type: "DESC" });
      } else {
        sortedEvents.sort((a, b) => {
          if (a.state < b.state) return -1;
          if (a.state > b.state) return 1;
          return 0;
        });
        setSorting({ ...sorting, type: "ASC" });
      };
    } else {
      sortedEvents.sort((a, b) => {
        if (a.state < b.state) return -1;
        if (a.state > b.state) return 1;
        return 0;
      });
      setSorting({ category: "state", type: "ASC" });
    };
    setEvents(sortedEvents);
  };

  function sortByDate() {
    const sortedEvents = [...events];
    if (sorting.category === "date") {
      if (sorting.type === "ASC") {
        sortedEvents.sort((a, b) => {
          const dateA = new Date(`20${a.date.split("-")[0].trim().slice(6, 8)}`, a.date.split("-")[0].trim().slice(0, 2) - 1, a.date.split("-")[0].trim().slice(3, 5));
          const dateB = new Date(`20${b.date.split("-")[0].trim().slice(6, 8)}`, b.date.split("-")[0].trim().slice(0, 2) - 1, b.date.split("-")[0].trim().slice(3, 5));
          return dateB - dateA;
        });
        setSorting({ ...sorting, type: "DESC" });
      } else {
        sortedEvents.sort((a, b) => {
          const dateA = new Date(`20${a.date.split("-")[0].trim().slice(6, 8)}`, a.date.split("-")[0].trim().slice(0, 2) - 1, a.date.split("-")[0].trim().slice(3, 5));
          const dateB = new Date(`20${b.date.split("-")[0].trim().slice(6, 8)}`, b.date.split("-")[0].trim().slice(0, 2) - 1, b.date.split("-")[0].trim().slice(3, 5));
          return dateA - dateB;
        });
        setSorting({ ...sorting, type: "ASC" });
      };
    } else {
      sortedEvents.sort((a, b) => {
        const dateA = new Date(`20${a.date.split("-")[0].trim().slice(6, 8)}`, a.date.split("-")[0].trim().slice(0, 2) - 1, a.date.split("-")[0].trim().slice(3, 5));
        const dateB = new Date(`20${b.date.split("-")[0].trim().slice(6, 8)}`, b.date.split("-")[0].trim().slice(0, 2) - 1, b.date.split("-")[0].trim().slice(3, 5));
        return dateA - dateB;
      });
      setSorting({ category: "date", type: "ASC" });
    };
    setEvents(sortedEvents);
  };

  function updateFavorites(eventId) {
    const updatedFavorites = { ...favorites };
    if (updatedFavorites[eventId] != undefined) {
      delete updatedFavorites[eventId]
    } else {
      updatedFavorites[eventId] = eventId
    };
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return setFavorites(updatedFavorites);
  };

  if (!events.length) {
    return null;
  };

  return (
    <main>
      <input type="text" placeholder="Search events" onChange={e => setFilterText(e.target.value)} />
      <div className="sorting-buttons">
        <button onClick={sortByName} className={`${sorting.category === "name" ? "active" : ""}`}>
          {
            sorting.category === "name" && sorting.type === "ASC" && <i className="fa-solid fa-arrow-down-a-z" />
          }
          {
            sorting.category === "name" && sorting.type === "DESC" && <i className="fa-solid fa-arrow-down-z-a" />
          }
          Sort by name
        </button>
        <button onClick={sortByState} className={`${sorting.category === "state" ? "active" : ""}`}>
          {
            sorting.category === "state" && sorting.type === "ASC" && <i className="fa-solid fa-arrow-down-a-z" />
          }
          {
            sorting.category === "state" && sorting.type === "DESC" && <i className="fa-solid fa-arrow-down-z-a" />
          }
          Sort by state
        </button>
        <button onClick={sortByDate} className={`${sorting.category === "date" ? "active" : ""}`}>
          {
            sorting.category === "date" && sorting.type === "ASC" && <i className="fa-solid fa-arrow-down-1-9" />
          }
          {
            sorting.category === "date" && sorting.type === "DESC" && <i className="fa-solid fa-arrow-down-9-1" />
          }
          Sort by date
        </button>
      </div>
      <div className="events-list favorite-events-list">
        <div className="favorites-header">
          {
            expandFavorites ? <i className="fa-solid fa-chevron-down" onClick={() => setExpandFavorites(false)} /> : <i className="fa-solid fa-chevron-up" onClick={() => setExpandFavorites(true)} />
          }
          <h2>Favorites</h2>
        </div>
        {
          expandFavorites &&
          events.filter(event => favorites[event.id] != undefined).map(event => (
            <div key={event.id} className="card">
              <div className="card-main">
                {
                  favorites[event.id] != undefined ? <i className="fa-solid fa-heart" onClick={() => updateFavorites(event.id)} /> : <i className="fa-regular fa-heart" onClick={() => updateFavorites(event.id)} />
                }
                <h3>{event.name}</h3>
              </div>
            </div>
          ))
        }
      </div>
      <div className="events-list">
        {
          events.filter(event => 
            (favorites[event.id] === undefined) &&
            (
              event.name.toLowerCase().includes(filterText.toLowerCase()) ||
              event.state.toLowerCase().includes(filterText.toLowerCase()) ||
              event.city.toLowerCase().includes(filterText.toLowerCase())
            )
          ).map(event => (
            <div key={event.id} className="card">
              <div className="card-header">
                {
                  favorites[event.id] != undefined ? <i className="fa-solid fa-heart" onClick={() => updateFavorites(event.id)} /> : <i className="fa-regular fa-heart" onClick={() => updateFavorites(event.id)} />
                }
                <div>{event.state}</div>
                <div>{event.city}</div>
              </div>
              <div className="card-main">
                <h2>{event.name}</h2>
              </div>
              <div className="card-footer">
                <div className={`status ${event.status.toLowerCase()}`}>{event.status}</div>
                <div>{event.date}</div>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  );
};
