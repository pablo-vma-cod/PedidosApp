import React from 'react';

const CategorySkeleton = () => {
  return (
    // Simula un botón de categoría: fondo gris, altura de línea, animación.
    // La clase 'w-full' asegura que ocupe todo el ancho como los botones reales.
    <div className="w-full text-left py-2 px-3 rounded-lg mb-1">
      <div className="h-5 bg-gray-700 rounded w-2/3 animate-pulse"></div>
    </div>
  );
};

export default CategorySkeleton;