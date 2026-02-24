import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Spinner from '../../components/Spinner';
import { adminService } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.getAllComplaints({ page: 0, size: 1000 });
        const list = (res.data.content ?? res.data) || [];
        setStats({
          total:      list.length,
          pending:    list.filter((c) => c.status === 'PENDING').length,
          inProgress: list.filter((c) => c.status === 'IN_PROGRESS').length,
          resolved:   list.filter((c) => c.status === 'RESOLVED').length,
        });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const percent = (val) => stats.total ? Math.round((val / stats.total) * 100) : 0;

  return (
    <AdminLayout>
      <div className="page-header">
        <h2>Admin Dashboard</h2>
        <span className="text-muted">System overview</span>
      </div>

      {loading ? <Spinner /> : (
        <>
          <div className="stat-grid">
            {[
              { label: 'Total',       value: stats.total,      cls: 'stat-total' },
              { label: 'Pending',     value: stats.pending,    cls: 'stat-pending' },
              { label: 'In Progress', value: stats.inProgress, cls: 'stat-progress' },
              { label: 'Resolved',    value: stats.resolved,   cls: 'stat-resolved' },
            ].map((s) => (
              <div key={s.label} className={`stat-card ${s.cls}`}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-title" style={{ marginBottom: 16 }}>Complaint Distribution</div>
            {[
              { label: 'Pending',     val: stats.pending,    cls: 'fill-pending' },
              { label: 'In Progress', val: stats.inProgress, cls: 'fill-progress' },
              { label: 'Resolved',    val: stats.resolved,   cls: 'fill-resolved' },
            ].map((r) => (
              <div key={r.label} className="progress-row">
                <span className="progress-label">{r.label}</span>
                <div className="progress-track">
                  <div className={`progress-fill ${r.cls}`} style={{ width: `${percent(r.val)}%` }} />
                </div>
                <span className="progress-pct">{percent(r.val)}%</span>
              </div>
            ))}
          </div>
        </>
      )}
    </AdminLayout>
  );
}
