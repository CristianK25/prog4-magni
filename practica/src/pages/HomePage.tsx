import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Counter } from '../components/Counter';
import { TodoList } from '../components/TodoList';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { todoService } from '../services/todo.service';
import type { Todo } from '../models/todo.model';

/**
 * HomePage.
 * 
 * En React, las "Pages" (páginas) suelen ser "Smart Components" (Componentes Inteligentes).
 * Su trabajo no es dibujar cosas bonitas (para eso están los dumb components en /components),
 * sino ORQUESTAR:
 * 1. Consumir contextos globales (AuthContext)
 * 2. Llamar a servicios (todoService)
 * 3. Pasar datos a los componentes hijos mediante props.
 */
export const HomePage: React.FC = () => {
  // 1. Consumimos nuestro estado global mediante el Custom Hook
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // 2. Estado local para almacenar tareas simulando que vienen del backend
  const [asyncTodos, setAsyncTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 3. Efecto secundario: Cargar datos al montar la página
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        // Llamamos a nuestro servicio simulado
        const data = await todoService.getTodos();
        setAsyncTodos(data);
      } catch (error) {
        console.error("Error al cargar las tareas", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []); // El array vacío indica que esto solo se ejecuta al montar el componente

  // 4. Renderizado condicional para forzar el login
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card title="Bienvenido a la Práctica React">
          <p className="mb-4">Para ver los ejemplos, por favor inicia sesión.</p>
          {/* Al hacer click, simulamos un login usando la función provista por el contexto */}
          <Button onClick={() => login('Cristian', 'cristian@utn.edu.ar')} variant="primary">
            Iniciar Sesión Simulado
          </Button>
        </Card>
      </div>
    );
  }

  // Si está autenticado, renderizamos el Dashboard completo
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold">Dashboard de Práctica</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Hola, <strong>{user?.name}</strong></span>
          <Button onClick={logout} variant="secondary" size="small">Cerrar Sesión</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Usamos el Card genérico para encapsular el Contador */}
        <Card title="Ejemplo de useState">
          <Counter />
        </Card>

        {/* Usamos el Card genérico para mostrar datos asíncronos */}
        <Card title="Datos desde el Servicio (Simulación API)">
          {isLoading ? (
            <p className="text-gray-500 animate-pulse">Cargando datos desde el servidor...</p>
          ) : (
            <ul className="list-disc pl-5">
              {asyncTodos.length === 0 ? (
                <li className="text-gray-400">No hay tareas en la DB simulada.</li>
              ) : (
                asyncTodos.map(t => <li key={t.id}>{t.text}</li>)
              )}
            </ul>
          )}
        </Card>

        {/* El TodoList que internamente maneja su propio useReducer */}
        <div className="md:col-span-2">
          <Card title="Ejemplo de useReducer">
            <TodoList />
          </Card>
        </div>
      </div>
    </div>
  );
};
