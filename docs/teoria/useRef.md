# useRef - Manipulación del DOM y Persistencia

### ¿Qué es y qué significa?
`useRef` es un Hook que te permite persistir valores entre renderizados sin disparar uno nuevo. En el contexto de este TP, lo usamos principalmente para obtener una **referencia directa a un elemento del DOM**.

Es como tener un "puntero" o un cable directo a una etiqueta HTML (como un `<input>`) para decirle qué hacer de forma imperativa.

---

### ¿Cómo afecta al código y a lo visual?

*   **En el Código:** Evitás usar selectores de JS vainilla como `document.getElementById()`, lo cual es una mala práctica en React. Todo queda dentro del ciclo de vida del componente.
*   **En lo Visual:** Mejora la **fluidez**. El usuario no tiene que hacer clic manualmente en un campo apenas entra; la aplicación "lo guía" automáticamente.

---

### ¿Cómo agregarlo?
1. Importarlo: `import { useRef, useEffect } from 'react';`
2. Declarar la referencia: `const inputRef = useRef<HTMLInputElement>(null);`
3. Vincularla: `<input ref={inputRef} ... />`
4. Actuar sobre ella: `inputRef.current?.focus();`

---

### Implementación en el proyecto actual

#### 1. Foco Automático (Formulario)
**Archivo:** `src/components/Formulario.tsx` (o donde esté el input de Nombre).
```tsx
const nombreRef = useRef<HTMLInputElement>(null);

useEffect(() => {
    // Al montar el componente, el cursor va directo al nombre
    nombreRef.current?.focus();
}, []);

return <input ref={nombreRef} placeholder="Nombre" />;
```

#### 2. Atajo de Teclado (Ctrl + B)
**Archivo:** `src/pages/ListaPage.tsx`
```tsx
const searchRef = useRef<HTMLInputElement>(null);

useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            searchRef.current?.focus();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

---

# IMPLEMENTACIÓN

### 🎯 Objetivo
Mejorar la usabilidad de la aplicación mediante interacciones automáticas y atajos de teclado, reduciendo la fricción para el usuario.

### 📍 ¿Dónde lo vamos a hacer?
1.  **Auto-foco**: `src/components/Formulario.tsx`
2.  **Buscador (Ctrl+B)**: `src/pages/ListaPage.tsx` (o donde esté el campo de filtro).

### 💡 ¿Por qué lo vamos a hacer?
1.  **Productividad**: El usuario ahorra clics innecesarios. En un formulario de carga masiva, que el foco aparezca solo es un estándar de calidad.
2.  **Accesibilidad por Teclado**: Los usuarios avanzados prefieren no soltar el teclado. Un atajo para buscar (`Ctrl+B`) es una característica de software profesional.

---

### 📝 Pasos Atómicos (Checklist)

1.  **[x] Foco en Formulario**:
    - Importar `useRef` y `useEffect` en `Formulario.tsx`.
    - Crear `nombreInputRef = useRef<HTMLInputElement>(null)`.
    - Asignar la `ref` al input de "Nombre".
    - Implementar un `useEffect` con dependencia vacía `[]` que ejecute `.focus()` sobre la referencia.

2.  **[x] Atajo Ctrl+B**:
    - Localizar el input de búsqueda en la lista de participantes.
    - Crear una referencia `filtroRef`.
    - Implementar un `useEffect` que agregue un `EventListener` al objeto `window`.
    - Validar en la función: `if (e.ctrlKey && e.key === 'b')`.
    - **IMPORTANTE**: No olvidar la función de limpieza (`return () => removeEventListener...`) para evitar fugas de memoria.

3.  **[x] Verificación**:
    - Recargar la página del formulario y ver si el cursor titila en "Nombre".
    - Ir a la lista, presionar Ctrl+B y verificar si el foco salta al buscador.


