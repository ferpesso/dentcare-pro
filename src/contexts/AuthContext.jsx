import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Criar o contexto
const AuthContext = createContext();

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Provider do contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação ao inicializar
    const checkInitialAuth = () => {
      const isAuth = authService.checkAuth();
      setIsAuthenticated(isAuth);
      setUser(authService.getCurrentUser());
      setLoading(false);
    };

    checkInitialAuth();

    // Adicionar listener para mudanças de estado
    const handleAuthChange = (authState) => {
      setIsAuthenticated(authState.isAuthenticated);
      setUser(authState.user);
    };

    authService.addListener(handleAuthChange);

    // Cleanup
    return () => {
      authService.removeListener(handleAuthChange);
    };
  }, []);

  const login = async (username, password) => {
    const result = await authService.login(username, password);
    return result;
  };

  const logout = () => {
    authService.logout();
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

