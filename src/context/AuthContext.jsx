import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && typeof token === 'string' && token !== 'undefined' && token.trim() !== '') {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    if (token && typeof token === 'string' && token !== 'undefined' && token.trim() !== '') {
      localStorage.setItem('token', token);
      setUser({ token });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
