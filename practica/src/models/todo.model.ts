/**
 * Modelo de Tarea (Todo).
 * 
 * Separar nuestros modelos de negocio en archivos independientes permite
 * que múltiples reducers, servicios y componentes compartan la misma
 * definición estricta de lo que es un "Todo" sin depender unos de otros.
 */

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  /**
   * Propiedad opcional para simular cuándo fue creada la tarea.
   * Al ser opcional, no rompe nuestro reducer actual.
   */
  createdAt?: Date; 
}
