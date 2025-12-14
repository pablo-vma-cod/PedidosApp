// ========================================
// MenuPage - Página de Menú de Productos
// ========================================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useCart } from '../hooks/useCart';

// Iconos
const CartIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const DeliveryIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M5 7.5V5h14v2.5M5 7.5L3 18h18l-2-10.5M9 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm9 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

// Componente ProductCard
const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-red-500/50 relative">
    {product.isPopular && (
      <span className="absolute top-0 right-0 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
        Popular
      </span>
    )}
    <div className="w-full h-48 bg-gray-700 overflow-hidden">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition duration-300 hover:opacity-80"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <DeliveryIcon className="w-10 h-10 text-red-500" />
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="text-xl font-bold mb-1 text-white truncate">{product.name}</h3>
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-3xl text-red-500 font-extrabold">{product.getFormattedPrice()}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-300 transform hover:scale-110 shadow-lg"
          aria-label={`Añadir ${product.name} al carrito`}
        >
          <CartIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
);

// Componente Principal
export default function MenuPage() {
  const { products, loading: productsLoading, loadProductsByCategory, loadProducts } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const { addToCart } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    if (selectedCategory === "Todos") {
      loadProducts();
    } else {
      loadProductsByCategory(selectedCategory);
    }
  }, [selectedCategory, loadProductsByCategory, loadProducts]);

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      console.log('✅ Producto añadido al carrito');
    } else {
      console.error('❌ Error:', result.error);
    }
  };

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const loading = productsLoading || categoriesLoading;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-900 text-gray-100">
      <header className="sticky top-0 z-40 w-full backdrop-blur-sm border-b p-4 shadow-xl transition-colors duration-300 bg-gray-900/95 border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl md:text-3xl font-extrabold text-white hover:text-red-500 transition">
            Pedidos<span className="text-red-500">App</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        <main className="flex-1 p-6 md:p-8">
          {/* Agregados */}
          {!loading && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-white mb-4">Agregados</h2>
              <div className="flex overflow-x-auto pb-4 gap-3 scroll-smooth">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-shrink-0 px-6 py-3 rounded-full font-semibold transition-all duration-200 whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-red-600 text-white shadow-lg scale-110"
                        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="h-10 bg-gray-700 rounded w-1/3 mb-8 animate-pulse"></div>
          ) : (
            <h1 className="text-4xl font-extrabold mb-8 text-white">
              Menú <span className="text-red-500">{selectedCategory === "Todos" ? "Completo" : selectedCategory}</span>
            </h1>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {Object.entries(groupedProducts).map(([category, productList]) => (
                <div key={category} className="mb-12">
                  <h2 className="text-3xl font-bold text-amber-400 mb-6 border-b-2 border-gray-700 pb-2 sticky top-[80px] bg-gray-900 z-30">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {productList.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="text-center p-12 bg-gray-800 rounded-xl mt-12">
                  <h2 className="text-2xl font-bold text-white">No hay productos en esta categoría.</h2>
                  <p className="text-gray-400 mt-2">Por favor, selecciona otra categoría o regresa más tarde.</p>
                  <button
                    onClick={() => setSelectedCategory("Todos")}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                  >
                    Ver Todo el Menú
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}