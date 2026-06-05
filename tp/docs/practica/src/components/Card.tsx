import React from 'react';

// 1. Props mínimas
export interface CardProps {
  title: string;
  children: React.ReactNode; // El contenido
}

// 2. Componente contenedor súper básico
export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    // Un simple div con bordes
    <div className="border border-gray-300 rounded p-4 my-2 shadow bg-white">
      {/* Título */}
      <h3 className="font-bold text-lg border-b pb-2 mb-2">{title}</h3>
      
      {/* Contenido */}
      <div>
        {children}
      </div>
    </div>
  );
};
