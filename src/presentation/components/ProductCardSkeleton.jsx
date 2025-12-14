import React from "react";

// Este componente simula la estructura visual de ProductCard, 
// usando las clases de animación y fondo de Tailwind (bg-gray-700, animate-pulse).
const ProductCardSkeleton = () => {
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden h-96"> 
            <div className="w-full h-48 bg-gray-700 animate-pulse">
            </div>

            <div className="p-4">
                <div className="h-6 bg-gray-700 rounded-md w-3/4 mb-3 animate-pulse"></div>

                <div className="h-4 bg-gray-700 rounded-md w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded-md w-5/6 mb-4 animate-pulse"></div>
                
                <div className="flex justify-between items-center mt-4">
                    <div className="h-8 bg-red-600/50 rounded-lg w-1/3 animate-pulse"></div>
                    <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;