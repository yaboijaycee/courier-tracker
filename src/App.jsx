import { useEffect, useMemo, useState } from "react";
import { STATUSES, seedShipments } from "./data.js";
import ShipmentList from "./components/ShipmentList.jsx";
import ShipmentDetail from "./components/ShipmentDetail.jsx";
import NewShipmentForm from "./components/NewShipmentForm.jsx";

const STORAGE_KEY = "courier-tracker:shipments";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seedShipments;
}

export default function App() {
  const [shipments, setShipments] = useState(load);
  const [selectedId, setSelectedId] = useState(shipments[0]?.id ?? null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
    } catch {}
  }, [shipments]);

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

  const createShipment = (data) => {
    const id = `CT-${Date.now().toString().slice(-6)}`;
    const shipment = {
      id, ...data, status: "created",
      events: [{
        status: "created", location: data.origin,
        note: "Shipment label created", at: new Date().toISOString(),
      }],
    };
    setShipments((prev) => [shipment, ...prev]);
    setSelectedId(id);
  };

  const addEvent = (id, ev) =>
    setShipments((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: ev.status, events: [...s.events, { ...ev, at: new Date().toISOString() }] }
          : s
      )
    );

  const deleteShipment = (id) => {
    setShipments((prev) => prev.filter((s) => s.id !== id));
    setSelectedId(null);
  };

  return (
    <div className="app">
      <header className="topbar">
        <h1>📦 Courier Tracker</h1>
        <button className="primary" onClick={() => setShowForm(true)}>+ New shipment</button>
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
              onAddEvent={addEvent}
              onDelete={deleteShipment}
            />
          ) : (
            <p className="empty">Select a shipment to see details.</p>
          )}
        </section>
      </main>

      {showForm && (
        <NewShipmentForm onCreate={createShipment} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
