import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserLayout from '../../layouts/UserLayout';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/Spinner';
import { userService } from '../../services/api';
import { formatDate } from '../../utils/helpers';

export default function UserDashboard() {
  const { user } = useAuth();
  const [stats, setStats]   = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [recent, setRecent] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await userService.getMyComplaints();
        const list = res.data;
        setStats({
          total:      list.length,
          pending:    list.filter((c) => c.status === 'PENDING').length,
          inProgress: list.filter((c) => c.status === 'IN_PROGRESS').length,
          resolved:   list.filter((c) => c.status === 'RESOLVED').length,
        });
        setRecent(list.slice(0, 5));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <UserLayout>
      {/* Welcome */}
      <div className="welcome-box">
        <h2>Welcome back, {user?.name} 👋</h2>
        <p>Here’s an overview of your complaints.</p>
        <div className="user-info-chip">
          👤 {user?.name}&nbsp;&nbsp;|&nbsp;&nbsp;ID: {user?.id}
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {[
          { label: 'Total',       value: stats.total,      cls: 'stat-total' },
          { label: 'Pending',     value: stats.pending,    cls: 'stat-pending' },
          { label: 'In Progress', value: stats.inProgress, cls: 'stat-progress' },
          { label: 'Resolved',    value: stats.resolved,   cls: 'stat-resolved' },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.cls}`}>
            <div className="stat-value">{loading ? '—' : s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent */}
      <div className="card">
        <div className="card-title" style={{ marginBottom: 14 }}>Recent Complaints</div>
        {loading ? <Spinner /> : recent.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '2.5rem' }}>📥</div>
            <p>No complaints yet. Create your first complaint!</p>
          </div>
        ) : (
          <div className="complaint-grid">
            {recent.map((c) => (
              <div key={c.id} className="complaint-card" onClick={() => setSelected(c)}>
                <div className="complaint-card-header">
                  <div className="complaint-card-title">{c.title}</div>
                  <StatusBadge status={c.status} />
                </div>
                <div className="complaint-card-meta">{c.category} • {formatDate(c.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h3>{selected.title}</h3>
                <div className="modal-sub">{selected.category}</div>
              </div>
              <StatusBadge status={selected.status} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>{selected.description}</p>
            </div>
            {selected.resolutionNote && (
              <div className="resolution-box">
                <div className="res-label">Resolution Note</div>
                <p>{selected.resolutionNote}</p>
              </div>
            )}
            <p className="text-muted mt-4">Created: {formatDate(selected.createdAt)}</p>
            {selected.updatedAt && <p className="text-muted">Updated: {formatDate(selected.updatedAt)}</p>}
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
