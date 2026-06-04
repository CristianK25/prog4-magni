# Guía Completa: Entendiendo las Props en React

En React, los componentes son la base de la construcción de interfaces de usuario. Para que estos componentes sean verdaderamente reutilizables, dinámicos y útiles, necesitan poder recibir información. Aquí es donde entran las **Props** (abreviatura de *properties* o propiedades).

## ¿Qué son las Props?

Las props son argumentos que se pasan a los componentes de React. Son la principal vía de comunicación entre componentes, permitiendo que los datos fluyan a través de tu aplicación. 

**Regla de Oro:** El flujo de datos en React es **unidireccional y descendente**. Esto significa que las props solo se pueden pasar de un componente Padre a un componente Hijo.

Piensa en las props como si fueran atributos de una etiqueta HTML. Por ejemplo, en la etiqueta `<img src="imagen.jpg" alt="Paisaje" />`, `src` y `alt` le dan información a la etiqueta sobre qué debe mostrar. En React, tú inventas tus propios "atributos" para los componentes que creas.

## 1. ¿Cómo pasar Props?

Para pasar props a un componente hijo, las defines como atributos en la etiqueta JSX del componente, exactamente igual que harías en HTML.

```tsx
// Componente Padre
function App() {
  const nombreUsuario = "Cristian";

  return (
    <div>
      {/* Pasando props: 'nombre' y 'edad' */}
      <TarjetaUsuario nombre={nombreUsuario} edad={25} />
    </div>
  );
}
```

## 2. ¿Cómo recibir Props (en TypeScript)?

En el componente hijo, recibes las props a través del primer parámetro de la función del componente. Al estar utilizando TypeScript, es una excelente práctica definir una `interface` o un `type` que describa exactamente qué props espera recibir el componente.

```tsx
// Definimos la interfaz de las props
interface TarjetaUsuarioProps {
  nombre: string;
  edad: number;
}

// Componente Hijo
function TarjetaUsuario(props: TarjetaUsuarioProps) {
  return (
    <div className="tarjeta">
      <h2>Hola, {props.nombre}!</h2>
      <p>Tienes {props.edad} años.</p>
    </div>
  );
}
```

### Desestructuración de Props (Destructuring)

Para no tener que escribir `props.` todo el tiempo, es muy común desestructurar el objeto de props directamente en los parámetros de la función. Este es el estándar de la industria.

```tsx
function TarjetaUsuario({ nombre, edad }: TarjetaUsuarioProps) {
  return (
    <div className="tarjeta">
      <h2>Hola, {nombre}!</h2>
      <p>Tienes {edad} años.</p>
    </div>
  );
}
```

## 3. Las Props son de Solo Lectura (Inmutables)

Esta es una de las reglas más estrictas de React: **un componente nunca debe modificar sus propias props**. 

Las props son información que el componente hijo *recibe* para saber cómo debe dibujarse, pero no le pertenecen a él, le pertenecen al padre. Si intentas reasignar un valor a una prop, React arrojará un error.

Si un componente necesita información que va a cambiar en el tiempo (por ejemplo, lo que el usuario escribe en un input), debe usar el **Estado** (`useState`), no las props.

## 4. Pasando Funciones como Props (Callbacks)

Dado que las props viajan de Padre a Hijo, surge una pregunta frecuente: *¿Cómo hace el Hijo para enviarle información al Padre?* (Por ejemplo, un botón dentro del Hijo es clickeado y el Padre necesita saberlo para actualizar el estado).

La solución es pasar una **función** como prop. Esto se conoce como un *Callback*.

1. El Padre crea una función.
2. El Padre le pasa la función al Hijo a través de una prop.
3. El Hijo ejecuta esa función (y opcionalmente le pasa argumentos) cuando ocurre un evento.

```tsx
// Padre
function App() {
  const manejarClick = (mensaje: string) => {
    alert("El hijo dijo: " + mensaje);
  };

  return <BotonNotificador alHacerClick={manejarClick} />;
}

// Hijo
interface BotonProps {
  alHacerClick: (mensaje: string) => void;
}

function BotonNotificador({ alHacerClick }: BotonProps) {
  return (
    <button onClick={() => alHacerClick("¡Hola desde el componente hijo!")}>
      Notificar al Padre
    </button>
  );
}
```

## 5. La Prop especial: `children`

A veces quieres crear componentes que funcionen como "contenedores" genéricos, sin saber de antemano qué contenido tendrán adentro (como un Card o un Modal). React proporciona una prop especial llamada `children` que contiene todo lo que pongas entre las etiquetas de apertura y cierre de un componente.

```tsx
interface ContenedorProps {
  titulo: string;
  children: React.ReactNode; // Tipo recomendado para children en TypeScript
}

function ContenedorGris({ titulo, children }: ContenedorProps) {
  return (
    <div style={{ backgroundColor: 'lightgray', padding: '20px' }}>
      <h3>{titulo}</h3>
      <div className="contenido">
        {children} {/* Aquí se renderizará lo que pongamos dentro */}
      </div>
    </div>
  );
}

// Uso:
function App() {
  return (
    <ContenedorGris titulo="Información Importante">
      <p>Este es el primer párrafo de contenido.</p>
      <button>Aceptar</button>
    </ContenedorGris>
  );
}
```

---

## Ejemplo Guia:

A continuación se muestra el análisis de los requerimientos de la guía basándonos en la teoría de Props y Estado.

### Código de Referencia:

```markdown
## Etapa 1: Estado Local y Props (Basado en TP2)
**Objetivo**: Entender cómo los datos bajan (Props) y los eventos suben (Callbacks).
- **Ejercicio 1.1**: Creá la interfaz `Nota` (`id: number`, `texto: string`, `importante: boolean`).
- **Ejercicio 1.2**: En `App.tsx`, creá un estado `notas` usando `useState<Nota[]>([])`.
- **Ejercicio 1.3**: Creá un componente `<FormularioNota />` que reciba por props una función `onAgregar(texto: string, importante: boolean)`. Tipeá el `onChange` de los inputs y el `onSubmit` del form.
- **Ejercicio 1.4**: Creá un componente `<ListaNotas notas={notas} />` que reciba las notas y haga un `.map()`.
```

### Resolución en Código:

A continuación te mostramos cómo se resolverían los ejercicios paso a paso, aplicando los conceptos de estado y props.

#### Ejercicio 1.1: Interfaz `Nota`

Primero, definimos la forma de nuestros datos. Esto suele ir en un archivo separado como `models/Nota.ts`.

```tsx
// models/Nota.ts
export interface Nota {
  id: number;
  texto: string;
  importante: boolean;
}
```

#### Ejercicio 1.3: `<FormularioNota />` (Eventos que suben)

El formulario necesita comunicarse con el padre, así que recibe una función por props.

```tsx
// components/FormularioNota.tsx
import { useState } from 'react';

interface FormularioNotaProps {
  onAgregar: (texto: string, importante: boolean) => void;
}

export function FormularioNota({ onAgregar }: FormularioNotaProps) {
  const [texto, setTexto] = useState('');
  const [importante, setImportante] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!texto.trim()) return;
    
    // Ejecutamos la función que nos pasó el Padre (Evento hacia arriba)
    onAgregar(texto, importante);
    
    // Limpiamos el formulario
    setTexto('');
    setImportante(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border mb-4">
      <input 
        type="text" 
        value={texto} 
        onChange={(e) => setTexto(e.target.value)} 
        placeholder="Escribe una nota..."
      />
      <label className="ml-2">
        <input 
          type="checkbox" 
          checked={importante} 
          onChange={(e) => setImportante(e.target.checked)} 
        /> Importante
      </label>
      <button type="submit" className="ml-2 bg-blue-500 text-white px-2 rounded">
        Agregar
      </button>
    </form>
  );
}
```

#### Ejercicio 1.4: `<ListaNotas />` (Datos que bajan)

Este componente solo recibe datos (props) y los muestra. No necesita tener estado propio.

```tsx
// components/ListaNotas.tsx
import { Nota } from '../models/Nota';

interface ListaNotasProps {
  notas: Nota[];
}

export function ListaNotas({ notas }: ListaNotasProps) {
  return (
    <ul>
      {notas.map((nota) => (
        <li key={nota.id} style={{ fontWeight: nota.importante ? 'bold' : 'normal' }}>
          {nota.texto}
        </li>
      ))}
    </ul>
  );
}
```

#### Ejercicio 1.2: Uniendo todo en `App.tsx`

El componente `App` es el "Padre". Él es el dueño del estado principal y se encarga de pasarle los datos a `ListaNotas` y el callback a `FormularioNota`.

```tsx
// App.tsx
import { useState } from 'react';
import { Nota } from './models/Nota';
import { FormularioNota } from './components/FormularioNota';
import { ListaNotas } from './components/ListaNotas';

function App() {
  // Ejercicio 1.2: El Estado Principal
  const [notas, setNotas] = useState<Nota[]>([]);

  // La función que le pasaremos al formulario
  const manejarAgregarNota = (texto: string, importante: boolean) => {
    const nuevaNota: Nota = {
      id: Date.now(),
      texto,
      importante
    };
    setNotas([...notas, nuevaNota]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Gestor de Notas</h1>
      
      {/* Pasamos el callback como Prop */}
      <FormularioNota onAgregar={manejarAgregarNota} />
      
      {/* Pasamos los datos como Prop */}
      <ListaNotas notas={notas} />
    </div>
  );
}

export default App;
```
