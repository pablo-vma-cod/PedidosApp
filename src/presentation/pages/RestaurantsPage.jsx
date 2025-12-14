import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useRestaurants } from "../hooks/useRestaurants";

export default function RestaurantsPage() {
  const { isDarkMode } = useTheme();
  const { restaurants, loading, error, search, setSelectedRestaurant } = useRestaurants();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // Iconos
  const StarIcon = () => (
    <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.25l-7.19-.62L12 2 9.19 8.63 2 9.25l5.46 4.72L5.82 21z" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  // MapIcon y PhoneIcon removidos

  const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      await search(searchInput);
    }
  };

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    navigate(`/restaurants/${restaurant.id}/menu`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Banner de búsqueda */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Encuentra tu restaurante favorito</h1>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Buscar restaurante, comida..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              type="submit"
              className="bg-red-800 hover:bg-red-900 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
            >
              <SearchIcon />
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl h-72 animate-pulse"></div>
            ))}
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">No hay restaurantes</h2>
            <p className="text-gray-400">Intenta con otra búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => handleSelectRestaurant(restaurant)}
                className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
              >
                {/* Imagen */}
                <div className="relative h-40 overflow-hidden bg-gray-700">
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  {restaurant.isOpen === false && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Cerrado</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{restaurant.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {restaurant.description}
                  </p>

                  {/* Categorías */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {restaurant.cuisine.slice(0, 2).map((cat, i) => (
                      <span
                        key={i}
                        className="text-xs bg-red-600/30 text-red-300 px-2 py-1 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 text-sm text-gray-300 mb-4">
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                      <span className="font-bold">{restaurant.rating}</span>
                      <span className="text-gray-500">
                        ({restaurant.numReviews})
                      </span>
                    </div>

                    {/* Tiempo de entrega */}
                    <div className="flex items-center gap-2">
                      <ClockIcon />
                      <span>{restaurant.getFormattedDeliveryTime()}</span>
                    </div>

                    {/* Costo de envío */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Envío:</span>
                      <span className="font-bold">
                        {restaurant.deliveryCost === 0
                          ? "Gratis"
                          : `S/${restaurant.deliveryCost.toFixed(2)}`}
                      </span>
                    </div>

                    {/* Pedido mínimo */}
                    {restaurant.minOrder > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Mín:</span>
                        <span className="font-bold">S/{restaurant.minOrder.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Botón */}
                  <button
                    className="w-full bg-red-600 hover:bg-red-700 font-bold py-2 rounded-lg transition-colors"
                    disabled={!restaurant.isOpen}
                  >
                    {restaurant.isOpen ? "Ver menú" : "No disponible"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
