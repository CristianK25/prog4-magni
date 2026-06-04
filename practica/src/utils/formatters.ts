/**
 * Utilidades (Utils).
 * 
 * Esta carpeta contiene funciones "puras" (pure functions) de JavaScript/TypeScript.
 * Estas funciones NO deben depender de React (ni hooks, ni componentes).
 * Al ser funciones puras, reciben parámetros, retornan algo, y son muy fáciles de testear.
 */

/**
 * Formatea una fecha a un formato legible por humanos en español.
 * Ej: "4 de junio de 2026"
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Valida si un string tiene un formato de correo electrónico básico.
 */
export const isValidEmail = (email: string): boolean => {
  // Expresión regular simple para emails
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
