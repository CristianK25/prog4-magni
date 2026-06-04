# Gestión Avanzada de Estado: `useReducer` + `Context`

A medida que una aplicación React crece, la lógica para actualizar el estado puede volverse compleja. Si tienes un estado que sufre muchas modificaciones distintas (agregar, editar, eliminar, cargar desde el servidor, resetear), usar múltiples `useState` o un `useState` con objetos complejos puede hacer que el código sea difícil de mantener y escalar.

Para resolver esto, React proporciona el hook **`useReducer`**.

---

## ¿Qué es `useReducer`?

`useReducer` es un hook de React que te permite manejar el estado mediante **acciones**. En lugar de decirle a React "cambia el estado a este valor exacto" (como hacemos con `setState`), le decimos **"ha ocurrido esta acción, calcula tú el nuevo estado"**.

Centraliza TODA la lógica de actualización del estado en una sola función separada.

### Los 3 Conceptos Clave del Patrón Reducer

1.  **La Acción (`action`)**: Es un simple objeto de JavaScript que describe *qué pasó* o *qué queremos hacer*. Por convención, siempre tiene una propiedad `type` (un string en mayúsculas) y opcionalmente un `payload` (los datos necesarios para realizar la acción).
    ```typescript
    { 
      type: "AGREGAR_PARTICIPANTE", 
      payload: { id: 1, nombre: "Juan" } 
    }
    ```

2.  **El Reductor (`reducer`)**: Es una función pura que contiene toda la lógica. 
    - Recibe dos parámetros: el `estado actual` y la `acción` que acaba de ocurrir.
    - Evalúa el `action.type` (generalmente usando un `switch`).
    - Devuelve el **nuevo estado**.
    ```typescript
    function miReducer(estado, accion) {
      switch (accion.type) {
        case "AGREGAR":
           return [...estado, accion.payload];
        case "ELIMINAR":
           return estado.filter(item => item.id !== accion.payload);
        default:
           return estado;
      }
    }
    ```

3.  **El Despachador (`dispatch`)**: Es la función que nos proporciona el hook `useReducer` para "disparar" o "enviar" las acciones hacia el reducer.
    ```tsx
    const [estado, dispatch] = useReducer(miReducer, estadoInicial);
    
    // Al hacer click en un botón:
    dispatch({ type: "ELIMINAR", payload: 5 });
    ```

---

## Combinando `useReducer` con `Context`

`useReducer` por sí solo es genial para limpiar el código de un componente complejo. Pero si combinamos **`useReducer` (para manejar lógica compleja)** con **`Context API` (para distribuir el estado globalmente)**, obtenemos una arquitectura robusta, similar a librerías profesionales como Redux.

### ¿Cómo funciona la integración?

1.  Creas tu función `reducer` (usualmente en un archivo `reducers/misDatosReducer.ts`).
2.  Dentro de tu componente `Provider` (ej. `ParticipantesProvider`), llamas a `useReducer`.
3.  En el atributo `value` del Provider, en lugar de pasar `setEstado`, pasas la función `dispatch`.
4.  Cualquier componente hijo usa `useContext` para obtener el estado y el `dispatch`. Ahora cualquier botón en cualquier parte de la app puede hacer `dispatch({ type: 'ELIMINAR' })`.

---

## Análisis Aplicado al TP N°5

En el Trabajo Práctico 5, el objetivo es escalar la gestión de "Participantes" migrando de un simple `useState` (implementado en el TP4) a la combinación de `useReducer + Context`.

### 1. Definición estricta de Acciones (TypeScript)

Para evitar errores de tipeo, se define un tipo (o unión de tipos) que dicta exactamente qué acciones son válidas en la aplicación:

```typescript
export type Action =
  | { type: "GET_PARTICIPANTES"; payload: Participante[] }
  | { type: "AGREGAR"; payload: Participante }
  | { type: "ELIMINAR"; payload: number }
  | { type: "RESET"; payload: Participante[] }
  | { type: "EDITAR"; payload: Participante }
  | { type: "SET"; payload: Participante[] };
```

### 2. Estructura de Carpetas

Se recomienda separar la lógica del reductor del contexto en sí:

```text
src/
 ├── context/
 │    └── ParticipantesContext.tsx  <-- Tiene el Provider, usa useReducer y pasa el dispatch.
 ├── reducers/
 │    └── participantesReducer.ts   <-- Tiene el tipo Action y la función (state, action) => newState.
```

### 3. Nueva Funcionalidad: Edición

El TP5 pide agregar la capacidad de **Editar un Participante**, lo cual justifica el uso de un reducer por la cantidad de acciones cruzadas. 
El flujo sugerido es:
1. El usuario hace click en "Editar" en una tarjeta (`ParticipanteCard`).
2. Se hace un `dispatch` o se actualiza un estado para saber qué participante se está editando.
3. Los datos de ese participante se cargan automáticamente en los inputs del `<Formulario />`.
4. Al presionar el botón de enviar en el formulario, este verifica: 
   - ¿Estoy creando uno nuevo? -> Hago una petición `POST` al backend y disparo `dispatch({ type: 'AGREGAR' })`.
   - ¿Estoy editando uno existente? -> Hago una petición `PUT` al backend y disparo `dispatch({ type: 'EDITAR' })`.

*(Nota: Como mejora de UI, el texto del botón del formulario debería cambiar dinámicamente entre "Agregar" y "Actualizar" dependiendo de si estamos en modo edición o no).*
