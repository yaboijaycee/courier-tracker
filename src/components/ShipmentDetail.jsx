import StatusBadge from "./StatusBadge.jsx";

export default function ShipmentDetail({ shipment }) {
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
    </div>
  );
}
