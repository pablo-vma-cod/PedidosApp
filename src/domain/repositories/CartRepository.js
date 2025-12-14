/**
 * CartRepository (Interface/Contrato)
 * 
 * Define QUÉ operaciones necesitamos con el carrito
 * El carrito puede almacenarse en:
 * - localStorage (sin login)
 * - API (con login)
 * - sessionStorage (temporal)
 */
export class CartRepository {
  /**
   * Obtiene todos los items del carrito
   * @returns {Promise<CartItem[]>}
   */
  async getItems() {
    throw new Error('Método getItems() debe ser implementado');
  }

  /**
   * Añade un producto al carrito
   * @param {Product} product
   * @param {number} quantity
   * @returns {Promise<CartItem>}
   */
  async addItem(product, quantity = 1) {
    throw new Error('Método addItem() debe ser implementado');
  }

  /**
   * Actualiza la cantidad de un item
   * @param {string|number} productId
   * @param {number} quantity
   * @returns {Promise<CartItem>}
   */
  async updateQuantity(productId, quantity) {
    throw new Error('Método updateQuantity() debe ser implementado');
  }

  /**
   * Elimina un item del carrito
   * @param {string|number} productId
   * @returns {Promise<void>}
   */
  async removeItem(productId) {
    throw new Error('Método removeItem() debe ser implementado');
  }

  /**
   * Vacía el carrito completamente
   * @returns {Promise<void>}
   */
  async clear() {
    throw new Error('Método clear() debe ser implementado');
  }

  /**
   * Obtiene el total de items en el carrito
   * @returns {Promise<number>}
   */
  async getItemCount() {
    throw new Error('Método getItemCount() debe ser implementado');
  }

  /**
   * Calcula el total del carrito
   * @returns {Promise<number>}
   */
  async getTotal() {
    throw new Error('Método getTotal() debe ser implementado');
  }
}