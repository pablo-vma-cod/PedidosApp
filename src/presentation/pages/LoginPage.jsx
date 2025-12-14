import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import LoginPageSkeleton from "../components/LoginPageSkeleton";
import useLoading from "../hooks/useLoading";
import { useAuth } from "../hooks/useAuth";
import bgImage from "../assets/fondo_login.png";

// Iconos (sin cambios)
const DeliveryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 7.5a.5.5 0 01.5-.5h.714l1.378-2.756A.5.5 0 016.037 4h11.926a.5.5 0 01.445.244L20.786 7H21.5a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-18a.5.5 0 01-.5-.5v-10zm1 1h16v8.5a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5V8.5zm12.5 7a.5.5 0 100-1 .5.5 0 000 1zm-8 0a.5.5 0 100-1 .5.5 0 000 1zM7 7.714L6.143 6h10.714l-1.378 2.714H7z" fill="currentColor"/>
    <circle cx="8" cy="16" r="1.5" fill="currentColor" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

const EyeOpenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.04 0-5.5-2.46-5.5-5.5S8.96 6.5 12 6.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/>
  </svg>
);

const EyeClosedIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7c-2.76 0-5 2.24-5 5 0 .66.13 1.29.35 1.88l-2.91-2.91c-.96 1.54-1.54 3.23-1.54 5.03 0 4.47 4.19 7.42 8.44 7.49l2.7-2.7c-1.89-.52-3.32-2.13-3.32-4.04 0-2.5 2.07-4.57 4.57-4.57.87 0 1.68.25 2.39.67l2.13-2.13c-.92-.5-1.92-.87-3-.97V7zM2.81 2.81L1 4.62l3.41 3.41c-.49 1.14-.8 2.38-.8 3.7c0 4.47 4.19 7.42 8.44 7.49l1.58-1.58 3.59 3.59 1.81-1.81L2.81 2.81z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" className="inline-block">
    <path fill="#FFC107" d="M43.61,20.08a20.08,20.08,0,0,0-1.87-8.15H24v7.75H35.84a9.77,9.77,0,0,1-4.28,6.4V34.59h6.41A23.83,23.83,0,0,0,43.61,20.08Z" />
    <path fill="#4CAF50" d="M24,44c6.27,0,11.53-2.07,15.37-5.63l-6.41-5c-1.78,1.19-4.06,1.9-6.96,1.9-5.32,0-9.84-3.56-11.43-8.49H6.18V35.6A23.9,23.9,0,0,0,24,44Z" />
    <path fill="#1976D2" d="M12.57,28.84a14.36,14.36,0,0,1,0-9.68V10.22H6.18A23.9,23.9,0,0,0,0,24a23.9,23.9,0,0,0,6.18,13.78l6.39-4.94Z" />
    <path fill="#F44336" d="M24,9.58c3.27,0,6.17,1.13,8.49,3.32L38.4,7.57C34.56,3.95,29.3,2,24,2A23.9,23.9,0,0,0,0,24l6.18,4.78A14.36,14.36,0,0,1,24,9.58Z" />
  </svg>
);

// ========================================
// 🎯 COMPONENTE PRINCIPAL - SIMPLIFICADO
// ========================================
export default function LoginPage() {
  // 🎯 HOOKS - Lógica de negocio
  const { isDarkMode } = useTheme();
  const initialLoading = useLoading({ initial: true, delay: 1000 });
  const { loading, error, login, clearError } = useAuth();
  
  // Estado local SOLO para formulario (nada de validaciones)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // 🎯 Handler del formulario - SUPER SIMPLE
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError(); // Limpiar errores previos
    
    // Solo llama al use case - ÉL valida todo
    await login(email, password, rememberMe);
    // El hook se encarga de redirigir si es exitoso
  };

  const primaryButtonClass = 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
  const redFocusRing = 'focus:ring-red-500';
  const inputBaseClass = 'w-full px-4 py-3 border rounded-lg bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2';

  // Mostrar skeleton mientras carga la página
  if (initialLoading) {
    return <LoginPageSkeleton />;
  }

  return (
    <div className={`flex min-h-screen justify-center items-center p-4 sm:p-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <main className={`flex max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* SECCIÓN IZQUIERDA - Imagen de fondo */}
        <section
          className="hidden lg:block w-1/3 min-h-full p-8 relative text-gray-100 shadow-xl"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-label="Cita de un usuario satisfecho con el sistema de pedidos"
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <header className="relative z-10 mb-20">
            <DeliveryIcon className="text-gray-100 w-6 h-6 inline-block mr-2" />
            <span className="text-xl font-semibold text-gray-100">Pedidos Express</span>
          </header>
          <div className="relative z-10 mt-auto pt-40">
            <blockquote className="text-2xl font-semibold leading-relaxed mb-6">
              "Tu comida favorita, entregada en tiempo récord."
            </blockquote>
            <footer className="border-l-4 border-red-500 pl-4">
              <p className="font-bold text-gray-100">UCSS</p>
              <p className="text-sm text-gray-400">Desarrollo basado en plataforma</p>
            </footer>
          </div>
        </section>

        {/* SECCIÓN DERECHA - Formulario */}
        <section className="w-full lg:w-2/3 p-6 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-gray-800">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-100 mb-2" id="login-form-title">
              ¡Bienvenido/a de vuelta!
            </h1>
            <p className="text-gray-400">Ingresa para continuar con tu pedido.</p>
          </header>

          {/* 🎯 Mostrar error general del use case */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="login-form-title">
            {/* EMAIL */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="usuario.correo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
                className={`${inputBaseClass} border-gray-700 focus:border-transparent ${redFocusRing}`}
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-required="true"
                  className={`${inputBaseClass} pr-12 border-gray-700 focus:border-transparent ${redFocusRing}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none focus:text-red-500"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-controls="password"
                >
                  {showPassword ? (
                    <EyeOpenIcon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <EyeClosedIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* OPCIONES */}
            <div className="flex justify-between items-center text-sm">
              <a href="/" className="font-medium text-red-500 hover:text-red-400 focus:outline-none focus:underline" aria-label="¿Olvidaste tu contraseña?">
                ¿Olvidaste tu contraseña?
              </a>
              <div className="flex items-center space-x-2">
                <label htmlFor="rememberMe" className="text-gray-400 select-none">
                  Recordar sesión
                </label>
                <button
                  type="button"
                  id="rememberMe"
                  role="switch"
                  aria-checked={rememberMe}
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${rememberMe ? 'bg-red-600' : 'bg-gray-700'}`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${rememberMe ? 'translate-x-5' : 'translate-x-0'}`}
                  ></span>
                </button>
              </div>
            </div>

            {/* 🎯 BOTÓN - Muestra loading del hook */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-3 rounded-lg transition ease-in-out duration-150 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${primaryButtonClass} focus:ring-offset-2 focus:ring-offset-gray-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Iniciar Sesión"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-700" />
            <span className="px-3 text-sm font-medium text-gray-500">O</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          {/* GOOGLE LOGIN */}
          <button
            className="w-full bg-white border border-gray-700 text-gray-900 font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="Continuar con Google"
          >
            <GoogleIcon />
            <span>Continuar con Google</span>
          </button>

          {/* REGISTRO */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            ¿Aún no tienes cuenta?{" "}
            <a href="/register" className="font-medium text-gray-100 hover:text-gray-300 focus:outline-none focus:underline" aria-label="Regístrate en Pedidos Express">
              Regístrate aquí
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}