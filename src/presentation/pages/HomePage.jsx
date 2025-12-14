import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import nuggetsImg from "../assets/nuggets.png";
import burgerImg from "../assets/americana.png";
import friesImg from "../assets/papas_extra.png";
import sundaeImg from "../assets/sundae_chocolate.png";

// === ICONOS ===
const DeliveryIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7.5h18M5 7.5V5h14v2.5M5 7.5L3 18h18l-2-10.5M9 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm9 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
);

const ZapIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const ClockIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ShieldIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    />
  </svg>
);

const StarIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.25l-7.19-.62L12 2 9.19 8.63 2 9.25l5.46 4.72L5.82 21z" />
  </svg>
);

const MapPinIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const TrendingUpIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

// === COMPONENTE PRINCIPAL ===
export default function HomePage() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* === HERO ÉPICO === */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Fondo con gradiente animado */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
          {/* Orbes animados */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 -right-32 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        {/* Grid de fondo */}
        <div className="absolute inset-0 z-0 opacity-5" style={{backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(#fff 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>

        {/* Contenido Principal */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col lg:flex-row items-center gap-12">
          {/* Lado Izquierdo - Contenido */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 mb-8 px-4 py-2 bg-gradient-to-r from-red-600/20 to-amber-500/20 border border-red-500/50 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-red-300">✨ La forma más rápida de pedir</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
              Pide <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400">comida</span> en
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">segundos</span>
            </h1>

            {/* Descripción */}
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Los mejores restaurantes de tu ciudad a un clic de distancia. Entrega rápida, pagos seguros y promociones exclusivas todos los días.
            </p>

            {/* Estadísticas rápidas */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12 justify-center lg:justify-start">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-red-600/20 rounded-lg border border-red-500/50">
                  <ZapIcon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Entrega</p>
                  <p className="font-bold text-white">25-30 min</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-600/20 rounded-lg border border-amber-500/50">
                  <StarIcon className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Calificación</p>
                  <p className="font-bold text-white">4.8+ ⭐</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-lg border border-green-500/50">
                  <ShieldIcon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Seguridad</p>
                  <p className="font-bold text-white">100%</p>
                </div>
              </div>
            </div>

            {/* Botones CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/restaurants"
                className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-600/50 flex items-center justify-center"
              >
                <span>Explorar Restaurantes</span>
                <span className="ml-2">→</span>
              </Link>
              <Link
                to="/restaurants"
                className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl transition-all duration-300 border border-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                Ver Menú
              </Link>
            </div>
          </div>

          {/* Lado Derecho - Productos */}
          <div className="flex-1 relative h-96 md:h-full hidden md:flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Tarjetas flotantes */}
              <div className="relative w-64 h-80">
                {/* Tarjeta 1 - Arriba */}
                <div className="absolute -top-12 left-0 w-48 h-64 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl shadow-2xl overflow-hidden transform -rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer border border-red-500/50">
                  <img src={nuggetsImg} alt="Nuggets" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div>
                      <p className="text-white font-bold text-xl">Nuggets Crujientes</p>
                      <p className="text-amber-300 font-bold text-2xl">S/ 25.00</p>
                    </div>
                  </div>
                </div>

                {/* Tarjeta 2 - Centro */}
                <div className="absolute inset-0 w-48 h-64 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl shadow-2xl overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer border border-amber-500/50 z-20">
                  <img src={burgerImg} alt="Burger" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div>
                      <p className="text-white font-bold text-xl">Burger Premium</p>
                      <p className="text-amber-300 font-bold text-2xl">S/ 32.00</p>
                    </div>
                  </div>
                </div>

                {/* Tarjeta 3 - Abajo */}
                <div className="absolute -bottom-12 right-0 w-48 h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden transform rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer border border-purple-500/50">
                  <img src={sundaeImg} alt="Dessert" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div>
                      <p className="text-white font-bold text-xl">Sundae Chocolate</p>
                      <p className="text-amber-300 font-bold text-2xl">S/ 18.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* === BÚSQUEDA RÁPIDA === */}
      <section className={`relative -mt-12 py-12 px-4 sm:px-6 lg:px-8 z-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-2xl shadow-2xl p-6 md:p-8 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
            <h3 className={`text-2xl font-bold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <MapPinIcon className="w-6 h-6 text-red-500 mr-3" />
              ¿Dónde quieres comer?
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Ingresa tu dirección o zona..."
                className={`flex-1 px-6 py-3 rounded-lg border focus:border-red-500 focus:outline-none placeholder-gray-400 transition ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              />
              <Link
                to="/restaurants"
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
              >
                Buscar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === CARACTERÍSTICAS PRINCIPALES === */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              ¿Por qué elegir <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">PedidosApp</span>?
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-amber-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                Icon: ZapIcon,
                title: "Entrega Rápida",
                desc: "En promedio 25-30 minutos a tu puerta.",
                color: "from-red-600 to-orange-500",
              },
              {
                Icon: ClockIcon,
                title: "Disponible 24/7",
                desc: "Pide a cualquier hora, todos los días.",
                color: "from-blue-600 to-cyan-500",
              },
              {
                Icon: ShieldIcon,
                title: "100% Seguro",
                desc: "Pagos encriptados y repartidores verificados.",
                color: "from-green-600 to-emerald-500",
              },
              {
                Icon: StarIcon,
                title: "Calidad Garantizada",
                desc: "Solo los mejores restaurantes certificados.",
                color: "from-amber-600 to-yellow-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl p-8 shadow-xl border hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-amber-400/0 group-hover:from-red-600/10 group-hover:to-amber-400/10 rounded-2xl transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${item.color} rounded-xl mb-4 shadow-lg`}>
                    <item.Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === ESTADÍSTICAS === */}
      <section className="py-16 md:py-24 bg-gray-800 border-y border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "50K+", label: "Órdenes Entregadas", icon: "🚚" },
              { number: "500+", label: "Restaurantes Asociados", icon: "🏪" },
              { number: "98%", label: "Clientes Satisfechos", icon: "😊" },
            ].map((stat, i) => (
              <div key={i} className="p-8">
                <div className="text-5xl mb-3">{stat.icon}</div>
                <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400 mb-2">
                  {stat.number}
                </p>
                <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PLATOS POPULARES === */}
      <section className={`py-16 md:py-24 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                Platos Más Populares
              </h2>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Lo que los clientes más piden ahora mismo</p>
            </div>
            <Link
              to="/restaurants"
              className="hidden md:flex items-center text-red-500 hover:text-red-400 font-bold text-lg transition"
            >
              Ver Todos
              <TrendingUpIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Nuggets Crujientes",
                price: "S/25.00",
                img: nuggetsImg,
                badge: "-20%",
                badge_color: "bg-red-600",
                rating: 4.8,
              },
              {
                name: "Hamburguesa Doble Premium",
                price: "S/32.00",
                img: burgerImg,
                badge: "Top",
                badge_color: "bg-amber-600",
                rating: 4.9,
              },
              {
                name: "Papas Extra Crujientes",
                price: "S/15.00",
                img: friesImg,
                badge: "Favorito",
                badge_color: "bg-green-600",
                rating: 4.7,
              },
              {
                name: "Sundae Chocolate Derretido",
                price: "S/18.00",
                img: sundaeImg,
                badge: "Nuevo",
                badge_color: "bg-purple-600",
                rating: 4.6,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden shadow-xl border hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 ${isDarkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 hover:shadow-red-500/30' : 'bg-gradient-to-b from-gray-100 to-gray-50 border-gray-200 hover:shadow-lg'}`}
              >
                {/* Badge */}
                <div className={`absolute top-4 right-4 ${item.badge_color} text-white text-xs font-bold px-3 py-1 rounded-full z-20`}>
                  {item.badge}
                </div>

                {/* Rating */}
                <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center z-20 border border-gray-700">
                  <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-white font-bold text-sm">{item.rating}</span>
                </div>

                {/* Imagen */}
                <div className="relative h-48 overflow-hidden bg-gray-800">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Contenido */}
                <div className="p-5">
                  <h3 className={`text-lg font-bold mb-2 line-clamp-2 group-hover:text-red-400 transition ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
                      {item.price}
                    </p>
                  </div>
                  <Link
                    to="/restaurants"
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 inline-block text-center"
                  >
                    Pedir Ahora
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              to="/restaurants"
              className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Ver Menú Completo
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* === CTA SECCIÓN === */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-red-600 via-red-500 to-amber-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            ¿Tienes hambre?
          </h2>
          <p className="text-xl text-gray-50 mb-10 max-w-2xl mx-auto">
            Descubre cientos de restaurantes a tu alrededor. Pide ahora y recibe tu comida caliente en pocos minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/restaurants"
              className="px-10 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Explorar Restaurantes
            </Link>
            <Link
              to="/menu"
              className="px-10 py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg font-bold text-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/50"
            >
              Ver Promociones
            </Link>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className={`border-t py-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <DeliveryIcon className="w-8 h-8 text-red-500" />
                <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Pedidos<span className="text-red-500">App</span>
                </span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Entrega rápida y segura de tus comidas favoritas.
              </p>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Para Ti</h4>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><Link to="/restaurants" className="hover:text-red-500 transition">Restaurantes</Link></li>
                <li><Link to="/menu" className="hover:text-red-500 transition">Menú</Link></li>
                <li><button onClick={() => {}} className="hover:text-red-500 transition text-left">Promociones</button></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Ayuda</h4>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><button onClick={() => {}} className="hover:text-red-500 transition text-left">Contacto</button></li>
                <li><button onClick={() => {}} className="hover:text-red-500 transition text-left">FAQ</button></li>
                <li><button onClick={() => {}} className="hover:text-red-500 transition text-left">Términos</button></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Síguenos</h4>
              <div className={`flex space-x-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <button onClick={() => window.scrollTo(0,0)} className="hover:text-red-500 transition">🌐 Web</button>
                <button onClick={() => window.scrollTo(0,0)} className="hover:text-red-500 transition">📱 App</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} PedidosApp. Todos los derechos reservados. | Hecho con ❤️ para ti</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
