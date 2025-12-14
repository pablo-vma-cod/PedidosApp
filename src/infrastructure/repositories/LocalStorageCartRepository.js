import { CartRepository } from '../../domain/repositories/CartRepository';
import { CartItem } from '../../domain/entities/CartItem';

/**
 * LocalStorageCartRepository
 * Implementación del CartRepository usando localStorage
 * Perfecto para carritos sin necesidad de login
 */
export class LocalStorageCartRepository extends CartRepository {
  constructor() {
    super();
    this.storageKey = 'pedidosapp_cart';
  }

  // Helper: Obtener carrito del localStorage
  _getCartFromStorage() {
    try {
      const cartJson = localStorage.getItem(this.storageKey);
      if (!cartJson) return [];
      
      const cartData = JSON.parse(cartJson);
      
      // Convertir a CartItems
      return cartData.map(item => CartItem.fromJSON(item));
    } catch (error) {
      console.error('Error al leer carrito del localStorage:', error);
      return [];
    }
  }

  // Helper: Guardar carrito en localStorage
  _saveCartToStorage(cartItems) {
    try {
      const cartJson = JSON.stringify(
        cartItems.map(item => item.toJSON())
      );
      localStorage.setItem(this.storageKey, cartJson);
    } catch (error) {
      console.error('Error al guardar carrito en localStorage:', error);
      throw new Error('No se pudo guardar el carrito');
    }
  }

  // Helper: Simular delay (opcional, para consistencia con Mock)
  async _simulateDelay(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getItems() {
    await this._simulateDelay();
    return this._getCartFromStorage();
  }

  async addItem(product, quantity = 1) {
    await this._simulateDelay();
    
    const cartItems = this._getCartFromStorage();
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex(
      item => item.product.id === product.id
    );
    
    if (existingItemIndex !== -1) {
      // Si ya existe, aumentar cantidad
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Si no existe, crear nuevo item
      const newItem = new CartItem({ product, quantity });
      cartItems.push(newItem);
    }
    
    this._saveCartToStorage(cartItems);
    
    // Retornar el item añadido/actualizado
    const updatedItem = existingItemIndex !== -1 
      ? cartItems[existingItemIndex]
      : cartItems[cartItems.length - 1];
    
    return updatedItem;
  }

  async updateQuantity(productId, quantity) {
    await this._simulateDelay();
    
    const cartItems = this._getCartFromStorage();
    
    const itemIndex = cartItems.findIndex(
      item => item.product.id === productId
    );
    
    if (itemIndex === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }
    
    // Actualizar cantidad
    cartItems[itemIndex].quantity = quantity;
    
    this._saveCartToStorage(cartItems);
    
    return cartItems[itemIndex];
  }

  async removeItem(productId) {
    await this._simulateDelay();
    
    let cartItems = this._getCartFromStorage();
    
    // Filtrar el item a eliminar
    cartItems = cartItems.filter(item => item.product.id !== productId);
    
    this._saveCartToStorage(cartItems);
  }

  async clear() {
    await this._simulateDelay();
    localStorage.removeItem(this.storageKey);
  }

  async getItemCount() {
    await this._simulateDelay();
    
    const cartItems = this._getCartFromStorage();
    
    // Sumar todas las cantidades
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  async getTotal() {
    await this._simulateDelay();
    
    const cartItems = this._getCartFromStorage();
    
    // Sumar todos los subtotales
    return cartItems.reduce((total, item) => total + item.getSubtotal(), 0);
  }
}