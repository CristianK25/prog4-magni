import React, { useEffect, useState } from 'react';
import { Counter } from '../components/Counter';
import { todoService } from '../services/todo.service';
import type { Todo } from '../models/todo.model';

// Un componente de Página súper básico para examen
export const HomePage: React.FC = () => {
  
  // 1. Estado para guardar los datos de la "API"
  const [tareas, setTareas] = useState<Todo[]>([]);
  
  // 2. useEffect con arreglo vacío [] para que el fetch ocurra SOLO UNA VEZ
  useEffect(() => {
    const cargarDatos = async () => {
      // Llamamos al servicio (simula ser un fetch a una API)
      const data = await todoService.getTodos();
      setTareas(data); // Guardamos la respuesta en el estado
    };

    cargarDatos(); // Ejecutamos la función
  }, []); 

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Repaso para el Examen</h1>

      {/* Sección 1: Probando el componente local */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">1. Nuestro Contador</h2>
        <Counter />
      </div>

      {/* Sección 2: Probando que el fetch funcionó */}
      <div>
        <h2 className="text-xl font-bold mb-2">2. Tareas traídas con Fetch</h2>
        
        {/* Si no hay tareas, mostramos un mensaje, sino, iteramos con .map */}
        {tareas.length === 0 ? (
          <p className="text-gray-500">Cargando datos o la lista está vacía...</p>
        ) : (
          <ul className="list-disc ml-5">
            {tareas.map((tarea) => (
              <li key={tarea.id}>{tarea.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
