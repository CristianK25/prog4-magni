# Hooks Avanzados: `useRef`, `useId` y Custom Hooks

A medida que las aplicaciones React requieren interacciones más complejas con el usuario y mayor accesibilidad, necesitamos salir del ciclo tradicional de "estado-renderizado". React nos provee hooks específicos para lidiar con el DOM directamente y para mejorar la arquitectura de nuestro código.

---

## 1. `useRef`: Referencias directas al DOM y valores persistentes

El hook `useRef` tiene dos propósitos principales en React, aunque en el TP N°8 nos enfocaremos principalmente en el primero:

### A. Acceso directo a elementos del DOM
Normalmente, en React "no tocamos el DOM" directamente (no usamos `document.getElementById`). Dejamos que React actualice la pantalla basado en el estado. Sin embargo, hay casos excepcionales donde **sí** necesitamos hablar directamente con un nodo HTML, por ejemplo:
*   Para darle **foco** a un input.
*   Para medir el tamaño de un elemento.
*   Para integrar librerías de terceros que no son de React.

**Implementación en el TP8 (Foco Automático):**

Para hacer que el input "Nombre" reciba foco apenas el usuario entra al formulario:

```tsx
import { useRef, useEffect } from 'react';

export default function Formulario() {
  // 1. Creamos la referencia (inicialmente null)
  const inputNombreRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 3. Cuando el componente se monta, le damos el foco
    // current apunta al nodo real del DOM
    inputNombreRef.current?.focus();
  }, []); // Array vacío = se ejecuta solo al montar

  return (
    <input 
      // 2. Enlazamos la referencia al elemento JSX
      ref={inputNombreRef} 
      type="text" 
      placeholder="Nombre" 
    />
  );
}
```

**Atajos de Teclado (Ctrl + B):**
El TP también pide que al presionar `Ctrl + B` el foco vaya al buscador. Para esto, también necesitas un `useRef` atado al input del buscador, y un `useEffect` que escuche el evento `keydown` global de la ventana (`window.addEventListener('keydown', ...)`). Cuando detecte esa combinación, ejecutas `buscadorRef.current?.focus()`.

### B. Guardar valores mutables sin re-renderizar
*(Dato teórico extra)*: Si guardas un valor en un estado (`useState`), al cambiarlo el componente se vuelve a dibujar. Si guardas un valor en `useRef` (ej. `miRef.current = 5`), el valor cambia en memoria pero **el componente NO se vuelve a renderizar**. Es ideal para guardar temporizadores (timers) o variables de control.

---

## 2. `useId`: Accesibilidad e Identificadores Únicos

Para que los formularios web sean accesibles (por ejemplo, para personas que usan lectores de pantalla), cada `<input>` debe tener un `id` único, y su `<label>` correspondiente debe apuntar a ese id usando el atributo `htmlFor`.

**El problema:** Si creas un componente genérico `<InputTexto />` y le pones un id fijo (`id="mi-input"`), y luego usas ese componente 5 veces en la misma pantalla, ¡tendrás 5 elementos con el mismo ID! Esto rompe las reglas de HTML.

**La solución: `useId`**
Este hook genera un string único (ej. `:r1:`, `:r2:`) de forma determinista y segura para el lado del cliente y servidor.

**Implementación en el TP8:**

```tsx
import { useId } from 'react';

export function ComponenteFormulario() {
  // Genera un ID único para este renderizado específico
  const nombreId = useId();
  const apellidoId = useId();

  return (
    <form>
      <div>
        {/* Usamos el mismo ID generado para enlazar label e input */}
        <label htmlFor={nombreId}>Nombre</label>
        <input id={nombreId} type="text" />
      </div>
      <div>
        <label htmlFor={apellidoId}>Apellido</label>
        <input id={apellidoId} type="text" />
      </div>
    </form>
  );
}
```
Esto aplica no solo a inputs de texto, sino también a `checkboxes` y `radio buttons`, mejorando drásticamente la experiencia de usuario, ya que hacer clic en la etiqueta de texto seleccionará automáticamente el input.

---

## 3. Custom Hooks (Hooks Personalizados)

Un Custom Hook es, simplemente, **una función de JavaScript cuyo nombre empieza con `use` y que llama a otros hooks internamente** (`useState`, `useEffect`, `useContext`, etc.).

Sirven para **extraer y reutilizar lógica** de los componentes. Si notas que tienes un `useEffect` o una lógica de estado muy compleja que ensucia tu componente, o que quieres usar en dos pantallas distintas, la extraes a un Custom Hook.

### Ejemplo sugerido para el TP8

El TP pide crear 2 funciones que apliquen hooks personalizados. Aquí tienes ideas excelentes que resuelven problemas reales del práctico:

**Sugerencia 1: `useAtajoTeclado`**
En lugar de ensuciar tu componente de la Lista con toda la lógica de escuchar `Ctrl+B`, puedes crear un hook:

```tsx
// hooks/useAtajoTeclado.ts
import { useEffect } from 'react';

export function useAtajoTeclado(tecla: string, callback: () => void) {
  useEffect(() => {
    const manejarTeclado = (event: KeyboardEvent) => {
      // Si presiona Ctrl y la tecla indicada
      if (event.ctrlKey && event.key.toLowerCase() === tecla.toLowerCase()) {
        event.preventDefault(); // Evita el comportamiento por defecto del navegador
        callback();
      }
    };

    window.addEventListener('keydown', manejarTeclado);
    return () => window.removeEventListener('keydown', manejarTeclado);
  }, [tecla, callback]);
}
```

*Uso en el componente:*
```tsx
const buscadorRef = useRef<HTMLInputElement>(null);
useAtajoTeclado('b', () => buscadorRef.current?.focus());
```

**Sugerencia 2: `useFormulario`**
Manejar múltiples estados para inputs es tedioso. Puedes crear un hook que agrupe el estado del formulario y la función genérica para actualizar los campos (el típico `handleChange`).

Al crear Custom Hooks, tu aplicación se vuelve modular. Los componentes de React (archivos `.tsx`) quedan casi exclusivamente dedicados a pintar la Interfaz de Usuario (JSX), mientras que la lógica dura vive en los hooks.
