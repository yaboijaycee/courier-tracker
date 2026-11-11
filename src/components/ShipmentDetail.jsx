import StatusBadge from "./StatusBadge.jsx";
import { STATUSES } from "../data.js";

const fmt = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });

export default function ShipmentDetail({ shipment }) {
  const steps = STATUSES.filter((s) => s.key !== "exception");
  const progressIdx = steps.findIndex((s) => s.key === shipment.status);

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
    </div>
  );
}
