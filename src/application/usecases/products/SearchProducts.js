/**
 * Use Case: Buscar productos por texto
 */
export class SearchProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * @param {string} query - Texto de búsqueda
   * @returns {Promise<Product[]>}
   */
  async execute(query) {
    if (!query || query.trim().length === 0) {
      return [];
    }

    // Normalizar búsqueda (minúsculas, sin espacios extra)
    const normalizedQuery = query.trim().toLowerCase();

    try {
      const results = await this.productRepository.search(normalizedQuery);
      
      // Filtrar solo disponibles
      const availableResults = results.filter(product => product.isAvailable);
      
      return availableResults;
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw new Error('No se pudo realizar la búsqueda');
    }
  }
}