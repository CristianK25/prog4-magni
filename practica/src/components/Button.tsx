import React from 'react';

// 1. Definimos las Props usando una Interface.
// Las Props son la forma en que los componentes "padre" envían información
// y configuración a los componentes "hijo".
export interface ButtonProps {
  /** Texto o elementos que van dentro del botón */
  children: React.ReactNode;
  /** Función que se ejecuta al hacer clic */
  onClick?: () => void;
  /** Variante visual del botón (opcional, con valor por defecto) */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Tamaño del botón (opcional) */
  size?: 'small' | 'medium' | 'large';
  /** Si el botón está deshabilitado */
  disabled?: boolean;
}

/**
 * Componente genérico Button.
 * Demuestra cómo recibir props, tiparlas y utilizarlas para modificar
 * el comportamiento y estilo del componente (ahora utilizando clases de Tailwind).
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary', // Valor por defecto
  size = 'medium',     // Valor por defecto
  disabled = false,
}) => {
  // Determinamos las clases de Tailwind base
  const baseClasses = 'border-none rounded cursor-pointer transition-colors duration-200 text-white';
  
  // Clases dinámicas dependiendo de la variante
  let variantClasses = '';
  if (disabled) {
    variantClasses = 'bg-gray-400 cursor-not-allowed';
  } else {
    switch (variant) {
      case 'primary': variantClasses = 'bg-blue-600 hover:bg-blue-700'; break;
      case 'secondary': variantClasses = 'bg-gray-600 hover:bg-gray-700'; break;
      case 'danger': variantClasses = 'bg-red-600 hover:bg-red-700'; break;
      default: variantClasses = 'bg-blue-600 hover:bg-blue-700';
    }
  }

  // Clases dinámicas dependiendo del tamaño
  let sizeClasses = '';
  switch (size) {
    case 'small': sizeClasses = 'px-2 py-1 text-sm'; break;
    case 'medium': sizeClasses = 'px-4 py-2 text-base'; break;
    case 'large': sizeClasses = 'px-6 py-3 text-lg'; break;
    default: sizeClasses = 'px-4 py-2 text-base';
  }

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${sizeClasses}`}
      onClick={onClick} 
      disabled={disabled}
    >
      {/* 
        La prop "children" es especial en React.
        Representa todo lo que se coloca entre la etiqueta de apertura y cierre
        al usar el componente: <Button> ESTO ES EL CHILDREN </Button> 
      */}
      {children}
    </button>
  );
};
