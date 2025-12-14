
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';

// Importar imágenes
import nuggetsImg from "../../presentation/assets/nuggets.png";
import burgerImg from "../../presentation/assets/americana.png";
import comboImg from "../../presentation/assets/combocheese.png";
import friesImg from "../../presentation/assets/papas_extra.png";
import refrescoImg from "../../presentation/assets/refrescoxl.png";
import sundaeImg from "../../presentation/assets/sundae_chocolate.png";

/**
 * MockProductRepository
 * Implementación MOCK del ProductRepository
 * Usa datos hardcodeados para desarrollo/testing
 */
export class MockProductRepository extends ProductRepository {
  constructor() {
    super();
    
    // Datos mock (lo que tenías en MenuPage.jsx)
    this.mockProducts = [
      // HAMBURGUESAS Y COMBOS
      {
        id: 1,
        category: "Hamburguesas y Combos",
        name: "Clásica Americana",
        desc: "Doble carne con queso cheddar, lechuga, tomate y nuestra salsa especial",
        price: 22.00,
        imgUrl: burgerImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 5,
        category: "Hamburguesas y Combos",
        name: "Combo Big Cheese",
        desc: "Hamburguesa doble, papas medianas y bebida grande",
        price: 35.00,
        imgUrl: comboImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 24,
        category: "Hamburguesas y Combos",
        name: "Mega Burguer",
        desc: "Triple carne, triple queso, especias y salsa de la casa",
        price: 28.00,
        imgUrl: burgerImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 25,
        category: "Hamburguesas y Combos",
        name: "Combo Familiar",
        desc: "4 hamburguesas + papas grandes + 2 bebidas",
        price: 78.00,
        imgUrl: comboImg,
        isPopular: false,
        isAvailable: true
      },
      // SNACKS Y ACOMPAÑAMIENTOS
      {
        id: 2,
        category: "Snacks y Acompañamientos",
        name: "Papas Fritas Extragrandes",
        desc: "Crujientes papas doradas, perfectas para compartir",
        price: 15.00,
        imgUrl: friesImg,
        isPopular: false,
        isAvailable: true
      },
      {
        id: 4,
        category: "Snacks y Acompañamientos",
        name: "Chicken Nuggets (10 unid)",
        desc: "Tiernos nuggets de pollo empanizados, incluye salsa BBQ",
        price: 25.00,
        imgUrl: nuggetsImg,
        isPopular: false,
        isAvailable: true
      },
      {
        id: 26,
        category: "Snacks y Acompañamientos",
        name: "Aros de Cebolla",
        desc: "Aros de cebolla fritos y crujientes",
        price: 12.00,
        imgUrl: friesImg,
        isPopular: false,
        isAvailable: true
      },
      {
        id: 27,
        category: "Snacks y Acompañamientos",
        name: "Alitas de Pollo BBQ",
        desc: "6 alitas con salsa BBQ casera",
        price: 20.00,
        imgUrl: nuggetsImg,
        isPopular: true,
        isAvailable: true
      },
      // POSTRES Y BEBIDAS
      {
        id: 3,
        category: "Postres y Bebidas",
        name: "Sundae de Chocolate",
        desc: "Helado cremoso con topping de chocolate caliente y crema",
        price: 18.00,
        imgUrl: sundaeImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 6,
        category: "Postres y Bebidas",
        name: "Refresco XL",
        desc: "Refresco helado de 1 litro a elección",
        price: 8.00,
        imgUrl: refrescoImg,
        isPopular: false,
        isAvailable: true
      },
      {
        id: 28,
        category: "Postres y Bebidas",
        name: "Milkshake Fresa",
        desc: "Cremoso milkshake de fresa natural",
        price: 14.00,
        imgUrl: refrescoImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 29,
        category: "Postres y Bebidas",
        name: "Batido de Plátano",
        desc: "Energético batido con proteína",
        price: 16.00,
        imgUrl: refrescoImg,
        isPopular: false,
        isAvailable: true
      },
      // POLLO FRITO
      {
        id: 30,
        category: "Pollo Frito",
        name: "Pollo Frito 4 Piezas",
        desc: "Piezas de pollo fresco y crujiente con papas",
        price: 28.00,
        imgUrl: nuggetsImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 31,
        category: "Pollo Frito",
        name: "Pollo a la Brasa",
        desc: "Pollo a la brasa con papas y ensalada",
        price: 32.00,
        imgUrl: nuggetsImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 32,
        category: "Pollo Frito",
        name: "Alitas Picantes",
        desc: "Alitas de pollo con salsa picante y miel",
        price: 24.00,
        imgUrl: nuggetsImg,
        isPopular: false,
        isAvailable: true
      },
      // PIZZA
      {
        id: 33,
        category: "Pizza",
        name: "Pizza Clásica",
        desc: "Mozzarella, tomate y orégano",
        price: 26.00,
        imgUrl: burgerImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 34,
        category: "Pizza",
        name: "Pizza Peperoni",
        desc: "Generoso peperoni con queso derretido",
        price: 28.00,
        imgUrl: burgerImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 35,
        category: "Pizza",
        name: "Pizza Tropical",
        desc: "Pollo, piña y tocino",
        price: 30.00,
        imgUrl: burgerImg,
        isPopular: false,
        isAvailable: true
      },
      // CHIFA
      {
        id: 36,
        category: "Chifa",
        name: "Tallarín Saltado",
        desc: "Tallarín salteado con carne y vegetales",
        price: 18.00,
        imgUrl: friesImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 37,
        category: "Chifa",
        name: "Arroz Chaufa",
        desc: "Arroz chaufa con pollo y huevo",
        price: 16.00,
        imgUrl: friesImg,
        isPopular: false,
        isAvailable: true
      },
      {
        id: 38,
        category: "Chifa",
        name: "Wantán Frito",
        desc: "8 wantanes fritos con salsa agridulce",
        price: 14.00,
        imgUrl: nuggetsImg,
        isPopular: false,
        isAvailable: true
      },
      // DONUTS Y POSTRES
      {
        id: 39,
        category: "Donuts y Postres",
        name: "Donuts de Chocolate",
        desc: "3 donuts con cobertura de chocolate",
        price: 12.00,
        imgUrl: sundaeImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 40,
        category: "Donuts y Postres",
        name: "Brownies Fudge",
        desc: "2 brownies caseros con fudge",
        price: 14.00,
        imgUrl: sundaeImg,
        isPopular: true,
        isAvailable: true
      },
      {
        id: 41,
        category: "Donuts y Postres",
        name: "Cheesecake",
        desc: "Clásico cheesecake con frutos rojos",
        price: 18.00,
        imgUrl: sundaeImg,
        isPopular: false,
        isAvailable: true
      }
    ];
  }

  // Simular delay de red (opcional)
  async _simulateDelay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async findAll() {
    await this._simulateDelay(800); // Simula latencia de red
    
    // Convertir datos mock a entidades Product
    return this.mockProducts.map(data => Product.fromJSON(data));
  }

  async findById(id) {
    await this._simulateDelay(300);
    
    const productData = this.mockProducts.find(p => p.id === parseInt(id));
    
    if (!productData) {
      return null;
    }
    
    return Product.fromJSON(productData);
  }

  async findByCategory(category) {
    await this._simulateDelay(500);
    
    const filtered = this.mockProducts.filter(p => p.category === category);
    
    return filtered.map(data => Product.fromJSON(data));
  }

  async search(query) {
    await this._simulateDelay(400);
    
    const lowerQuery = query.toLowerCase();
    
    const results = this.mockProducts.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.desc.toLowerCase().includes(lowerQuery)
    );
    
    return results.map(data => Product.fromJSON(data));
  }

  async findPopular(limit = 4) {
    await this._simulateDelay(300);
    
    const popular = this.mockProducts.filter(p => p.isPopular);
    const limited = popular.slice(0, limit);
    
    return limited.map(data => Product.fromJSON(data));
  }

  async create(product) {
    await this._simulateDelay(500);
    
    // Simular creación
    const newProduct = {
      id: this.mockProducts.length + 1,
      ...product.toJSON()
    };
    
    this.mockProducts.push(newProduct);
    
    return Product.fromJSON(newProduct);
  }

  async update(id, product) {
    await this._simulateDelay(500);
    
    const index = this.mockProducts.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    
    this.mockProducts[index] = {
      ...this.mockProducts[index],
      ...product.toJSON()
    };
    
    return Product.fromJSON(this.mockProducts[index]);
  }

  async delete(id) {
    await this._simulateDelay(500);
    
    const index = this.mockProducts.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    
    this.mockProducts.splice(index, 1);
  }
}