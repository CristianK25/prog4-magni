import React, { useReducer, useState } from 'react';
import { todoReducer, TodoState } from '../reducers/todoReducer';
import { Button } from './Button';

/**
 * Componente TodoList.
 * Demuestra cómo consumir el reducer que creamos usando el hook `useReducer`.
 */
export const TodoList: React.FC = () => {
  // 1. Inicializamos useReducer.
  // Recibe dos argumentos: la función reducer y el estado inicial (un arreglo vacío).
  // Retorna: el estado actual (todos) y la función "dispatch" para disparar acciones.
  const [todos, dispatch] = useReducer(todoReducer, [] as TodoState);
  
  // Usamos un useState local simple para manejar el input del formulario
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 2. Despachar una acción.
    // Le decimos al reducer: "Quiero agregar un TODO, y este es su contenido".
    dispatch({ type: 'ADD_TODO', payload: inputValue });
    setInputValue(''); // Limpiamos el input
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm mt-5">
      <h2 className="text-2xl font-bold mb-4">Lista de Tareas (useReducer)</h2>
      
      {/* Formulario para agregar tareas */}
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe una tarea..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="primary">Agregar</Button>
      </form>

      {/* Renderizado de la lista */}
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center italic">No hay tareas aún.</p>
        ) : (
          todos.map((todo) => (
            <li 
              key={todo.id} 
              className="flex justify-between items-center p-3 border border-gray-100 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}>
                {/* Checkbox visual simple basado en el estado */}
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
                  {todo.completed && <span className="text-white text-xs">✓</span>}
                </div>
                <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {todo.text}
                </span>
              </div>
              
              <button 
                onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                className="text-red-500 hover:text-red-700 font-bold px-2"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
