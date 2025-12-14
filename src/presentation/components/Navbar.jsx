import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount, loadCart } = useCart();
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cargar carrito al montar
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  const MenuIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const UserIcon = () => (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
      <path fillRule="evenodd" d="M.458 10C1.732 5.943 6.638 3 12 3s10.268 2.943 11.542 7c-1.274 4.057-6.18 7-11.542 7S1.732 14.057.458 10zM14 12a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
    </svg>
  );

  const LogoutIcon = () => (
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
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );

  const CartIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );

  const DeliveryIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 7.5a.5.5 0 01.5-.5h.714l1.378-2.756A.5.5 0 016.037 4h11.926a.5.5 0 01.445.244L20.786 7H21.5a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-18a.5.5 0 01-.5-.5v-10zm1 1h16v8.5a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5V8.5zm12.5 7a.5.5 0 100-1 .5.5 0 000 1zm-8 0a.5.5 0 100-1 .5.5 0 000 1zM7 7.714L6.143 6h10.714l-1.378 2.714H7z"
        fill="currentColor"
      />
      <circle cx="8" cy="16" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );

  return (
    <nav className={`'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre */}
          <Link to="/home" className={`flex items-center space-x-2 font-bold text-xl transition-colors ${isDarkMode ? 'text-red-600 hover:text-red-500' : 'text-red-500 hover:text-red-600'}`}>
            <DeliveryIcon />
            <span>Pedidos Express</span>
          </Link>

          {/* Menú desktop */}
          <div className={`hidden md:flex items-center space-x-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <Link
              to="/home"
              className={`hover:text-red-500 transition-colors font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
            >
              Inicio
            </Link>
            <Link
              to="/restaurants"
              className={`hover:text-red-500 transition-colors font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
            >
              Restaurantes
            </Link>
            <Link
              to="/menu"
              className={`hover:text-red-500 transition-colors font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
            >
              Menú
            </Link>
          </div>

          {/* Sección derecha - Carrito y Usuario */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Carrito */}
            <Link
              to="/cart"
              className={`relative transition-colors text-gray-100 hover:text-red-500' : 'text-gray-900 hover:text-red-500'}`}
            >
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Usuario o Login */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/orders"
                  className={`transition-colors font-medium text-sm ${isDarkMode ? 'text-gray-100 hover:text-red-500' : 'text-gray-900 hover:text-red-500'}`}
                >
                  Mis Pedidos
                </Link>
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  <UserIcon />
                  <span className="font-medium">{user.name || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  <LogoutIcon />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Iniciar sesión
              </Link>
            )}
          </div>

          {/* Botón hamburguesa mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden transition-colors ${isDarkMode ? 'text-gray-100 hover:text-red-500' : 'text-gray-900 hover:text-red-500'}`}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Menú mobile */}
        {isMenuOpen && (
          <div className={`md:hidden border-t py-4 space-y-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
            <Link
              to="/home"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-medium px-4 transition-colors ${isDarkMode ? 'text-gray-100 hover:text-red-500' : 'text-gray-900 hover:text-red-500'}`}
            >
              Inicio
            </Link>
            <Link
              to="/restaurants"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-medium px-4 transition-colors ${isDarkMode ? 'text-gray-100 hover:text-red-500' : 'text-gray-900 hover:text-red-500'}`}
            >
              Restaurantes
            </Link>
            <Link
              to="/menu"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-medium px-4 transition-colors ${isDarkMode ? 'text-gray-100 hover:text-red-500' : 'text-gray-900 hover:text-red-500'}`}
            >
              Menú
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center space-x-2 font-medium px-4 transition-colors ${isDarkMode ? 'text-gray-100 hover:text-red-500' : 'text-gray-900 hover:text-red-500'}`}
            >
              <CartIcon />
              <span>Carrito</span>
              {itemCount > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                  {itemCount}
                </span>
              )}
            </Link>
            <div className={`border-t pt-4 px-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {user ? (
                <div className="space-y-3">
                  <div className={`flex items-center space-x-2 font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    <UserIcon />
                    <span>{user.name || user.email}</span>
                  </div>
                  <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Mis Pedidos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <LogoutIcon />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
