/**
 * Use Case: Obtener un producto por ID
 */
export class GetProductById {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * @param {string|number} id - ID del producto
   * @returns {Promise<Product>}
   */
  async execute(id) {
    if (!id) {
      throw new Error('El ID del producto es requerido');
    }

    try {
      const product = await this.productRepository.findById(id);
      
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }

      if (!product.isAvailable) {
        throw new Error('Este producto no está disponible');
      }

      return product;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  }
}