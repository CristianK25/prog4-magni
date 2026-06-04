import type { Todo } from '../models/todo.model';

/**
 * 1. Definimos la forma de nuestro Estado.
 * En este caso, el estado es simplemente un arreglo de Tareas (Todos).
 */
export type TodoState = Todo[];

/**
 * 2. Definimos las Acciones posibles.
 * Las acciones son objetos que describen "qué pasó" en la aplicación.
 * Usamos una "Unión Discriminada" de TypeScript para que el tipado sea estricto.
 * Todas las acciones deben tener un 'type', y dependiendo del type,
 * pueden requerir un 'payload' (datos adicionales).
 */
export type TodoAction =
  | { type: 'ADD_TODO'; payload: string } // payload = texto de la tarea
  | { type: 'TOGGLE_TODO'; payload: string } // payload = id de la tarea
  | { type: 'DELETE_TODO'; payload: string }; // payload = id de la tarea

/**
 * 3. El Reducer (La función pura).
 * Un reducer SIEMPRE recibe el estado actual y una acción, y 
 * SIEMPRE debe retornar el NUEVO estado.
 * 
 * Regla de oro: NUNCA se debe mutar el estado original (ej. no usar push o splice).
 * Siempre hay que retornar un objeto/arreglo completamente nuevo.
 */
export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      // Retornamos un nuevo arreglo con la nueva tarea al final
      const newTodo: Todo = {
        id: Date.now().toString(), // Generamos un ID simple
        text: action.payload,
        completed: false,
      };
      return [...state, newTodo];

    case 'TOGGLE_TODO':
      // Mapeamos el arreglo: si es el ID buscado, invertimos su 'completed'
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case 'DELETE_TODO':
      // Filtramos el arreglo, quitando el elemento con el ID especificado
      return state.filter((todo) => todo.id !== action.payload);

    default:
      // Si la acción no existe, devolvemos el estado sin cambios.
      // (TypeScript normalmente evita esto si tipamos bien las acciones)
      return state;
  }
};
