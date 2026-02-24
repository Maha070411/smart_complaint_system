import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="navbar-brand">
          SCMS <span>User</span>
        </div>
        <ul className="navbar-nav">
          <li><NavLink to="/user/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/user/create-complaint">Create Complaint</NavLink></li>
          <li><NavLink to="/user/my-complaints">My Complaints</NavLink></li>
          <li>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
