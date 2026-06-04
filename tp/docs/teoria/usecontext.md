# Guía Completa: Context API y el Hook `useContext` en React

En aplicaciones pequeñas, el flujo unidireccional de datos usando *props* (padre a hijo) funciona perfectamente. Sin embargo, a medida que la aplicación crece y se hace más profunda, surge un problema conocido.

## El Problema: "Prop Drilling"

Imagina la siguiente estructura de componentes:
`App → Padre → Hijo → Nieto → Bisnieto`

Si el componente `App` tiene un dato que solo necesita el `Bisnieto`, te verás obligado a pasar ese dato por props a través de todos los componentes intermedios (`Padre`, `Hijo`, `Nieto`), incluso si ellos no usan esa información para nada. A esta cadena de pasar props innecesariamente se le llama **Prop Drilling**.

## La Solución: Context API

Context ofrece una forma de pasar datos a través del árbol de componentes **sin tener que pasar props manualmente en cada nivel**. 

Con Context, `App` define un "contexto global". Cualquier componente que esté "dentro" de ese contexto (no importa qué tan profundo esté en el árbol) puede acceder a esos datos directamente. 

---

## Anatomía de Context (Los 3 pasos clave)

Para utilizar Context en React, siempre debes seguir estos tres pasos fundamentales:

### 1. Crear el Contexto (`createContext`)

Primero, necesitas crear el objeto Context. Esto se hace típicamente en su propio archivo dentro de una carpeta `/context`.

```tsx
import { createContext } from 'react';

// Se crea el contexto. El valor inicial se puede dejar vacío o castear en TypeScript.
export const MiContexto = createContext<CualquierTipo | null>(null);
```

### 2. Proveer el Contexto (`Provider`)

El contexto creado viene con un componente interno llamado `Provider` (Proveedor). Debes envolver la parte de tu aplicación que necesita estos datos con este `Provider`. El atributo `value` es lo que realmente estarás compartiendo.

```tsx
// Se suele crear un componente envoltorio (Wrapper) para mantener el estado
export function MiProveedor({ children }) {
  const [dato, setDato] = useState("Valor Global");

  return (
    <MiContexto.Provider value={{ dato, setDato }}>
      {children}
    </MiContexto.Provider>
  );
}
```

### 3. Consumir el Contexto (`useContext`)

Cualquier componente que esté dentro del `Provider` puede extraer los datos usando el hook `useContext`, pasándole el contexto creado en el Paso 1.

```tsx
import { useContext } from 'react';
import { MiContexto } from '../context/MiContexto';

export function Nieto() {
  // Extraemos el 'dato' directamente, ¡sin necesidad de recibir props!
  const { dato } = useContext(MiContexto);
  
  return <p>{dato}</p>;
}
```

---

## Análisis Aplicado al TP N°4

En el Trabajo Práctico 4, el objetivo principal es refactorizar la aplicación para **sacar los participantes del componente `Home` y llevarlos a un Context Global**. 

De esta manera, cualquier componente (como un `Formulario` o un `Filtros`) podrá agregar, eliminar o leer la lista de participantes sin recibir props directamente desde `Home`.

### Estructura de Carpetas

Se agrega una carpeta específica para los contextos:

```text
src/
 ├── context/
 │    └── ParticipantesContext.tsx  <-- Aquí se define Context, Provider y hook personalizado
 ├── components/
 │    ├── Formulario.tsx
 │    ├── Filtros.tsx
 │    └── ParticipanteCard.tsx
 ├── models/
 │    └── Participante.ts
 └── Home.tsx
```

### Tipado del Contexto (TypeScript)

Según la especificación del TP4, el contexto debe compartir tanto la variable de estado como los métodos para modificarla. La interfaz definida es:

```tsx
interface ContextType {
  participantes: Participante[];
  agregar: (p: Participante) => void;
  eliminar: (id: number) => void;
  resetear: () => void;
}
```

### Implementación Global en `main.tsx`

Para que todos los componentes de la vista puedan acceder a los participantes, el `Provider` debe envolver al componente principal (usualmente `App` o `Home`).

```tsx
// main.tsx
import { ParticipantesProvider } from "./context/ParticipantesContext";
import Home from "./Home";

// ... código de renderización de React ...
  <ParticipantesProvider>
    <Home />
  </ParticipantesProvider>
// ...
```

### Resultado Final del TP4

Al integrar `useContext` junto con la nueva **API REST (Backend)** solicitada en el práctico:
1. Tu aplicación tiene **Persistencia Real**: Los datos se guardan en una Base de Datos usando `fetch` o `axios` en lugar de `localStorage`.
2. Tu aplicación tiene un **Estado Global Limpio**: Las funciones de `agregar` y `eliminar` probablemente llamen a la API y, tras una respuesta exitosa, actualicen el estado dentro del Context, reflejando los cambios automáticamente en cualquier componente que lo esté consumiendo.
