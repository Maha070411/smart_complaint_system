import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/user/dashboard' },
    { label: 'Create Complaint', path: '/user/create-complaint' },
    { label: 'My Complaints', path: '/user/my-complaints' },
  ];

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-lg tracking-wide">SCMS</span>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                location.pathname === item.path
                  ? 'bg-white text-indigo-700'
                  : 'hover:bg-indigo-600'
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
