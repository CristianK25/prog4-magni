# useId - Accesibilidad y Unicidad

### ¿Qué es y qué significa?
`useId` es un Hook diseñado para generar identificadores únicos que son estables a través de los renderizados. Su propósito principal es **vincular elementos de formulario** (como un Label con su Input) de manera segura.

"Unicidad" significa que React garantiza que ese ID no se va a chocar con otro ID en ninguna otra parte de la aplicación, incluso si usás el mismo componente muchas veces en la misma pantalla.

---

### ¿Cómo afecta al código y a lo visual?

*   **En el Código:** Limpia el código eliminando strings harcodeados como `id="nombre-input"`. Si mañana duplicás el componente, no vas a tener dos elementos con el mismo ID (lo cual rompería el HTML).
*   **En lo Visual:** No tiene un impacto visual directo *para el ojo humano*, pero es fundamental para la **Accesibilidad (UX)**. Permite que los lectores de pantalla le digan al usuario exactamente qué campo está editando. Además, hace que al cliquear un Label, el cursor salte al Input asociado.

---

### ¿Cómo agregarlo?
1. Importarlo: `import { useId } from 'react';`
2. Generar el ID: `const id = useId();`
3. Usar el prefijo si tenés varios campos: `const nombreId = `${id}-nombre`;`

---

### Implementación en el proyecto actual

**Archivo:** `src/components/Formulario.tsx`
```tsx
const baseId = useId();

return (
    <div className="campo">
        <label htmlFor={`${baseId}-nombre`}>Nombre Completo:</label>
        <input 
            id={`${baseId}-nombre`} 
            type="text" 
        />
        
        <label htmlFor={`${baseId}-email`}>Email:</label>
        <input 
            id={`${baseId}-email`} 
            type="email" 
        />
    </div>
);
```
En este ejemplo, aunque `Formulario` se renderice dos veces (una para Crear y otra para Editar), los IDs generados serán distintos (ej: `:r0:-nombre` y `:r1:-nombre`), manteniendo el HTML válido.

---

# IMPLEMENTACIÓN

### 🎯 Objetivo
Profesionalizar el componente `Formulario.tsx` garantizando que sea 100% accesible y cumpla con los estándares de HTML moderno mediante identificadores únicos.

### 📍 ¿Dónde lo vamos a hacer?
**Archivo principal:** `src/components/Formulario.tsx`

### 💡 ¿Por qué lo vamos a hacer?
Actualmente, los inputs del formulario dependen mayoritariamente de `placeholder` para ser identificados. Al agregar labels vinculados con `useId`:
1.  **UX**: El usuario puede cliquear en el texto (Label) para que el cursor salte al input.
2.  **Accesibilidad**: Los lectores de pantalla podrán anunciar claramente qué dato se está pidiendo.
3.  **Seguridad**: Evitamos que si renderizamos el formulario dos veces (ej: en un modal y en la página principal), los IDs se dupliquen y confundan al navegador.

---

### 📝 Pasos Atómicos (Checklist)

1.  **[x] Preparación**: 
    - Importar `useId` desde `'react'` en la primera línea de `Formulario.tsx`.
    - Declarar un ID base al inicio del componente: `const baseId = useId();`.

2.  **[x] Vinculación de Campos Simples**:
    - Crear constantes para cada campo: `const nombreId = `${baseId}-nombre`;`, `const emailId = ...`, etc.
    - Agregar etiquetas `<label>` reales encima de cada `<input>` (Nombre, Email, Edad, País).
    - Asignar `htmlFor={nombreId}` al label e `id={nombreId}` al input correspondiente.

3.  **[x] Dinamismo en Listas (Map)**:
    - En el `.map()` de **Modalidad** y **Tecnologías**, generar un ID único por opción usando el índice o el valor: `id={`${baseId}-${opcion.valor}`}`.
    - Asegurar que el `<label>` de cada opción coincida perfectamente con su `<input>`.

4.  **[x] Campo de Validación**:
    - Vincular el checkbox de "Acepto términos y condiciones" con su label usando un ID específico generado por `useId`.

5.  **[x] Verificación Visual**:
    - Abrir la aplicación y verificar que al hacer clic en cualquier texto descriptivo, el cursor se posicione correctamente en el campo de entrada.


