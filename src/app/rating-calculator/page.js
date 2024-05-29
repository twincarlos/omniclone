import Link from "next/link";

export default function RatingCalculator() {
    return (
        <main>
            <section className="rating-calculator-header">
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