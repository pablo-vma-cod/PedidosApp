import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Función para aplicar tema
  const applyTheme = useCallback((isDark) => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
      document.body.className = 'bg-gray-900 text-gray-100';
    } else {
      htmlElement.classList.remove('dark');
      document.body.className = 'bg-white text-gray-900';
    }
  }, []);

  // Inicializar el tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      applyTheme(isDark);
    } else {
      // Por defecto modo oscuro
      setIsDarkMode(true);
      applyTheme(true);
    }
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newIsDark = !prev;
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
      applyTheme(newIsDark);
      return newIsDark;
    });
  }, [applyTheme]);

  return { isDarkMode, toggleTheme };
}
