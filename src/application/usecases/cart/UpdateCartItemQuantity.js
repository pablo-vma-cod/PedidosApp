/**
 * Use Case: Actualizar cantidad de un item del carrito
 */
export class UpdateCartItemQuantity {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  /**
   * @param {string|number} productId
   * @param {number} quantity
   * @returns {Promise<CartItem>}
   */
  async execute(productId, quantity) {
    if (!productId) {
      throw new Error('El ID del producto es requerido');
    }

    if (quantity < 1 || quantity > 99) {
      throw new Error('La cantidad debe estar entre 1 y 99');
    }

    try {
      const updatedItem = await this.cartRepository.updateQuantity(productId, quantity);
      return updatedItem;
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      throw new Error('No se pudo actualizar la cantidad');
    }
  }
}