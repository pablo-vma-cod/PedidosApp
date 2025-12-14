# Estructura de Carpetas - Frontend (Actualizado con Application Layer)

```
src/
├── application/                    # ⭐ NEW: Application Layer (Use Cases)
│   └── usecases/
│       ├── products/              # Use Cases de Productos
│       │   ├── GetAllProducts.js
│       │   ├── GetProductById.js
│       │   ├── GetProductsByCategory.js
│       │   ├── SearchProducts.js
│       │   ├── GetPopularProducts.js
│       │   └── index.js
│       ├── auth/                  # Use Cases de Autenticación
│       │   ├── LoginUser.js
│       │   ├── RegisterUser.js
│       │   ├── LogoutUser.js
│       │   └── index.js
│       ├── cart/                  # Use Cases de Carrito
│       │   ├── AddToCart.js
│       │   ├── RemoveFromCart.js
│       │   ├── UpdateCartItemQuantity.js
│       │   ├── GetCartItems.js
│       │   ├── ClearCart.js
│       │   └── index.js
│       ├── restaurants/           # Use Cases de Restaurantes
│       │   ├── GetAllRestaurants.js
│       │   ├── GetRestaurantById.js
│       │   ├── SearchRestaurants.js
│       │   └── index.js
│       └── index.js               # Re-export de todos los usecases
│
├── domain/                        # Domain Layer (Entities & Abstract Repositories)
│   ├── entities/
│   │   ├── CartItem.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── Restaurant.js
│   │   ├── User.js
│   │   └── index.js
│   └── repositories/
│       ├── CartRepository.js      # Abstract
│       ├── CategoryRepository.js  # Abstract
│       ├── ProductRepository.js   # Abstract
│       ├── RestaurantRepository.js # Abstract
│       ├── UserRepository.js      # Abstract
│       └── index.js
│
├── infrastructure/                # Infrastructure Layer (Implementations)
│   ├── di/
│   │   └── container.js           # Dependency Injection Container
│   ├── http/
│   │   ├── apiConfig.js           # Axios config
│   │   └── httpClient.js          # HTTP client wrapper
│   └── repositories/
│       ├── LocalStorageCartRepository.js    # Cart impl (LocalStorage)
│       ├── MockCategoryRepository.js        # Mock impl
│       ├── MockProductRepository.js         # Mock impl (41 productos)
│       ├── MockRestaurantRepository.js      # Mock impl
│       ├── MockUserRepository.js            # Mock impl
│       └── (Future: API implementations)
│
├── presentation/                  # Presentation Layer (UI)
│   ├── assets/
│   │   └── (images, icons, etc.)
│   ├── components/
│   │   ├── CategorySkeleton.jsx
│   │   ├── LoginPageSkeleton.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCardSkeleton.jsx
│   │   └── (otros componentes reutilizables)
│   ├── hooks/
│   │   ├── useAuth.js             # Hook de autenticación
│   │   ├── useCart.js             # Hook de carrito
│   │   ├── useCategories.js       # Hook de categorías
│   │   ├── useLoading.js          # Hook de loading
│   │   ├── useProducts.js         # Hook de productos
│   │   ├── useRestaurants.js      # Hook de restaurantes
│   │   ├── useTheme.js            # Hook de tema (dark/light)
│   │   └── index.js
│   ├── pages/
│   │   ├── CartPage.jsx           # Página de carrito
│   │   ├── CheckoutPage.jsx       # Página de checkout (3 steps)
│   │   ├── HomePage.jsx           # Página inicial
│   │   ├── LoginPage.jsx          # Página de login
│   │   ├── MenuPage.jsx           # Página de menú (categorías + productos)
│   │   ├── NotFoundPage.jsx       # Página 404
│   │   ├── OrderHistoryPage.jsx   # Página de historial
│   │   └── RegisterPage.jsx       # Página de registro
│   └── (otros componentes de UI)
│
├── App.js                         # Root component
├── App.css
├── index.js                       # Entry point
├── index.css
└── (archivos de configuración)
```

## Flujo de Arquitectura Limpia

```
┌─────────────────────────────────────────────────────────────┐
│              PRESENTATION LAYER (UI)                        │
│  Pages (CartPage, MenuPage, CheckoutPage, etc.)            │
│  Components (Navbar, ProductCard, etc.)                    │
│  Hooks (useCart, useProducts, useAuth, etc.)               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│           APPLICATION LAYER (Use Cases) ⭐ NEW             │
│  GetAllProducts, GetProductsByCategory, AddToCart,         │
│  LoginUser, ClearCart, SearchRestaurants, etc.             │
│  (Orquestad lógica de negocio)                             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              DOMAIN LAYER (Business Logic)                  │
│  Entities: Product, User, Order, Cart, Category, etc.      │
│  Abstract Repositories: ProductRepository, UserRepository  │
│  (Interfaces que define el negocio)                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│         INFRASTRUCTURE LAYER (Implementations)             │
│  Mock Repositories (LocalStorage, In-Memory)               │
│  HTTP Client (Axios)                                       │
│  Future API Repositories (ApiProductRepository, etc.)      │
│  Dependency Injection Container                            │
└─────────────────────────────────────────────────────────────┘
```

## Cambios Realizados

✅ **Nueva carpeta `application/` creada** en src/
✅ **11 use cases creados** (5 para products, 3 para auth, 5 para cart, 3 para restaurants)
✅ **Index files creados** en cada subdirectorio de usecases para facilitar importaciones
✅ **container.js actualizado** con imports correctos desde application/usecases
✅ **Flujo completo validado**: sin errores de compilación

## Ventajas de esta estructura

1. **Separación de responsabilidades**: Cada capa tiene un propósito único
2. **Fácil de testear**: Cada capa puede ser testeada independientemente
3. **Independencia de frameworks**: La lógica de negocio (domain/application) no depende de React
4. **Fácil de cambiar implementaciones**: Cambiar de Mock a API solo requiere modificar container.js
5. **Escalabilidad**: Agregar nuevos use cases es simple y sigue un patrón consistente
6. **Mantenibilidad**: Código organizado y predecible
