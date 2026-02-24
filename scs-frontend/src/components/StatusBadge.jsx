import { statusClass, statusLabel } from '../utils/helpers';

export default function StatusBadge({ status }) {
  return <span className={statusClass(status)}>{statusLabel(status)}</span>;
}
