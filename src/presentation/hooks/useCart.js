import { useState, useEffect, useCallback } from 'react';
import container from '../../infrastructure/di/container';

/**
 * Hook personalizado para manejar el carrito
 * Encapsula toda la lógica del carrito de compras
 */
export function useCart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar items del carrito
  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await container.cart.getItems.execute();
      setItems(result.items);
      setTotal(result.total);
      setItemCount(result.count);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar carrito:', err);
      return { items: [], total: 0, count: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  // Añadir producto al carrito
  const addToCart = useCallback(async (product, quantity = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      await container.cart.add.execute(product, quantity);
      // Recargar carrito después de añadir
      await loadCart();
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error al añadir al carrito:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadCart]);

  // Eliminar del carrito
  const removeFromCart = useCallback(async (productId) => {
    setLoading(true);
    setError(null);
    
    try {
      await container.cart.remove.execute(productId);
      // Recargar carrito después de eliminar
      await loadCart();
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error al eliminar del carrito:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadCart]);

  // Actualizar cantidad
  const updateQuantity = useCallback(async (productId, quantity) => {
    setLoading(true);
    setError(null);
    
    try {
      await container.cart.updateQuantity.execute(productId, quantity);
      // Recargar carrito después de actualizar
      await loadCart();
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error al actualizar cantidad:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadCart]);

  // Vaciar carrito
  const clearCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await container.cart.clear.execute();
      setItems([]);
      setTotal(0);
      setItemCount(0);
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error al vaciar carrito:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar carrito al montar el componente
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    items,
    total,
    itemCount,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    clearError,
  };
}