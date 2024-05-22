"use client";

import { useEffect, useState } from "react";
import "./style.css";

export default function Home() {
  const [groups, setGroups] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [sorting, setSorting] = useState({ category: "state", type: "ASC" });
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
      data.sort((a, b) => {
        if (a.state < b.state) return -1;
        if (a.state > b.state) return 1;
        return 0;
      });
      const groupedEvents = [];
      data.forEach(event => {
        const currentGroup = groupedEvents[groupedEvents.length - 1]?.group;
        if (currentGroup === event.state) {
          groupedEvents[groupedEvents.length - 1].events.push(event);
        } else {
          groupedEvents.push({
            group: event.state,
            events: [event]
          });
        };
      });
      setGroups(groupedEvents);
    };

    fetchData();
  }, []);

  function sortByName() {
    const sortedEvents = [];
    groups.forEach(group => sortedEvents.push(...group.events));
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
    const groupedEvents = [];
    sortedEvents.forEach(event => {
      const currentGroup = groupedEvents[groupedEvents.length - 1]?.group;
      if (currentGroup === event.name[0]) {
        groupedEvents[groupedEvents.length - 1].events.push(event);
      } else {
        groupedEvents.push({
          group: event.name[0],
          events: [event]
        });
      };
    });
    setGroups(groupedEvents);
  };

  function sortByState() {
    const sortedEvents = [];
    groups.forEach(group => sortedEvents.push(...group.events));
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
    const groupedEvents = [];
    sortedEvents.forEach(event => {
      const currentGroup = groupedEvents[groupedEvents.length - 1]?.group;
      if (currentGroup === event.state) {
        groupedEvents[groupedEvents.length - 1].events.push(event);
      } else {
        groupedEvents.push({
          group: event.state,
          events: [event]
        });
      };
    });
    setGroups(groupedEvents);
  };

  function sortByDate() {
    const sortedEvents = [];
    groups.forEach(group => sortedEvents.push(...group.events));
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
    const groupedEvents = [];
    sortedEvents.forEach(event => {
      const currentGroup = groupedEvents[groupedEvents.length - 1]?.group;
      if (currentGroup === `${event.date.split("-")[0].trim().slice(0, 2)}/${event.date.split("-")[0].trim().slice(6)}`) {
        groupedEvents[groupedEvents.length - 1].events.push(event);
      } else {
        groupedEvents.push({
          group: `${event.date.split("-")[0].trim().slice(0, 2)}/${event.date.split("-")[0].trim().slice(6)}`,
          events: [event]
        });
      };
    });
    setGroups(groupedEvents);
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

  if (!groups.length) {
    return null;
  };

  return (
    <main>
      <div className="filters">
        <div className="input-filter">
          <input type="text" placeholder="Search events" onChange={e => setFilterText(e.target.value)} />
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
      </div>
      <div className="favorites-list events-list">
        <div className="card-section card-header">
          <div className="card-subsection">
            {expandFavorites ? <i className="fa-solid fa-chevron-down" onClick={() => setExpandFavorites(false)} /> : <i className="fa-solid fa-chevron-up" onClick={() => setExpandFavorites(true)} />}
          </div>
          <div className="card-subsection">
            <p>Favorites</p>
          </div>
        </div>
        {
          expandFavorites &&
          groups.map(group => group.events.filter(event => favorites[event.id] != undefined).map(event => (
            <div key={event.id} className="card">
              <div className="card-section card-main">
                <div className="card-subsection">
                  {
                    favorites[event.id] != undefined ? <i className="fa-solid fa-heart" onClick={() => updateFavorites(event.id)} /> : <i className="fa-regular fa-heart" onClick={() => updateFavorites(event.id)} />
                  }
                </div>
                <div className="card-subsection">
                  <p>{event.name}</p>
                </div>
              </div>
            </div>
          )))
        }
      </div>
      <div className="events-list">
        {
          groups.map((group, index) => group.events.filter(event =>
            (favorites[event.id] === undefined) &&
            (
              event.name.toLowerCase().includes(filterText.toLowerCase()) ||
              event.state.toLowerCase().includes(filterText.toLowerCase()) ||
              event.city.toLowerCase().includes(filterText.toLowerCase())
            )).length ? (
              <div className="group" key={index}>
                <div className="group-header">
                  <h2>{group.group}</h2>
                </div>
                {
                  group.events.filter(event =>
                    (favorites[event.id] === undefined) &&
                    (
                      event.name.toLowerCase().includes(filterText.toLowerCase()) ||
                      event.state.toLowerCase().includes(filterText.toLowerCase()) ||
                      event.city.toLowerCase().includes(filterText.toLowerCase())
                    )
                  ).map(event => (
                    <div key={event.id} className="card">
                      <div className="card-section card-header">
                        <div className="card-subsection">
                          {favorites[event.id] != undefined ? <i className="fa-solid fa-heart" onClick={() => updateFavorites(event.id)} /> : <i className="fa-regular fa-heart" onClick={() => updateFavorites(event.id)} />}
                        </div>
                        <div className="card-subsection">
                          <p>{event.state}</p>
                        </div>
                        <div className="card-subsection">
                          <p>{event.city}</p>
                        </div>
                      </div>
                      <div className="card-section card-main">
                        <div className="card-subsection">
                          <p>{event.name}</p>
                        </div>
                      </div>
                      <div className="card-section card-footer">
                        <div className={`card-subsection status ${event.status.toLowerCase()}`}>
                          <p>{event.status}</p>
                        </div>
                        <div className="card-subsection">
                          <p>{event.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }

              </div>
            ) : null)
        }
      </div>
    </main>
  );
};
