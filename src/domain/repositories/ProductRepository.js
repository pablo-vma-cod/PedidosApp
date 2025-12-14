/**
 * ProductRepository (Interface/Contrato)
 * 
 * Define QUÉ operaciones necesitamos con productos
 * NO define CÓMO se implementan
 * 
 * Este es un contrato que las implementaciones concretas
 * (ApiProductRepository, MockProductRepository) deben cumplir
 */
export class ProductRepository {
  /**
   * Obtiene todos los productos
   * @returns {Promise<Product[]>}
   */
  async findAll() {
    throw new Error('Método findAll() debe ser implementado');
  }

  /**
   * Obtiene un producto por su ID
   * @param {string|number} id - ID del producto
   * @returns {Promise<Product|null>}
   */
  async findById(id) {
    throw new Error('Método findById() debe ser implementado');
  }

  /**
   * Obtiene productos filtrados por categoría
   * @param {string} category - Nombre de la categoría
   * @returns {Promise<Product[]>}
   */
  async findByCategory(category) {
    throw new Error('Método findByCategory() debe ser implementado');
  }

  /**
   * Busca productos por nombre o descripción
   * @param {string} query - Texto a buscar
   * @returns {Promise<Product[]>}
   */
  async search(query) {
    throw new Error('Método search() debe ser implementado');
  }

  /**
   * Obtiene productos populares
   * @param {number} limit - Cantidad máxima de productos
   * @returns {Promise<Product[]>}
   */
  async findPopular(limit = 4) {
    throw new Error('Método findPopular() debe ser implementado');
  }

  /**
   * Crea un nuevo producto (para admin)
   * @param {Product} product - Producto a crear
   * @returns {Promise<Product>}
   */
  async create(product) {
    throw new Error('Método create() debe ser implementado');
  }

  /**
   * Actualiza un producto existente (para admin)
   * @param {string|number} id - ID del producto
   * @param {Product} product - Datos actualizados
   * @returns {Promise<Product>}
   */
  async update(id, product) {
    throw new Error('Método update() debe ser implementado');
  }

  /**
   * Elimina un producto (para admin)
   * @param {string|number} id - ID del producto
   * @returns {Promise<void>}
   */
  async delete(id) {
    throw new Error('Método delete() debe ser implementado');
  }
}