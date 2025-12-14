/**
 * Use Case: Eliminar producto del carrito
 */
export class RemoveFromCart {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  /**
   * @param {string|number} productId
   * @returns {Promise<void>}
   */
  async execute(productId) {
    if (!productId) {
      throw new Error('El ID del producto es requerido');
    }

    try {
      await this.cartRepository.removeItem(productId);
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      throw new Error('No se pudo eliminar el producto del carrito');
    }
  }
}