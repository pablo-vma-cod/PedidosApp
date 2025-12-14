/**
 * CategoryRepository (Interface/Contrato)
 * 
 * Define QUÉ operaciones necesitamos con categorías
 */
export class CategoryRepository {
  /**
   * Obtiene todas las categorías
   * @returns {Promise<Category[]>}
   */
  async findAll() {
    throw new Error('Método findAll() debe ser implementado');
  }

  /**
   * Obtiene categorías activas ordenadas
   * @returns {Promise<Category[]>}
   */
  async findActive() {
    throw new Error('Método findActive() debe ser implementado');
  }

  /**
   * Obtiene una categoría por su ID
   * @param {string|number} id
   * @returns {Promise<Category|null>}
   */
  async findById(id) {
    throw new Error('Método findById() debe ser implementado');
  }

  /**
   * Obtiene una categoría por su nombre
   * @param {string} name
   * @returns {Promise<Category|null>}
   */
  async findByName(name) {
    throw new Error('Método findByName() debe ser implementado');
  }

  /**
   * Crea una nueva categoría (para admin)
   * @param {Category} category
   * @returns {Promise<Category>}
   */
  async create(category) {
    throw new Error('Método create() debe ser implementado');
  }

  /**
   * Actualiza una categoría (para admin)
   * @param {string|number} id
   * @param {Category} category
   * @returns {Promise<Category>}
   */
  async update(id, category) {
    throw new Error('Método update() debe ser implementado');
  }

  /**
   * Elimina una categoría (para admin)
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    throw new Error('Método delete() debe ser implementado');
  }
}