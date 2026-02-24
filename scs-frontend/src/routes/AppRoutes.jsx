import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Login    from '../pages/Login';
import Register from '../pages/Register';

import UserDashboard    from '../pages/user/UserDashboard';
import CreateComplaint  from '../pages/user/CreateComplaint';
import MyComplaints     from '../pages/user/MyComplaints';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AllComplaints  from '../pages/admin/AllComplaints';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User */}
      <Route path="/user/dashboard" element={
        <ProtectedRoute role="USER"><UserDashboard /></ProtectedRoute>
      } />
      <Route path="/user/create-complaint" element={
        <ProtectedRoute role="USER"><CreateComplaint /></ProtectedRoute>
      } />
      <Route path="/user/my-complaints" element={
        <ProtectedRoute role="USER"><MyComplaints /></ProtectedRoute>
      } />

      {/* Admin */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/admin/complaints" element={
        <ProtectedRoute role="ADMIN"><AllComplaints /></ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
