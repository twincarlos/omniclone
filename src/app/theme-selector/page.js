"use client";
import Link from "next/link";
import "../style.css";
import { useTheme } from "next-themes";

export default function ThemeSelector() {
    const { theme, setTheme } = useTheme();
    function handleOptionChange(e) {
        setTheme(e.target.value);
    };
    return (
        <main>
            <section className="theme-selector-header">
                <div>
                    <Link href="/" className="back-link"><i className="fa-solid fa-chevron-left" /> Back</Link>
                </div>
                <div className="in-development">
                    <h1>In development</h1>
                </div>
                <div className="theme-options">
                    <label>
                        <input
                            type="radio"
                            value="blue"
                            checked={theme === "blue"}
                            onChange={handleOptionChange}
                        />
                        Blue (default)
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="red"
                            checked={theme === "red"}
                            onChange={handleOptionChange}
                        />
                        Red
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="green"
                            checked={theme === "green"}
                            onChange={handleOptionChange}
                        />
                        Green
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="black-and-white"
                            checked={theme === "black-and-white"}
                            onChange={handleOptionChange}
                        />
                        Black and White
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="gradient-1"
                            checked={theme === "gradient-1"}
                            onChange={handleOptionChange}
                        />
                        Gradient 1
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="gradient-2"
                            checked={theme === "gradient-2"}
                            onChange={handleOptionChange}
                        />
                        Gradient 2
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="gradient-3"
                            checked={theme === "gradient-3"}
                            onChange={handleOptionChange}
                        />
                        Gradient 3
                    </label>
                </div>
            </section>
        </main>
    );
};