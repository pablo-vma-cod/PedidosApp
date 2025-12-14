/**
 * Use Case: Añadir producto al carrito
 */
export class AddToCart {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  /**
   * @param {Product} product
   * @param {number} quantity
   * @returns {Promise<CartItem>}
   */
  async execute(product, quantity = 1) {
    // Validar producto
    if (!product || !product.canBePurchased()) {
      throw new Error('Este producto no puede ser agregado al carrito');
    }

    // Validar cantidad
    if (quantity < 1 || quantity > 99) {
      throw new Error('La cantidad debe estar entre 1 y 99');
    }

    try {
      const cartItem = await this.cartRepository.addItem(product, quantity);
      return cartItem;
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      throw new Error('No se pudo añadir el producto al carrito');
    }
  }
}