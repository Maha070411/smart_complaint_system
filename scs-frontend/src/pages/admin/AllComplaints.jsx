import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/Spinner';
import { adminService } from '../../services/api';
import { formatDate, statusLabel } from '../../utils/helpers';

const CATEGORIES = ['All', 'Hostel', 'Academics', 'Infrastructure', 'Administration', 'Food', 'Transport', 'IT Support', 'Other'];
const STATUSES = ['All', 'PENDING', 'IN_PROGRESS', 'RESOLVED'];
const PAGE_SIZE = 8;

export default function AllComplaints() {
  const [complaints,    setComplaints]    = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [filterStatus,  setFilterStatus]  = useState('All');
  const [filterCategory,setFilterCategory]= useState('All');
  const [page,          setPage]          = useState(0);
  const [totalPages,    setTotalPages]    = useState(1);

  // Update modal
  const [updateModal,   setUpdateModal]   = useState(null);
  const [updateForm,    setUpdateForm]    = useState({ status: '', resolutionNote: '' });
  const [updateError,   setUpdateError]   = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: PAGE_SIZE };
      if (filterStatus   !== 'All') params.status   = filterStatus;
      if (filterCategory !== 'All') params.category = filterCategory;

      const res  = await adminService.getAllComplaints(params);
      const data = res.data;

      if (data.content) {
        setComplaints(data.content);
        setTotalPages(data.totalPages || 1);
      } else {
        setComplaints(Array.isArray(data) ? data : []);
        setTotalPages(1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterCategory, page]);

  useEffect(() => { setPage(0); }, [filterStatus, filterCategory]);
  useEffect(() => { fetchComplaints(); }, [fetchComplaints]);

  const openUpdateModal = (c) => {
    setUpdateModal(c);
    setUpdateForm({ status: c.status, resolutionNote: c.resolutionNote || '' });
    setUpdateError('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (updateForm.status === 'RESOLVED' && !updateForm.resolutionNote.trim()) {
      setUpdateError('Resolution note is required when status is RESOLVED.');
      return;
    }
    setUpdateLoading(true);
    try {
      await adminService.updateComplaint(updateModal.id, {
        status:         updateForm.status,
        resolutionNote: updateForm.resolutionNote,
      });
      setUpdateModal(null);
      fetchComplaints();
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Update failed. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h2>All Complaints</h2>
        <span className="text-muted">{complaints.length} shown</span>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Statuses' : s.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Category</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? <Spinner /> : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {['ID', 'User', 'Complaint', 'Category', 'Status', 'Date', 'Action'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                    No complaints found.
                  </td>
                </tr>
              ) : complaints.map((c) => (
                <tr key={c.id}>
                  <td className="text-muted" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>#{c.id}</td>
                  <td style={{ fontWeight: 600 }}>{c.userName || c.user?.name || '—'}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{c.title}</div>
                    <div className="text-muted" style={{ fontSize: '0.78rem', marginTop: 2 }}>
                      {c.description?.slice(0, 60)}{c.description?.length > 60 ? '…' : ''}
                    </div>
                  </td>
                  <td>{c.category}</td>
                  <td><StatusBadge status={c.status} /></td>
                  <td className="text-muted" style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>
                    {formatDate(c.createdAt)}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                      onClick={() => openUpdateModal(c)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button className="btn" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                ← Prev
              </button>
              <span className="text-muted">Page {page + 1} of {totalPages}</span>
              <button className="btn" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>
                Next →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Update Modal */}
      {updateModal && (
        <div className="modal-backdrop" onClick={() => setUpdateModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Update Complaint</h3>
            <div className="modal-sub" style={{ marginBottom: 16 }}>{updateModal.title}</div>

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={updateForm.status}
                  onChange={(e) => { setUpdateForm({ ...updateForm, status: e.target.value }); setUpdateError(''); }}>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Resolution Note{updateForm.status === 'RESOLVED' && <span className="required"> *</span>}
                </label>
                <textarea
                  rows={4}
                  value={updateForm.resolutionNote}
                  onChange={(e) => setUpdateForm({ ...updateForm, resolutionNote: e.target.value })}
                  placeholder={updateForm.status === 'RESOLVED'
                    ? 'Required: describe how this was resolved…'
                    : 'Optional note…'}
                />
              </div>

              {updateError && <div className="alert alert-error">{updateError}</div>}

              <div className="modal-actions">
                <button type="button" className="btn" onClick={() => setUpdateModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={updateLoading}>
                  {updateLoading ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
