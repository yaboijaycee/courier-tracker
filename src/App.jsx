import { useState } from "react";
import { seedShipments } from "./data.js";
import ShipmentList from "./components/ShipmentList.jsx";
import ShipmentDetail from "./components/ShipmentDetail.jsx";

export default function App() {
  const [shipments] = useState(seedShipments);
  const [selectedId, setSelectedId] = useState(shipments[0]?.id ?? null);

  const selected = shipments.find((s) => s.id === selectedId);

  return (
    <div className="app">
      <header className="topbar">
        <h1>📦 Courier Tracker</h1>
      </header>

      <main className="layout">
        <aside className="panel">
          <ShipmentList shipments={shipments} selectedId={selectedId} onSelect={setSelectedId} />
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
