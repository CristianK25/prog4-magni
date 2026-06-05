# Resumen: Biblioteca de Ejemplos en React/TypeScript

Hemos completado la estructuración y codificación de la carpeta `practica/src`, convirtiéndola en un verdadero **cookbook** o libro de recetas con las mejores prácticas en React, TypeScript y TailwindCSS.

A continuación, se detalla todo lo que hemos construido, organizado por sus responsabilidades arquitectónicas.

> [!TIP]
> Todos los ejemplos fueron diseñados para funcionar localmente sin depender de un backend, usando estados o `localStorage`, y cada archivo contiene comentarios didácticos paso a paso en el código.

## 1. Modelos (La base de datos virtual)
Definimos las entidades de negocio en una carpeta separada para evitar dependencias circulares y promover el reúso estricto de tipos con `import type`.
- **[user.model.ts](file:///home/cristian/repos_utn/prog4-magni/practica/src/models/user.model.ts)**: Interfaz básica de usuario.
- **[todo.model.ts](file:///home/cristian/repos_utn/prog4-magni/practica/src/models/todo.model.ts)**: Interfaz de una tarea.

## 2. Componentes (Presentación / Dumb Components)
Componentes puramente visuales estilizados con **TailwindCSS** a través de `className`.
- **[Button.tsx](file:///home/cristian/repos_utn/prog4-magni/practica/src/components/Button.tsx)**: Demuestra tipado de props, variantes dinámicas (primary, secondary) y eventos (`onClick`).
- **[Card.tsx](file:///home/cristian/repos_utn/prog4-magni/practica/src/components/Card.tsx)**: Enseña el patrón de **composición** en React (usando `children` y props opcionales).
- **[Counter.tsx](file:///home/cristian/repos_utn/prog4-magni/practica/src/components/Counter.tsx)**: Componente interactivo que enseña a instanciar y mutar el estado local simple usando **`useState`**.

## 3. Hooks y Estado Complejo (Lógica y Reducers)
Extrajimos la lógica compleja de los componentes visuales para hacerla testeable y reutilizable.
- **[useLocalStorage.ts](file:///home/cristian/repos_utn/prog4-magni/practica/src/hooks/useLocalStorage.ts)**: Custom hook genérico que mantiene el `useState` sincronizado bidireccionalmente con la API del navegador.
- **[todoReducer.ts](file:///home/cristian/repos_utn/prog4-magni/practica/src/reducers/todoReducer.ts)**: Lógica pura de estado. Enseña a tipar acciones y evitar la mutación directa en arreglos.
- **[TodoList.tsx](file:///home/cristian/repos_utn/prog4-magni/practica/src/components/TodoList.tsx)**: Componente que instancia y consume el hook **`useReducer`**.

## 4. Contexto y Servicios (Datos Globales y API)
- **[AuthContext.tsx](file:///home/cristian/repos_utn/prog4-magni/practica/src/context/AuthContext.tsx)**: Demuestra cómo proveer estado global de usuario a todo el árbol, creando el Provider y el Custom Hook `useAuth`.
- **[todo.service.ts](file:///home/cristian/repos_utn/prog4-magni/practica/src/services/todo.service.ts)**: Simula llamadas asíncronas a un backend falso operando sobre el local storage con retrasos (`setTimeout`). Esto permite que los componentes no se enteren nunca de la base de datos subyacente.

## 5. Orquestación (Pages, Routes, Utils)
La unión de todas las piezas.
- **[HomePage.tsx](file:///home/cristian/repos_utn/prog4-magni/practica/src/pages/HomePage.tsx)**: "Smart Component". Enseña cómo interceptar estado de autenticación, hacer fetch de datos en el ciclo de vida (`useEffect`) y distribuir información hacia los componentes hijos.
- **[AppRouter.tsx](file:///home/cristian/repos_utn/prog4-magni/practica/src/routes/AppRouter.tsx)**: Punto de entrada que envuelve la app en los contextos y define las rutas de navegación con `react-router-dom`.
- **[formatters.ts](file:///home/cristian/repos_utn/prog4-magni/practica/src/utils/formatters.ts)**: Ejemplo de organización de funciones puras (sin React) que toda la aplicación puede usar.

> [!IMPORTANT]
> Puedes abrir cualquiera de esos enlaces en tu editor. Toda la arquitectura propuesta sirve de referencia base sólida para cualquier proyecto mediano o grande de React.
