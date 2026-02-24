/**
 * Format an ISO date string to a readable local format.
 */
export function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * Format an ISO date string to readable date + time.
 */
export function formatDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

/**
 * Return CSS class name for a complaint status.
 */
export function statusClass(status) {
  switch (status) {
    case 'PENDING':     return 'badge badge-pending';
    case 'IN_PROGRESS': return 'badge badge-progress';
    case 'RESOLVED':    return 'badge badge-resolved';
    default:            return 'badge badge-default';
  }
}

/**
 * Human-readable status label.
 */
export function statusLabel(status) {
  switch (status) {
    case 'PENDING':     return 'Pending';
    case 'IN_PROGRESS': return 'In Progress';
    case 'RESOLVED':    return 'Resolved';
    default:            return status;
  }
}
