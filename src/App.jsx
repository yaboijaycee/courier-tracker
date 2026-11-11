import { useMemo, useState } from "react";
import { STATUSES, seedShipments } from "./data.js";
import ShipmentList from "./components/ShipmentList.jsx";
import ShipmentDetail from "./components/ShipmentDetail.jsx";

export default function App() {
  const [shipments] = useState(seedShipments);
  const [selectedId, setSelectedId] = useState(shipments[0]?.id ?? null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shipments.filter((s) => {
      if (filter !== "all" && s.status !== filter) return false;
      if (!q) return true;
      return [s.id, s.recipient, s.sender, s.courier, s.origin, s.destination]
        .join(" ").toLowerCase().includes(q);
    });
  }, [shipments, query, filter]);

  const counts = useMemo(() => {
    const c = { all: shipments.length };
    STATUSES.forEach((s) => (c[s.key] = shipments.filter((x) => x.status === s.key).length));
    return c;
  }, [shipments]);

  const selected = shipments.find((s) => s.id === selectedId);

  return (
    <div className="app">
      <header className="topbar">
        <h1>📦 Courier Tracker</h1>
      </header>

      <section className="stats">
        {[{ key: "all", label: "All" }, ...STATUSES].map((s) => (
          <button
            key={s.key}
            className={`stat ${filter === s.key ? "active" : ""}`}
            onClick={() => setFilter(s.key)}
          >
            <span className="stat-n">{counts[s.key]}</span>
            <span className="stat-l">{s.label}</span>
          </button>
        ))}
      </section>

      <main className="layout">
        <aside className="panel">
          <input
            className="search"
            placeholder="Search tracking no., name, city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ShipmentList shipments={visible} selectedId={selectedId} onSelect={setSelectedId} />
        </aside>
        <section className="panel">
          {selected ? (
            <ShipmentDetail
              key={selected.id}
              shipment={selected}
              onAddEvent={() => {}}
              onDelete={() => {}}
            />
          ) : (
            <p className="empty">Select a shipment to see details.</p>
          )}
        </section>
      </main>
    </div>
  );
}
