import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ecommerce-api-6y9p.onrender.com';

interface User {
  id: string;
  mobile: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  /** Exchange Firebase ID token (after SMS verified) for app JWT */
  loginWithFirebaseToken: (mobile: string, idToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loginWithFirebaseToken = async (mobile: string, idToken: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/firebase-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, idToken }),
    });

    const text = await response.text();
    let data: { message?: string; user?: User; token?: string } = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error('Server error while verifying Firebase login');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    const userData = data.user;
    const token = data.token;
    if (!userData || !token) {
      throw new Error('Invalid response from server');
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    toast.success('Logged in successfully');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.info('Logged out');
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loginWithFirebaseToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
