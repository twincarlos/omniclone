export function Filters({ setFilterText, sorting }) {
    return (
        <section className="filters">
            <div className="input-filter">
                <input type="text" placeholder="Search tournaments" onChange={e => setFilterText(e.target.value)} />
            </div>
        </section>
    );
};