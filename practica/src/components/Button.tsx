import React from 'react';

// 1. Las Props más básicas que existen
export interface ButtonProps {
  children: React.ReactNode; // Lo que va adentro del botón (texto)
  onClick: () => void;       // La función a ejecutar al hacer click
}

// 2. Un componente directo y sin lógica compleja
export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button 
      // Usamos Tailwind fijo, sin condicionales ni tamaños dinámicos para que sea fácil de leer
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={onClick} 
    >
      {children}
    </button>
  );
};
