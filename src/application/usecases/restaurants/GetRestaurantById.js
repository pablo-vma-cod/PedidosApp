/**
 * Use Case: Obtener restaurante por ID
 */
export class GetRestaurantById {
  constructor(restaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }

  async execute(id) {
    if (!id) {
      throw new Error('El ID del restaurante es requerido');
    }

    try {
      const restaurant = await this.restaurantRepository.getById(id);
      return restaurant;
    } catch (error) {
      console.error('Error al obtener restaurante:', error);
      throw new Error('No se pudo cargar el restaurante');
    }
  }
}
