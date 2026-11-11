import { useState } from "react";
import StatusBadge from "./StatusBadge.jsx";
import { STATUSES } from "../data.js";

const fmt = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });

export default function ShipmentDetail({ shipment, onAddEvent, onDelete }) {
  const [status, setStatus] = useState(shipment.status);
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const steps = STATUSES.filter((s) => s.key !== "exception");
  const progressIdx = steps.findIndex((s) => s.key === shipment.status);

  const submit = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    onAddEvent(shipment.id, { status, location: location.trim(), note: note.trim() });
    setLocation("");
    setNote("");
  };

  return (
    <div className="detail">
      <div className="row">
        <h2>{shipment.id}</h2>
        <StatusBadge status={shipment.status} />
      </div>
      <p className="meta">{shipment.courier} · {shipment.weightKg} kg</p>
      <p>
        <strong>{shipment.sender}</strong> → <strong>{shipment.recipient}</strong>
        <br />
        {shipment.origin} → {shipment.destination}
      </p>

      {shipment.status !== "exception" && (
        <div className="progress">
          {steps.map((s, i) => (
            <div key={s.key} className={`step ${i <= progressIdx ? "done" : ""}`}>
              <span className="dot" />
              <span className="step-label">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      <h3>Tracking history</h3>
      <ol className="timeline">
        {[...shipment.events]
          .sort((a, b) => new Date(b.at) - new Date(a.at))
          .map((ev, i) => (
            <li key={i} className={`tl-${ev.status}`}>
              <div className="tl-time">{fmt(ev.at)}</div>
              <div>
                <strong>{ev.note || ev.status}</strong>
                <div className="meta">{ev.location}</div>
              </div>
            </li>
          ))}
      </ol>

      <h3>Add update</h3>
      <form className="form" onSubmit={submit}>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>
        <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
        <button type="submit" className="primary">Add update</button>
      </form>

      <button className="danger" onClick={() => onDelete(shipment.id)}>
        Delete shipment
      </button>
    </div>
  );
}
