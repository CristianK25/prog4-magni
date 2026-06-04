import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AuthProvider } from '../context/AuthContext';

/**
 * AppRouter.
 * 
 * En React, el archivo de rutas (Router) es el "punto de entrada" de la UI.
 * Su responsabilidad es:
 * 1. Envolver toda la aplicación en los Proveedores Globales (ej. AuthProvider).
 * 2. Definir qué componente (Página) se muestra en qué URL.
 * 3. Manejar rutas desconocidas (404).
 */
export const AppRouter: React.FC = () => {
  return (
    // Envolvemos la app en el AuthProvider para que todas las páginas tengan
    // acceso al contexto de autenticación.
    <AuthProvider>
      {/* BrowserRouter habilita el enrutamiento basado en la URL del navegador */}
      <BrowserRouter>
        <Routes>
          {/* Ruta principal: Muestra el HomePage */}
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta para capturar cualquier URL inválida (404 Not Found) */}
          {/* En este caso simple, redirigimos al usuario al Home usando Navigate */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
