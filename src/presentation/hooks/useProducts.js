import { useState, useEffect, useCallback } from 'react';
import container from '../../infrastructure/di/container';

/**
 * Hook personalizado para manejar productos
 * Encapsula toda la lógica de obtención de productos
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los productos
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await container.products.getAll.execute();
      setProducts(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar productos:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener productos por categoría
  const loadProductsByCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await container.products.getByCategory.execute(category);
      setProducts(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error al filtrar productos:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar productos
  const searchProducts = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await container.products.search.execute(query);
      setProducts(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error al buscar productos:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener producto por ID
  const getProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await container.products.getById.execute(id);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error al obtener producto:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener productos populares
  const loadPopularProducts = useCallback(async (limit = 4) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await container.products.getPopular.execute(limit);
      setProducts(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar populares:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar todos los productos al montar
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    loadProducts,
    loadProductsByCategory,
    searchProducts,
    getProductById,
    loadPopularProducts,
  };
}