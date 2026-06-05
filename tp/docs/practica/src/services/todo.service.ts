import type { Todo } from '../models/todo.model';

/**
 * Servicio de Tareas (Todo Service).
 * 
 * Este archivo concentra toda la lógica para "hablar" con la base de datos.
 * Al aislar esto de los componentes de React, si el día de mañana cambiamos
 * localStorage por un backend real (con fetch o axios), solo editamos este archivo
 * y los componentes de React no se enteran.
 */

const STORAGE_KEY = 'practica_todos';

// Función auxiliar para simular la demora de la red (API fake delay)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const todoService = {
  /**
   * Obtiene todas las tareas. Simula un GET /api/todos
   */
  getTodos: async (): Promise<Todo[]> => {
    await delay(500); // Simulamos medio segundo de latencia
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Crea una nueva tarea. Simula un POST /api/todos
   */
  createTodo: async (text: string): Promise<Todo> => {
    await delay(500);
    
    // Obtenemos los actuales
    const data = window.localStorage.getItem(STORAGE_KEY);
    const todos: Todo[] = data ? JSON.parse(data) : [];
    
    // Creamos el nuevo
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    
    // Guardamos la lista actualizada
    todos.push(newTodo);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    
    // Un POST suele retornar el elemento recién creado
    return newTodo;
  },

  /**
   * Elimina una tarea por su ID. Simula un DELETE /api/todos/:id
   */
  deleteTodo: async (id: string): Promise<void> => {
    await delay(500);
    const data = window.localStorage.getItem(STORAGE_KEY);
    if (!data) return;

    let todos: Todo[] = JSON.parse(data);
    todos = todos.filter((todo) => todo.id !== id);
    
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },

  /**
   * Actualiza el estado de una tarea. Simula un PATCH o PUT /api/todos/:id
   */
  toggleTodo: async (id: string): Promise<Todo | undefined> => {
    await delay(500);
    const data = window.localStorage.getItem(STORAGE_KEY);
    if (!data) return undefined;

    const todos: Todo[] = JSON.parse(data);
    let updatedTodo: Todo | undefined;

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        updatedTodo = { ...todo, completed: !todo.completed };
        return updatedTodo;
      }
      return todo;
    });

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    return updatedTodo;
  }
};
