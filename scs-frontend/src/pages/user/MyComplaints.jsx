import { useEffect, useState } from 'react';
import UserLayout from '../../layouts/UserLayout';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/Spinner';
import { userService } from '../../services/api';
import { formatDate, formatDateTime } from '../../utils/helpers';

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await userService.getMyComplaints();
        setComplaints(res.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <UserLayout>
      <div className="page-header">
        <h2>My Complaints</h2>
        <span className="text-muted">{complaints.length} total</span>
      </div>

      {loading ? <Spinner /> : complaints.length === 0 ? (
        <div className="empty-state card">
          <div style={{ fontSize: '2.5rem' }}>📦</div>
          <p>No complaints found. Try creating one!</p>
        </div>
      ) : (
        <div className="complaint-grid">
          {complaints.map((c) => (
            <div key={c.id} className="complaint-card" onClick={() => setSelected(c)}>
              <div className="complaint-card-header">
                <div className="complaint-card-title">{c.title}</div>
                <StatusBadge status={c.status} />
              </div>
              <div className="complaint-card-meta">
                {c.category} • {formatDate(c.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <h3>{selected.title}</h3>
              <StatusBadge status={selected.status} />
            </div>
            <div className="modal-sub">{selected.category}</div>

            <div className="form-group">
              <label>About</label>
              <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>{selected.description}</p>
            </div>

            {selected.resolutionNote && (
              <div className="resolution-box">
                <div className="res-label">Resolution Note</div>
                <p>{selected.resolutionNote}</p>
              </div>
            )}

            <p className="text-muted mt-4">Created: {formatDateTime(selected.createdAt)}</p>
            {selected.updatedAt && <p className="text-muted">Updated: {formatDateTime(selected.updatedAt)}</p>}

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
