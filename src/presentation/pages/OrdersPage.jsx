import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Simular carga de órdenes desde localStorage
    setTimeout(() => {
      const mockOrders = [
        {
          id: "ORD001",
          restaurantName: "Burger Master",
          status: "delivered",
          items: [
            { name: "Clásica Americana", quantity: 2, price: 22 },
            { name: "Papas Fritas", quantity: 1, price: 15 }
          ],
          totalAmount: 70.50,
          deliveryAddress: "Av. Principal 123",
          deliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          estimatedDeliveryTime: 25,
          paymentMethod: "cash"
        },
        {
          id: "ORD002",
          restaurantName: "Pizza Napolitana",
          status: "on_way",
          items: [
            { name: "Pizza Margherita", quantity: 1, price: 32 }
          ],
          totalAmount: 45.75,
          deliveryAddress: "Calle San Isidro 456",
          deliveryDate: new Date(),
          estimatedDeliveryTime: 30,
          paymentMethod: "card"
        },
        {
          id: "ORD003",
          restaurantName: "Sushi Paradise",
          status: "preparing",
          items: [
            { name: "Sushi Mix", quantity: 2, price: 45 },
            { name: "Tempura", quantity: 1, price: 25 }
          ],
          totalAmount: 126.50,
          deliveryAddress: "Av. Javier Prado 789",
          deliveryDate: new Date(),
          estimatedDeliveryTime: 35,
          paymentMethod: "wallet"
        }
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  // Iconos
  const getStatusIcon = (status) => {
    const icons = {
      pending: (
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
      ),
      confirmed: (
        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      preparing: (
        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      on_way: (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      delivered: (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      cancelled: (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    };
    return icons[status] || null;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Pendiente",
      confirmed: "Confirmado",
      preparing: "Preparando",
      on_way: "En camino",
      delivered: "Entregado",
      cancelled: "Cancelado"
    };
    return labels[status] || status;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Debes iniciar sesión para ver tus pedidos</h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Ir al Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Mis Pedidos</h1>
        <p className="text-gray-400 mb-8">Aquí puedes ver el estado de tus pedidos</p>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-xl">
            <h2 className="text-2xl font-bold mb-2">No tienes pedidos aún</h2>
            <p className="text-gray-400 mb-6">Comienza a pedir ahora mismo</p>
            <button
              onClick={() => navigate("/restaurants")}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Explorar Restaurantes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de órdenes */}
            <div className="lg:col-span-2 space-y-4">
              {orders.map(order => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-6 rounded-xl cursor-pointer transition-all transform hover:scale-[1.02] ${
                    selectedOrder?.id === order.id
                      ? "bg-red-600/20 border-2 border-red-600"
                      : "bg-gray-800 border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{order.restaurantName}</h3>
                      <p className="text-sm text-gray-400">Pedido #{order.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-bold">{getStatusLabel(order.status)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-400">Total</p>
                      <p className="font-bold text-lg">S/{order.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Fecha</p>
                      <p className="font-bold">{order.deliveryDate.toLocaleDateString()}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400">{order.items.length} artículo{order.items.length !== 1 ? "s" : ""}</p>
                </div>
              ))}
            </div>

            {/* Detalle de orden seleccionada */}
            {selectedOrder && (
              <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-xl p-6 sticky top-20">
                  <h2 className="text-2xl font-bold mb-4">Detalles del Pedido</h2>

                  {/* Estado con progreso */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      {getStatusIcon(selectedOrder.status)}
                      <div>
                        <p className="font-bold">{getStatusLabel(selectedOrder.status)}</p>
                        <p className="text-sm text-gray-400">
                          Entrega estimada: {selectedOrder.estimatedDeliveryTime} min
                        </p>
                      </div>
                    </div>

                    {/* Barra de progreso */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span>Confirmado</span>
                        <span>Preparando</span>
                        <span>En camino</span>
                        <span>Entregado</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full transition-all"
                          style={{
                            width: selectedOrder.status === "pending" ? "10%" :
                                   selectedOrder.status === "confirmed" ? "25%" :
                                   selectedOrder.status === "preparing" ? "50%" :
                                   selectedOrder.status === "on_way" ? "75%" :
                                   "100%"
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <h3 className="font-bold mb-3">Productos</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-400">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-bold">
                            S/{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <h3 className="font-bold mb-2">Dirección de Entrega</h3>
                    <p className="text-sm text-gray-400">{selectedOrder.deliveryAddress}</p>
                  </div>

                  {/* Método de pago */}
                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <h3 className="font-bold mb-2">Método de Pago</h3>
                    <p className="text-sm text-gray-400">
                      {selectedOrder.paymentMethod === "cash" ? "Efectivo" :
                       selectedOrder.paymentMethod === "card" ? "Tarjeta" :
                       "Billetera"}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold text-red-500">
                        S/{selectedOrder.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="mt-6 space-y-2">
                    {selectedOrder.status !== "delivered" && selectedOrder.status !== "cancelled" && (
                      <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition-colors">
                        Contactar Restaurante
                      </button>
                    )}
                    <button
                      onClick={() => navigate("/restaurants")}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition-colors"
                    >
                      Hacer otro Pedido
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
