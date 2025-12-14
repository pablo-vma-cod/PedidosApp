/**
 * Use Case: Obtener productos populares
 */
export class GetPopularProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * @param {number} limit - Cantidad máxima de productos
   * @returns {Promise<Product[]>}
   */
  async execute(limit = 4) {
    try {
      const popularProducts = await this.productRepository.findPopular(limit);
      
      // Asegurar que todos estén disponibles
      const availablePopular = popularProducts.filter(p => p.isAvailable);
      
      // Limitar resultados
      return availablePopular.slice(0, limit);
    } catch (error) {
      console.error('Error al obtener productos populares:', error);
      throw new Error('No se pudieron cargar los productos populares');
    }
  }
}