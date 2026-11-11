import { STATUSES } from "../data.js";

export default function StatusBadge({ status }) {
  const label = STATUSES.find((s) => s.key === status)?.label ?? status;
  return <span className={`badge badge-${status}`}>{label}</span>;
}
