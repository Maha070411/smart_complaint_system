import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import { userService } from '../../services/api';

const CATEGORIES = ['Hostel', 'Academics', 'Infrastructure', 'Administration', 'Food', 'Transport', 'IT Support', 'Other'];

export default function CreateComplaint() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ title: '', description: '', category: '' });
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) { setError('Please select a category.'); return; }
    setLoading(true);
    try {
      await userService.createComplaint(form);
      setSuccess('Complaint submitted successfully! Redirecting…');
      setForm({ title: '', description: '', category: '' });
      setTimeout(() => navigate('/user/my-complaints'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <UserLayout>
      <div className="page-header">
        <h2>Create Complaint</h2>
      </div>

      <div className="card" style={{ maxWidth: 640 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title <span className="required">*</span></label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Brief title of your complaint"
              required
            />
          </div>

          <div className="form-group">
            <label>Category <span className="required">*</span></label>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Description <span className="required">*</span></label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your complaint in detail…"
              required
              rows={5}
            />
          </div>

          <div className="form-group">
            <label style={{ color: '#94a3b8' }}>Time of Complaint</label>
            <input type="text" value={new Date().toLocaleString()} disabled style={{ background: '#f8fafc', color: '#94a3b8' }} />
          </div>

          {error   && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Submitting…' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </UserLayout>
  );
}
