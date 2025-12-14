import { useState, useEffect, useCallback } from 'react';
import container from '../../infrastructure/di/container';

/**
 * Hook personalizado para manejar categorías
 */
export function useCategories() {
  const [categories, setCategories] = useState(['Todos']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar categorías
  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Por ahora, extraemos categorías de los productos
      const products = await container.products.getAll.execute();
      const uniqueCategories = ['Todos', ...new Set(products.map(p => p.category))];
      setCategories(uniqueCategories);
      return uniqueCategories;
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar categorías:', err);
      return ['Todos'];
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar al montar
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    loadCategories,
  };
}