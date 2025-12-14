/**
 * Use Case: Obtener items del carrito
 */
export class GetCartItems {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  /**
   * @returns {Promise<{items: CartItem[], total: number, count: number}>}
   */
  async execute() {
    try {
      const items = await this.cartRepository.getItems();
      const total = await this.cartRepository.getTotal();
      const count = await this.cartRepository.getItemCount();

      return { items, total, count };
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      throw new Error('No se pudo cargar el carrito');
    }
  }
}