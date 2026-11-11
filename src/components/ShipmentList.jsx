import StatusBadge from "./StatusBadge.jsx";

export default function ShipmentList({ shipments, selectedId, onSelect }) {
  if (shipments.length === 0) {
    return <p className="empty">No shipments match your filters.</p>;
  }
  return (
    <ul className="shipment-list">
      {shipments.map((s) => (
        <li key={s.id}>
          <button
            className={`shipment-item ${s.id === selectedId ? "selected" : ""}`}
            onClick={() => onSelect(s.id)}
          >
            <div className="row">
              <strong>{s.id}</strong>
              <StatusBadge status={s.status} />
            </div>
            <div className="route">{s.origin} → {s.destination}</div>
            <div className="meta">{s.courier} · {s.recipient}</div>
          </button>
        </li>
      ))}
    </ul>
  );
}
