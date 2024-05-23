"use client";

import "./style.css";

import { useState } from "react";
import { Events } from "./Events";
import { Players } from "./Players";

export default function Event({ params }) {
    const [category, setCategory] = useState("Players");
    
    return (
        <main>
            <div className="tabs">
                <div className={`tab ${category === "Players" ? "tab-selected" : ""}`} onClick={() => setCategory("Players")}>Players</div>
                <div className={`tab ${category === "Events" ? "tab-selected" : ""}`} onClick={() => setCategory("Events")}>Events</div>
            </div>
            {
                category === "Players" ? <Players eventUrl={params.eventUrl} /> : <Events eventUrl={params.eventUrl} />
            }
        </main>
    );
};