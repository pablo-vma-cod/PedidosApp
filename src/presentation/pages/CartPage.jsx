import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

export default function CartPage() {
  const { isDarkMode } = useTheme();
  const { items, total, loading, itemCount, removeFromCart, updateQuantity, clearCart, loadCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Iconos
  const TrashIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );

  const MinusIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12H4"
      />
    </svg>
  );

  const PlusIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );

  const EmptyCartIcon = () => (
    <svg
      className="w-24 h-24"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      await updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      await clearCart();
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="animate-spin">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mi Carrito</h1>
          <p className="text-gray-400">
            {itemCount === 0
              ? "Tu carrito está vacío"
              : `${itemCount} artículo${itemCount !== 1 ? "s" : ""}`}
          </p>
        </div>

        {items.length === 0 ? (
          // Carrito vacío
          <div className="bg-gray-800 rounded-xl p-12 text-center">
            <div className="flex justify-center mb-4 text-gray-500">
              <EmptyCartIcon />
            </div>
            <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-6">
              Añade productos deliciosos desde el menú
            </p>
            <Link
              to="/menu"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Ir al Menú
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-xl overflow-hidden">
                {items.map((item, index) => (
                  <div
                    key={item.product.id || index}
                    className={`p-6 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors ${
                      loading ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Imagen */}
                      <div className="flex-shrink-0">
                        {item.product.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">📦</span>
                          </div>
                        )}
                      </div>

                      {/* Detalles */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">
                          {item.product.description}
                        </p>

                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-gray-900 rounded-lg border border-gray-700">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 hover:bg-gray-800 transition-colors"
                              disabled={loading}
                            >
                              <MinusIcon />
                            </button>
                            <span className="px-4 py-2 font-bold min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 hover:bg-gray-800 transition-colors"
                              disabled={loading || item.quantity >= 99}
                            >
                              <PlusIcon />
                            </button>
                          </div>

                          <span className="text-xl font-bold text-red-500">
                            S/{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Botón eliminar */}
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="p-2 hover:bg-red-600/30 rounded-lg transition-colors text-red-500"
                          disabled={loading}
                          title="Eliminar producto"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>

                    {/* Instrucciones especiales */}
                    {item.specialInstructions && (
                      <div className="mt-3 p-2 bg-gray-900 rounded border border-gray-700">
                        <p className="text-sm text-gray-400">
                          <strong>Nota:</strong> {item.specialInstructions}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Botón vaciar carrito */}
              {items.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
                  >
                    Vaciar carrito
                  </button>
                </div>
              )}
            </div>

            {/* Resumen de orden */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl p-6 sticky top-20">
                <h2 className="text-2xl font-bold mb-6">Resumen</h2>

                {/* Detalles */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-bold">S/{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Envío</span>
                    <span className="font-bold">Gratis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Impuestos</span>
                    <span className="font-bold">
                      S/{(total * 0.21).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-bold text-red-500">
                      S/{(total * 1.21).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Botones */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
                    disabled={loading || items.length === 0}
                  >
                    {user ? "Proceder a Pagar" : "Iniciar Sesión para Comprar"}
                  </button>
                  <Link
                    to="/menu"
                    className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Seguir Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
