import React, { useState } from 'react';
import { Button } from './Button';

/**
 * Componente genérico Counter.
 * Demuestra el uso del hook básico `useState` para manejar un
 * estado simple numérico dentro del componente.
 * Estilos implementados de manera limpia con Tailwind CSS.
 */
export const Counter: React.FC = () => {
  // `useState` devuelve un arreglo con dos elementos:
  // 1. El valor actual del estado (count)
  // 2. Una función para actualizar ese estado (setCount)
  // El "0" que le pasamos a useState es el valor inicial.
  const [count, setCount] = useState<number>(0);

  // Funciones manejadoras de eventos (Handlers)
  const handleIncrement = () => {
    // Al llamar a setCount, React sabe que el estado cambió y vuelve a renderizar
    // el componente con el nuevo valor.
    setCount(count + 1);
  };

  const handleDecrement = () => {
    // Es buena práctica usar la versión con "función callback" de setCount 
    // cuando el nuevo estado depende del estado anterior.
    setCount((prevCount) => prevCount - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="p-5 border border-gray-300 rounded-lg text-center max-w-[300px] my-5">
      <h3 className="text-xl font-semibold mb-4">Contador con useState</h3>
      
      {/* Mostramos el valor actual del estado */}
      <p className="text-3xl font-bold mb-6">{count}</p>
      
      <div className="flex justify-center gap-3">
        {/* Reutilizamos nuestro componente Button genérico */}
        <Button onClick={handleDecrement} variant="secondary">-1</Button>
        <Button onClick={handleReset} variant="danger">Reset</Button>
        <Button onClick={handleIncrement} variant="primary">+1</Button>
      </div>
    </div>
  );
};
