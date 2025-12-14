import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { Category } from '../../domain/entities/Category';

/**
 * MockCategoryRepository
 * Implementación MOCK del CategoryRepository
 */
export class MockCategoryRepository extends CategoryRepository {
  constructor() {
    super();
    
    this.mockCategories = [
      {
        id: 1,
        name: "Todos",
        description: "Ver todos los productos",
        displayOrder: 0,
        isActive: true
      },
      {
        id: 2,
        name: "Hamburguesas y Combos",
        description: "Deliciosas hamburguesas y combos completos",
        displayOrder: 1,
        isActive: true
      },
      {
        id: 3,
        name: "Snacks y Acompañamientos",
        description: "Complementa tu pedido con nuestros snacks",
        displayOrder: 2,
        isActive: true
      },
      {
        id: 4,
        name: "Postres y Bebidas",
        description: "Endulza tu día con nuestros postres",
        displayOrder: 3,
        isActive: true
      },
      {
        id: 5,
        name: "Pollo Frito",
        description: "Pollo fresco y crujiente",
        displayOrder: 4,
        isActive: true
      },
      {
        id: 6,
        name: "Pizza",
        description: "Pizzas artesanales",
        displayOrder: 5,
        isActive: true
      },
      {
        id: 7,
        name: "Chifa",
        description: "Comida asiática",
        displayOrder: 6,
        isActive: true
      },
      {
        id: 8,
        name: "Donuts y Postres",
        description: "Dulces y postres variados",
        displayOrder: 7,
        isActive: true
      }
    ];
  }

  async _simulateDelay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async findAll() {
    await this._simulateDelay();
    return this.mockCategories.map(data => Category.fromJSON(data));
  }

  async findActive() {
    await this._simulateDelay();
    const active = this.mockCategories.filter(c => c.isActive);
    return active.map(data => Category.fromJSON(data));
  }

  async findById(id) {
    await this._simulateDelay();
    const categoryData = this.mockCategories.find(c => c.id === parseInt(id));
    return categoryData ? Category.fromJSON(categoryData) : null;
  }

  async findByName(name) {
    await this._simulateDelay();
    const categoryData = this.mockCategories.find(c => c.name === name);
    return categoryData ? Category.fromJSON(categoryData) : null;
  }

  async create(category) {
    await this._simulateDelay();
    const newCategory = {
      id: this.mockCategories.length + 1,
      ...category.toJSON()
    };
    this.mockCategories.push(newCategory);
    return Category.fromJSON(newCategory);
  }

  async update(id, category) {
    await this._simulateDelay();
    const index = this.mockCategories.findIndex(c => c.id === parseInt(id));
    if (index === -1) throw new Error('Categoría no encontrada');
    
    this.mockCategories[index] = {
      ...this.mockCategories[index],
      ...category.toJSON()
    };
    
    return Category.fromJSON(this.mockCategories[index]);
  }

  async delete(id) {
    await this._simulateDelay();
    const index = this.mockCategories.findIndex(c => c.id === parseInt(id));
    if (index === -1) throw new Error('Categoría no encontrada');
    this.mockCategories.splice(index, 1);
  }
}