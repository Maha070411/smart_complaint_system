import axios from 'axios';

// ── Axios instance ────────────────────────────────────────────────────
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every outgoing request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally → redirect to login
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────
export const authService = {
  login: (body) => instance.post('/api/auth/login', body),
  register: (body) => instance.post('/api/auth/register', body),
};

// ── User Complaints ───────────────────────────────────────────────────
export const userService = {
  getMyComplaints: () =>
    instance.get('/api/user/complaints').then((res) => {
      // Backend returns Page object { content: [...], totalPages, ... }
      // Frontend expects a flat array in res.data
      const data = res.data;
      if (data.content) {
        return { ...res, data: data.content };
      }
      return res;
    }),

  createComplaint: (body) => instance.post('/api/user/complaints', body),
};

// ── Admin Complaints ──────────────────────────────────────────────────
export const adminService = {
  getAllComplaints: (params = {}) =>
    instance.get('/api/admin/complaints', { params }),

  updateComplaint: (id, body) =>
    instance.put(`/api/admin/complaints/${id}`, body),
};

export default instance;
