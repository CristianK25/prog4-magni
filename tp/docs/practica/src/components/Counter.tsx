import React, { useState } from 'react';
import { Button } from './Button';

// Un contador súper básico para enseñar useState
export const Counter: React.FC = () => {
  // 1. Estado inicial en 0
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border border-gray-300 rounded text-center">
      <h3>Contador Básico</h3>
      
      {/* 2. Mostramos el número */}
      <p className="text-2xl font-bold my-4">{count}</p>
      
      {/* 3. Botones para sumar o restar */}
      <div className="flex justify-center gap-2">
        <Button onClick={() => setCount(count - 1)}>-1</Button>
        <Button onClick={() => setCount(0)}>Reset</Button>
        <Button onClick={() => setCount(count + 1)}>+1</Button>
      </div>
    </div>
  );
};
