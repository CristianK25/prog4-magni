import { useState } from 'react';

/**
 * Custom Hook súper simplificado para exámenes.
 * Sirve para guardar un dato en la pantalla (useState) y en el navegador a la vez.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  
  // 1. Buscamos si ya existe el dato guardado de antes.
  const datoGuardado = localStorage.getItem(key);
  
  // 2. Si existe lo convertimos, si no, usamos el valor inicial que nos pasaron.
  const valorInicialReal = datoGuardado ? JSON.parse(datoGuardado) : initialValue;

  // 3. Creamos el estado normal de React
  const [valor, setValor] = useState<T>(valorInicialReal);

  // 4. Creamos una función que actualiza ambas cosas a la vez
  const guardarValor = (nuevoValor: T) => {
    setValor(nuevoValor); // Actualiza la pantalla (React)
    localStorage.setItem(key, JSON.stringify(nuevoValor)); // Guarda en el navegador (LocalStorage)
  };

  // 5. Devolvemos el valor actual y la función para cambiarlo
  return [valor, guardarValor] as const;
}
