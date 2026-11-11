import { useState } from "react";
import { COURIERS } from "../data.js";

const empty = {
  courier: COURIERS[0], sender: "", recipient: "",
  origin: "", destination: "", weightKg: "",
};

export default function NewShipmentForm({ onCreate, onClose }) {
  const [f, setF] = useState(empty);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onCreate({ ...f, weightKg: Number(f.weightKg) || 0 });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal form" onSubmit={submit} onClick={(e) => e.stopPropagation()}>
        <h2>New shipment</h2>
        <label>Courier
          <select value={f.courier} onChange={set("courier")}>
            {COURIERS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Sender
          <input required value={f.sender} onChange={set("sender")} />
        </label>
        <label>Recipient
          <input required value={f.recipient} onChange={set("recipient")} />
        </label>
        <label>Origin
          <input required value={f.origin} onChange={set("origin")} />
        </label>
        <label>Destination
          <input required value={f.destination} onChange={set("destination")} />
        </label>
        <label>Weight (kg)
          <input type="number" min="0" step="0.1" value={f.weightKg} onChange={set("weightKg")} />
        </label>
        <div className="row">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" className="primary">Create</button>
        </div>
      </form>
    </div>
  );
}
