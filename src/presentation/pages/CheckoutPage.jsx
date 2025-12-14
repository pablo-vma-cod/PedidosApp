import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

export default function CheckoutPage() {
  const { isDarkMode } = useTheme();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Dirección, 2: Pago, 3: Confirmación
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  // Card payment state
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });

  const deliveryFee = 3.50;
  const tax = total * 0.21;
  const finalTotal = total + deliveryFee + tax;

  // Iconos
  const MapIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    </svg>
  );

  const CreditCardIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h.01M11 15h.01M15 15h.01M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  );

  const CashIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const WalletIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h.01M11 15h.01M15 15h.01M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    // Validaciones
    if (!deliveryAddress.trim()) {
      alert("Por favor ingresa tu dirección de entrega");
      setLoading(false);
      return;
    }

    if (paymentMethod === "card") {
      if (!cardData.cardNumber || !cardData.cardHolder || !cardData.expiryDate || !cardData.cvv) {
        alert("Por favor completa todos los datos de la tarjeta");
        setLoading(false);
        return;
      }
    }

    // Simular procesamiento
    setTimeout(async () => {
      // Aquí iría la llamada a crear la orden
      console.log({
        items,
        deliveryAddress,
        paymentMethod,
        specialInstructions,
        totalAmount: finalTotal
      });

      // Pasar a confirmación
      setStep(3);
      setLoading(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
          <button
            onClick={() => navigate("/restaurants")}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Volver a Restaurantes
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Debes iniciar sesión para comprar</h2>
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
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress */}
        <div className="flex justify-between mb-12">
          {[
            { num: 1, label: "Dirección" },
            { num: 2, label: "Pago" },
            { num: 3, label: "Confirmación" }
          ].map(s => (
            <div key={s.num} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all ${
                  step >= s.num
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {step > s.num ? <CheckIcon /> : s.num}
              </div>
              <span className="text-sm text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <MapIcon />
                  Dirección de Entrega
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Dirección Completa</label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Calle, número, referencias..."
                      className="w-full px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Instrucciones Especiales (Opcional)</label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Ej: Timbre no funciona, dejar en la puerta..."
                      className="w-full px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                      rows="2"
                    />
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!deliveryAddress.trim()}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Continuar al Pago
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Método de Pago</h2>

                <div className="space-y-4 mb-6">
                  {/* Efectivo */}
                  <label className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === "cash"
                      ? "border-red-600 bg-red-600/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3">
                      <CashIcon />
                      <div>
                        <p className="font-bold">Pago en Efectivo</p>
                        <p className="text-sm text-gray-400">Paga al recibir tu pedido</p>
                      </div>
                    </div>
                  </label>

                  {/* Tarjeta */}
                  <label className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-red-600 bg-red-600/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3">
                      <CreditCardIcon />
                      <div>
                        <p className="font-bold">Tarjeta de Crédito/Débito</p>
                        <p className="text-sm text-gray-400">Visa, Mastercard</p>
                      </div>
                    </div>
                  </label>

                  {/* Billetera */}
                  <label className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === "wallet"
                      ? "border-red-600 bg-red-600/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={paymentMethod === "wallet"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3">
                      <WalletIcon />
                      <div>
                        <p className="font-bold">Billetera Digital</p>
                        <p className="text-sm text-gray-400">Saldo disponible</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Formulario de tarjeta */}
                {paymentMethod === "card" && (
                  <div className="bg-gray-900 p-6 rounded-lg mb-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Número de Tarjeta</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Titular</label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={cardData.cardHolder}
                        onChange={handleCardInputChange}
                        placeholder="Juan Pérez"
                        className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Vencimiento</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardData.expiryDate}
                          onChange={handleCardInputChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          maxLength="3"
                          className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    {loading ? "Procesando..." : "Confirmar Pedido"}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-2">¡Pedido Confirmado!</h2>
                <p className="text-gray-400 mb-6">Tu pedido ha sido creado exitosamente</p>

                <div className="bg-gray-900 p-6 rounded-lg mb-8 text-left">
                  <p className="mb-2"><span className="text-gray-400">Método de pago:</span> <span className="font-bold">{paymentMethod === "cash" ? "Efectivo" : paymentMethod === "card" ? "Tarjeta" : "Billetera"}</span></p>
                  <p className="mb-2"><span className="text-gray-400">Dirección:</span> <span className="font-bold">{deliveryAddress}</span></p>
                  <p><span className="text-gray-400">Tiempo estimado:</span> <span className="font-bold">30 minutos</span></p>
                </div>

                <button
                  onClick={async () => {
                    await clearCart();
                    navigate("/orders");
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Ver mi Pedido
                </button>
              </div>
            )}
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>

              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-bold">
                      S/{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span>S/{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Envío</span>
                  <span>S/{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Impuestos (21%)</span>
                  <span>S/{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-red-500">
                    S/{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
