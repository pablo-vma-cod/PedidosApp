import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import container from '../../infrastructure/di/container';

/**
 * Hook personalizado para manejar autenticación
 * Encapsula toda la lógica de login, registro y logout
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario del localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error al parsear usuario guardado:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login
  const login = useCallback(async (email, password, rememberMe = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await container.auth.login.execute(email, password, rememberMe);
      setUser(result.user);
      
      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // Redirigir al home después de login exitoso
      navigate('/home');
      
      return { success: true, user: result.user };
    } catch (err) {
      setError(err.message);
      console.error('Error en login:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Registro
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await container.auth.register.execute(userData);
      setUser(result.user);
      
      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(result.user));
      
      // Redirigir al home después de registro exitoso
      navigate('/home');
      
      return { success: true, user: result.user };
    } catch (err) {
      setError(err.message);
      console.error('Error en registro:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Logout
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await container.auth.logout.execute();
      setUser(null);
      
      // Limpiar usuario del localStorage
      localStorage.removeItem('user');
      
      // Redirigir al home después de logout
      navigate('/home');
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error en logout:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };
}