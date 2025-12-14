import { RestaurantRepository } from '../../domain/repositories/RestaurantRepository';
import { Restaurant } from '../../domain/entities/Restaurant';

/**
 * MockRestaurantRepository
 * Implementación MOCK del RestaurantRepository
 * Usa datos hardcodeados para desarrollo/testing
 */
export class MockRestaurantRepository extends RestaurantRepository {
  constructor() {
    super();

    this.mockRestaurants = [
      {
        id: 1,
        name: 'Burger Master',
        description: 'Las mejores hamburguesas artesanales de la ciudad',
        rating: 4.8,
        numReviews: 245,
        deliveryTime: 25,
        minOrder: 15,
        deliveryCost: 3.50,
        cuisine: ['Burgers', 'Fast Food'],
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
        isOpen: true,
        address: 'Av. Principal 123, Lima',
        phone: '+51 999 123 456',
        logo: 'https://via.placeholder.com/100?text=BurgerMaster'
      },
      {
        id: 2,
        name: 'Pizza Napolitana',
        description: 'Pizzas tradicionales italianas con ingredientes importados',
        rating: 4.7,
        numReviews: 189,
        deliveryTime: 30,
        minOrder: 20,
        deliveryCost: 4.00,
        cuisine: ['Pizza', 'Italian'],
        imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop',
        isOpen: true,
        address: 'Calle San Isidro 456, Lima',
        phone: '+51 999 234 567',
        logo: 'https://via.placeholder.com/100?text=PizzaNapolitana'
      },
      {
        id: 3,
        name: 'Sushi Paradise',
        description: 'Sushi fresco preparado diariamente por maestros japoneses',
        rating: 4.9,
        numReviews: 312,
        deliveryTime: 35,
        minOrder: 30,
        deliveryCost: 5.00,
        cuisine: ['Sushi', 'Japanese'],
        imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
        isOpen: true,
        address: 'Av. Javier Prado 789, Lima',
        phone: '+51 999 345 678',
        logo: 'https://via.placeholder.com/100?text=SushiParadise'
      },
      {
        id: 4,
        name: 'Pollo a la Brasa',
        description: 'Pollo a la brasa con las mejores salsas caseras',
        rating: 4.6,
        numReviews: 156,
        deliveryTime: 20,
        minOrder: 25,
        deliveryCost: 2.50,
        cuisine: ['Chicken', 'Peruvian'],
        imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=300&fit=crop',
        isOpen: true,
        address: 'Jr. Ucayali 321, Lima',
        phone: '+51 999 456 789',
        logo: 'https://via.placeholder.com/100?text=PolloaBrasa'
      },
      {
        id: 5,
        name: 'Tacos El Mexicano',
        description: 'Tacos auténticos mexicanos con sabores tradicionales',
        rating: 4.5,
        numReviews: 128,
        deliveryTime: 22,
        minOrder: 12,
        deliveryCost: 3.00,
        cuisine: ['Mexican', 'Tacos'],
        imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop',
        isOpen: true,
        address: 'Av. La Marina 654, Lima',
        phone: '+51 999 567 890',
        logo: 'https://via.placeholder.com/100?text=TacosElMexicano'
      },
      {
        id: 6,
        name: 'Café Gourmand',
        description: 'Café premium con repostería fina y desayunos deliciosos',
        rating: 4.7,
        numReviews: 201,
        deliveryTime: 25,
        minOrder: 10,
        deliveryCost: 2.00,
        cuisine: ['Cafe', 'Desserts'],
        imageUrl: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=300&fit=crop',
        isOpen: true,
        address: 'Calle Larco 222, Lima',
        phone: '+51 999 678 901',
        logo: 'https://via.placeholder.com/100?text=CafeGourmand'
      }
    ];
  }

  async _simulateDelay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this._simulateDelay(800);
    return this.mockRestaurants.map(data => Restaurant.fromJSON(data));
  }

  async getById(id) {
    await this._simulateDelay(300);
    const data = this.mockRestaurants.find(r => r.id === id);
    if (!data) {
      throw new Error(`Restaurante con id ${id} no encontrado`);
    }
    return Restaurant.fromJSON(data);
  }

  async searchByName(name) {
    await this._simulateDelay(500);
    const searchTerm = name.toLowerCase();
    const results = this.mockRestaurants.filter(r =>
      r.name.toLowerCase().includes(searchTerm) ||
      r.description.toLowerCase().includes(searchTerm)
    );
    return results.map(data => Restaurant.fromJSON(data));
  }

  async getByCategory(category) {
    await this._simulateDelay(500);
    const results = this.mockRestaurants.filter(r =>
      r.cuisine.some(c => c.toLowerCase().includes(category.toLowerCase()))
    );
    return results.map(data => Restaurant.fromJSON(data));
  }

  async getRated(minRating = 4.5) {
    await this._simulateDelay(400);
    const results = this.mockRestaurants.filter(r => r.rating >= minRating);
    return results.map(data => Restaurant.fromJSON(data));
  }
}
