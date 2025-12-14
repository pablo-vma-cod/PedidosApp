/**
 * Use Case: Obtener todos los restaurantes
 */
export class GetAllRestaurants {
  constructor(restaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async execute() {
    try {
      const restaurants = await this.restaurantRepository.getAll();
      return restaurants;
    } catch (error) {
      console.error('Error al obtener restaurantes:', error);
      throw new Error('No se pudieron cargar los restaurantes');
    }
  }
}
