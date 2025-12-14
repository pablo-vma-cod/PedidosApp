// src/components/LoginPageSkeleton.jsx
import React from "react";

export default function LoginPageSkeleton() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-900 p-4 sm:p-0">
      <main className="flex max-w-5xl w-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* lado izquierdo – imagen / background */}
        <section
          className="hidden lg:block w-1/3 min-h-full p-8 relative bg-gray-700 animate-pulse"
          aria-label="Placeholder del panel informativo"
        >
          <div className="absolute inset-0 bg-gray-700"></div>
        </section>

        {/* lado derecho – formulario */}
        <section className="w-full lg:w-2/3 p-6 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center bg-gray-800">
          <div className="mb-8">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
          </div>

          <form className="space-y-6">
            {/* email field skeleton */}
            <div className="space-y-1">
              <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-10 bg-gray-700 rounded w-full animate-pulse"></div>
            </div>

            {/* password field skeleton */}
            <div className="space-y-1">
              <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-10 bg-gray-700 rounded w-full animate-pulse"></div>
            </div>

            {/* remember / link / switch skeleton */}
            <div className="h-10 bg-gray-700 rounded w-full animate-pulse"></div>

            {/* submit button skeleton */}
            <div className="h-12 bg-gray-700 rounded w-full animate-pulse"></div>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-0.5 bg-gray-700 animate-pulse"></div>
            <span className="px-3 h-4 bg-gray-700 rounded w-8 animate-pulse"></span>
            <div className="flex-grow h-0.5 bg-gray-700 animate-pulse"></div>
          </div>

          <div className="h-12 bg-gray-700 rounded w-full animate-pulse"></div>

          <div className="mt-8 text-center text-gray-400 text-sm">
            <div className="h-4 bg-gray-700 rounded w-1/3 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mx-auto mt-2 animate-pulse"></div>
          </div>
        </section>
      </main>
    </div>
  );
}
