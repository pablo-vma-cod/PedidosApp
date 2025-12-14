/**
 * Use Case: Obtener todos los productos
 * 
 * Responsabilidad: Obtener la lista completa de productos disponibles
 * No le importa de DÓNDE vienen (API, Mock, localStorage)
 */
export class GetAllProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Ejecuta el caso de uso
   * @returns {Promise<Product[]>}
   */
  async execute() {
    try {
      const products = await this.productRepository.findAll();
      
      // Filtrar solo productos disponibles (regla de negocio)
      const availableProducts = products.filter(product => product.isAvailable);
      
      return availableProducts;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw new Error('No se pudieron cargar los productos');
    }
  }
}