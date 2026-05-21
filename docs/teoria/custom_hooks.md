# Custom Hooks - Reutilización de Lógica Producida

### ¿Qué es y qué significa?
Un **Custom Hook** no es más que una función de JavaScript que empieza con la palabra `use` y que puede llamar a otros Hooks de React. Es la máxima expresión de **abstracción** en React.

Significa extraer la lógica "pesada" o repetitiva de un componente para que pueda ser compartida por muchos otros, manteniendo el componente enfocado solo en mostrar la UI.

---

### ¿Cómo afecta al código y a lo visual?

*   **En el Código:** Aplica el principio **DRY (Don't Repeat Yourself)**. Si tenés que validar un formulario en tres pantallas distintas, no copiás y pegás el código; llamás al mismo hook. Hace que el código sea mucho más fácil de testear.
*   **En lo Visual:** Garantiza **consistencia**. Si un hook maneja una animación o un estado de carga, todas las pantallas que lo usen se comportarán de la misma manera, brindando una experiencia uniforme al usuario.

---

### ¿Cómo agregarlo?
1. Crear un archivo nuevo: `src/hooks/useMiHook.ts`
2. Definir la función: `export const useMiHook = () => { ... }`
3. Retornar lo necesario: un estado, una función, o un objeto.

---

### Implementación en el proyecto actual

#### Ejemplo 1: `useForm` (Manejo de estados de inputs)
**Archivo:** `src/hooks/useForm.ts`
```tsx
export const useForm = <T>(initialState: T) => {
    const [values, setValues] = useState(initialState);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return { values, handleChange, setValues };
};
```

#### Ejemplo 2: `useParticipantes` (Abstracción del Contexto)
**Archivo:** `src/hooks/useParticipantes.ts`
```tsx
export const useParticipantes = () => {
    const context = useContext(ParticipantesContext);
    if (!context) throw new Error("useParticipantes debe usarse dentro de un Provider");
    
    // Acá podrías agregar lógica extra de filtrado o cálculos
    return context;
};
```
Esto permite que en tus componentes simplemente hagas `const { participantes } = useParticipantes();` en lugar de importar el Contexto y el `useContext` en cada archivo.

---

# IMPLEMENTACIÓN

### 🎯 Objetivo
Limpiar los componentes de lógica repetitiva y crear herramientas reutilizables que simplifiquen el desarrollo de nuevas funcionalidades.

### 📍 ¿Dónde lo vamos a hacer?
1.  **Directorio de Hooks**: Crear la carpeta `src/hooks/`.
2.  **Archivos**: `useForm.ts` y `useParticipantes.ts`.
3.  **Consumidores**: `Formulario.tsx`, `ListaPage.tsx`, y cualquier otro componente que use el contexto.

### 💡 ¿Por qué lo vamos a hacer?
1.  **Escalabilidad**: Si mañana el formulario crece o agregamos otro, `useForm` ya está listo para manejarlo.
2.  **Mantenibilidad**: Si hay un error en cómo se acceden a los participantes, lo arreglamos en un solo lugar (`useParticipantes`) y se arregla en toda la app.
3.  **Legibilidad**: Los componentes pasan de tener 100 líneas de lógica a tener 2 o 3 llamadas a hooks.

---

### 📝 Pasos Atómicos (Checklist)

1.  **[x] Estructura**:
    - Crear la carpeta `src/hooks` si no existe.

2.  **[x] Hook de Formulario (`useForm`)**:
    - Crear el archivo `useForm.ts`.
    - Implementar la lógica de estado genérica (`useState`).
    - Exportar las funciones `handleChange` y `resetForm`.
    - **Refactor**: Ir a `Formulario.tsx`, borrar el `useState` local y usar el nuevo `useForm`.

3.  **[x] Hook de Contexto (`useParticipantes`)**:
    - Crear el archivo `useParticipantes.ts`.
    - Implementar la lógica que consume `ParticipantesContext`.
    - Agregar una validación para asegurar que se use dentro del Provider (lanza error si no).
    - **Refactor**: Reemplazar todos los `useContext(ParticipantesContext)` por un simple `useParticipantes()`.

4.  **[x] Verificación**:
    - Asegurarse de que el formulario siga enviando datos correctamente.
    - Verificar que la lista de participantes se siga cargando y filtrando sin errores de contexto.


