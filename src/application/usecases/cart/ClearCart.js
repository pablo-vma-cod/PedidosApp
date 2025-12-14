/**
 * Use Case: Vaciar el carrito
 */
export class ClearCart {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute() {
    try {
      await this.cartRepository.clear();
      return true;
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
      throw new Error('No se pudo vaciar el carrito');
    }
  }
}