import Link from "next/link";

export default function PlayerWatch() {
    return (
        <main>
            <section className="player-watch-header">
                <div>
                    <Link href="/" className="back-link"><i className="fa-solid fa-chevron-left" /> Back</Link>
                </div>
                <div className="in-development">
                    <h1>In development</h1>
                </div>
            </section>
        </main>
    );
};