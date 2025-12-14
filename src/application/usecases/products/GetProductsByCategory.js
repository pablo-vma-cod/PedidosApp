/**
 * Use Case: Obtener productos filtrados por categoría
 */
export class GetProductsByCategory {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * @param {string} category - Nombre de la categoría
   * @returns {Promise<Product[]>}
   */
  async execute(category) {
    try {
      // Si la categoría es "Todos", obtener todos los productos
      if (!category || category === 'Todos') {
        const allProducts = await this.productRepository.findAll();
        return allProducts.filter(p => p.isAvailable);
      }

      // Obtener productos de la categoría específica
      const products = await this.productRepository.findByCategory(category);
      
      // Filtrar solo disponibles
      const availableProducts = products.filter(product => product.isAvailable);
      
      return availableProducts;
    } catch (error) {
      console.error('Error al filtrar productos por categoría:', error);
      throw new Error('No se pudieron cargar los productos de esta categoría');
    }
  }
}