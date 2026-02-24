import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role  = localStorage.getItem('role');
    const name  = localStorage.getItem('userName');
    const id    = localStorage.getItem('userId');
    const email = localStorage.getItem('userEmail');
    if (token && role) setUser({ token, role, name, id: parseInt(id), email });
    setLoading(false);
  }, []);

  const login = ({ token, user: u }) => {
    localStorage.setItem('token',     token);
    localStorage.setItem('role',      u.role);
    localStorage.setItem('userName',  u.name);
    localStorage.setItem('userId',    String(u.id));
    localStorage.setItem('userEmail', u.email);
    setUser({ token, role: u.role, name: u.name, id: u.id, email: u.email });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
