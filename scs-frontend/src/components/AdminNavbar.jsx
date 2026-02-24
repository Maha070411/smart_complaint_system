import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'All Complaints', path: '/admin/complaints' },
  ];

  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-wide">SCMS</span>
          <span className="text-xs bg-slate-600 px-2 py-0.5 rounded-full font-medium text-slate-300">Admin</span>
        </div>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                location.pathname === item.path
                  ? 'bg-white text-slate-800'
                  : 'hover:bg-slate-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="ml-3 px-4 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 transition-colors duration-150"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
