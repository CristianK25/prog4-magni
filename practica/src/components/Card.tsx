import React from 'react';

// Interfaces para tipar las Props
export interface CardProps {
  /** Título de la tarjeta */
  title: string;
  /** Contenido principal de la tarjeta (uso de children) */
  children: React.ReactNode;
  /** Elemento opcional para renderizar acciones (ej: botones en el pie de la tarjeta) */
  footer?: React.ReactNode;
}

/**
 * Componente genérico Card.
 * Demuestra la composición de componentes en React.
 * Utiliza Tailwind para el estilizado mediante className.
 */
export const Card: React.FC<CardProps> = ({ title, children, footer }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden bg-white my-3">
      {/* Encabezado fijo controlado por la prop title */}
      <h3 className="bg-gray-50 p-4 border-b border-gray-200 m-0 text-lg font-bold">
        {title}
      </h3>
      
      {/* El contenido principal que el usuario inyecta al usar el Card */}
      <div className="p-4">
        {children}
      </div>

      {/* Renderizado condicional: El footer solo se muestra si el padre pasó la prop footer */}
      {footer && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-right">
          {footer}
        </div>
      )}
    </div>
  );
};
