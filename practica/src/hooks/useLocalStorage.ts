import { useState } from 'react';

/**
 * Custom Hook: useLocalStorage
 * 
 * Este hook nos permite usar el estado local de React (useState) y, al mismo
 * tiempo, sincronizar ese estado con el `localStorage` del navegador.
 * Esto actúa como nuestra "base de datos simulada" para mantener datos
 * incluso si recargamos la página.
 *
 * @param key La clave (string) con la que se guardará el dato en el localStorage.
 * @param initialValue El valor inicial si no existe nada guardado con esa clave.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Inicializamos el estado.
  // Le pasamos una función a useState para que esta lógica de lectura
  // del localStorage se ejecute solo una vez (en el primer render) y no en cada renderizado.
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Intentamos obtener el item del localStorage
      const item = window.localStorage.getItem(key);
      // Si existe, lo parseamos de JSON a un objeto/valor de JS. Si no, devolvemos el valor inicial.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay un error (ej. JSON inválido guardado), devolvemos el inicial por seguridad.
      console.warn(`Error leyendo localStorage para la key "${key}":`, error);
      return initialValue;
    }
  });

  // 2. Creamos una versión envuelta (wrapper) de la función que actualiza el estado.
  // Esto nos permite actualizar tanto el estado de React como el localStorage al mismo tiempo.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitimos que el valor sea una función (igual que el setState normal de React)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
        
      // Actualizamos el estado de React
      setStoredValue(valueToStore);
      
      // Actualizamos el localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error guardando en localStorage para la key "${key}":`, error);
    }
  };

  // 3. Devolvemos el estado actual y la función para actualizarlo, 
  // manteniendo la misma firma (Array tuple) que useState normal.
  return [storedValue, setValue] as const;
}
