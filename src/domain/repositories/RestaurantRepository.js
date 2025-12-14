/**
 * RestaurantRepository (Interfaz/Clase Base)
 * Define el contrato que deben cumplir todos los repositorios de restaurantes
 */
export class RestaurantRepository {
  async getAll() {
    throw new Error('getAll() debe ser implementado');
  }

  async getById(id) {
    throw new Error('getById() debe ser implementado');
  }

  async searchByName(name) {
    throw new Error('searchByName() debe ser implementado');
  }

  async getByCategory(category) {
    throw new Error('getByCategory() debe ser implementado');
  }

  async getRated(minRating = 4.5) {
    throw new Error('getRated() debe ser implementado');
  }
}
