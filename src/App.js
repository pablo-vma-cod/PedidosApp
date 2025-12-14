import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './presentation/hooks/useTheme';
import Navbar from './presentation/components/Navbar';
import HomePage from './presentation/pages/HomePage'; 
import LoginPage from './presentation/pages/LoginPage';
import RestaurantsPage from './presentation/pages/RestaurantsPage';
import MenuPage from './presentation/pages/MenuPage';
import CartPage from './presentation/pages/CartPage';
import CheckoutPage from './presentation/pages/CheckoutPage';
import OrdersPage from './presentation/pages/OrdersPage';

function App() {
  const { isDarkMode } = useTheme();

  return (
    <Router>
      <div className={`App flex flex-col min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/restaurants/:id/menu" element={<MenuPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;