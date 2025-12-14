/**
 * Dependency Injection Container
 * 
 * Este es el ÚNICO lugar donde decides qué implementación usar.
 * Aquí ensamblas todos los repositorios y use cases.
 * 
 * VENTAJA: Para cambiar de Mock a API, solo cambias AQUÍ.
 */

// ===== IMPORTAR REPOSITORIOS =====
// Mock Repositories (para desarrollo sin backend)
import { MockProductRepository } from '../repositories/MockProductRepository';
import { MockUserRepository } from '../repositories/MockUserRepository';
import { MockRestaurantRepository } from '../repositories/MockRestaurantRepository';
import { LocalStorageCartRepository } from '../repositories/LocalStorageCartRepository';

// API Repositories (cuando tengas backend, descomenta estas líneas)
// import { ApiProductRepository } from '../repositories/ApiProductRepository';
// import { ApiUserRepository } from '../repositories/ApiUserRepository';

// ===== IMPORTAR USE CASES =====
// Products
import { GetAllProducts } from '../../application/usecases/products/GetAllProducts';
import { GetProductById } from '../../application/usecases/products/GetProductById';
import { GetProductsByCategory } from '../../application/usecases/products/GetProductsByCategory';
import { SearchProducts } from '../../application/usecases/products/SearchProducts';
import { GetPopularProducts } from '../../application/usecases/products/GetPopularProducts';

// Auth
import { LoginUser } from '../../application/usecases/auth/LoginUser';
import { RegisterUser } from '../../application/usecases/auth/RegisterUser';
import { LogoutUser } from '../../application/usecases/auth/LogoutUser';

// Cart
import { AddToCart } from '../../application/usecases/cart/AddToCart';
import { RemoveFromCart } from '../../application/usecases/cart/RemoveFromCart';
import { UpdateCartItemQuantity } from '../../application/usecases/cart/UpdateCartItemQuantity';
import { GetCartItems } from '../../application/usecases/cart/GetCartItems';
import { ClearCart } from '../../application/usecases/cart/ClearCart';

// Restaurants
import { GetAllRestaurants } from '../../application/usecases/restaurants/GetAllRestaurants';
import { GetRestaurantById } from '../../application/usecases/restaurants/GetRestaurantById';
import { SearchRestaurants } from '../../application/usecases/restaurants/SearchRestaurants';
// ===== CONFIGURACIÓN =====
// Cambiar a 'api' cuando tengas backend funcionando
const USE_MOCK = true; // true = Mock, false = API real

// ===== INSTANCIAR REPOSITORIOS =====
// Singleton instances - se crean una sola vez

// Products Repository
const productRepository = USE_MOCK 
  ? new MockProductRepository()
  : null; // new ApiProductRepository() cuando esté listo

// User Repository
const userRepository = USE_MOCK
  ? new MockUserRepository()
  : null; // new ApiUserRepository() cuando esté listo

// Cart Repository (siempre usa localStorage por ahora)
const cartRepository = new LocalStorageCartRepository();

// Restaurant Repository
const restaurantRepository = USE_MOCK
  ? new MockRestaurantRepository()
  : null;

// ===== INSTANCIAR USE CASES =====
// Inyectamos los repositorios en los use cases

// --- Product Use Cases ---
export const getAllProductsUseCase = new GetAllProducts(productRepository);
export const getProductByIdUseCase = new GetProductById(productRepository);
export const getProductsByCategoryUseCase = new GetProductsByCategory(productRepository);
export const searchProductsUseCase = new SearchProducts(productRepository);
export const getPopularProductsUseCase = new GetPopularProducts(productRepository);

// --- Auth Use Cases ---
export const loginUserUseCase = new LoginUser(userRepository);
export const registerUserUseCase = new RegisterUser(userRepository);
export const logoutUserUseCase = new LogoutUser(userRepository);

// --- Cart Use Cases ---
export const addToCartUseCase = new AddToCart(cartRepository);
export const removeFromCartUseCase = new RemoveFromCart(cartRepository);
export const updateCartItemQuantityUseCase = new UpdateCartItemQuantity(cartRepository);
export const getCartItemsUseCase = new GetCartItems(cartRepository);
export const clearCartUseCase = new ClearCart(cartRepository);

// --- Restaurant Use Cases ---
export const getAllRestaurantsUseCase = new GetAllRestaurants(restaurantRepository);
export const getRestaurantByIdUseCase = new GetRestaurantById(restaurantRepository);
export const searchRestaurantsUseCase = new SearchRestaurants(restaurantRepository);

// ===== EXPORTAR CONTENEDOR =====
// Exportar un objeto con todos los use cases agrupados
const container = {
  // Products
  products: {
    getAll: getAllProductsUseCase,
    getById: getProductByIdUseCase,
    getByCategory: getProductsByCategoryUseCase,
    search: searchProductsUseCase,
    getPopular: getPopularProductsUseCase,
  },
  
  // Auth
  auth: {
    login: loginUserUseCase,
    register: registerUserUseCase,
    logout: logoutUserUseCase,
  },
  
  // Cart
  cart: {
    add: addToCartUseCase,
    remove: removeFromCartUseCase,
    updateQuantity: updateCartItemQuantityUseCase,
    getItems: getCartItemsUseCase,
    clear: clearCartUseCase,
  },

  // Restaurants
  restaurants: {
    getAll: getAllRestaurantsUseCase,
    getById: getRestaurantByIdUseCase,
    search: searchRestaurantsUseCase,
  },
};

export default container;

// ===== EJEMPLO DE USO =====
/*
// En cualquier componente o hook:
import container from '../infrastructure/di/container';

// Usar un use case:
const products = await container.products.getAll.execute();

// O importar directamente:
import { getAllProductsUseCase } from '../infrastructure/di/container';
const products = await getAllProductsUseCase.execute();
*/