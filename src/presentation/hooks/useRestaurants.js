import { useState, useCallback, useEffect } from 'react';
import container from '../../infrastructure/di/container';

/**
 * Hook personalizado para manejar restaurantes
 * Encapsula toda la lógica de obtención de restaurantes
 */
export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar todos los restaurantes
  const loadRestaurants = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await container.restaurants.getAll.execute();
      setRestaurants(results);
      return results;
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar restaurantes:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar restaurantes
  const search = useCallback(async (term) => {
    setLoading(true);
    setError(null);
    setSearchTerm(term);

    try {
      const results = await container.restaurants.search.execute(term);
      setRestaurants(results);
      return results;
    } catch (err) {
      setError(err.message);
      console.error('Error en búsqueda:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener restaurante por ID
  const getById = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const restaurant = await container.restaurants.getById.execute(id);
      setSelectedRestaurant(restaurant);
      return restaurant;
    } catch (err) {
      setError(err.message);
      console.error('Error al obtener restaurante:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar restaurantes al montar
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    restaurants,
    selectedRestaurant,
    setSelectedRestaurant,
    loading,
    error,
    searchTerm,
    loadRestaurants,
    search,
    getById,
    clearError
  };
}
