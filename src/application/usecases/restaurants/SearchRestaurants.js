/**
 * Use Case: Buscar restaurantes por nombre
 */
export class SearchRestaurants {
  constructor(restaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async execute(searchTerm) {
    if (!searchTerm || searchTerm.trim().length === 0) {
      // Si no hay búsqueda, retornar todos
      return await this.restaurantRepository.getAll();
    }

    try {
      const results = await this.restaurantRepository.searchByName(searchTerm);
      return results;
    } catch (error) {
      console.error('Error al buscar restaurantes:', error);
      throw new Error('Error en la búsqueda de restaurantes');
    }
  }
}
