# React Router DOM: Navegación y CRUD Multipantalla

Hasta ahora, nuestras aplicaciones de React funcionaban en una sola pantalla (*Single Page Application* en su sentido más estricto). Si queríamos mostrar un formulario, lo ocultábamos o mostrábamos usando estado condicional (`if (mostrarFormulario) ...`).

**React Router** introduce la navegación real. Nos permite:
*   Navegar entre diferentes páginas sin recargar el navegador.
*   Tener URLs reales (ej: `/home`, `/nuevo`, `/editar/5`).
*   Separar físicamente las pantallas de la aplicación.
*   Crear una arquitectura mucho más profesional y escalable.

Para instalarlo en tu proyecto:
```bash
npm install react-router-dom
```

---

## 1. Configuración Principal: `BrowserRouter`

Para que el enrutamiento funcione, toda la aplicación debe estar envuelta por el componente `<BrowserRouter>`. El lugar ideal para hacer esto es en el punto de entrada de tu aplicación, generalmente `main.tsx` o `index.tsx`.

```tsx
// main.tsx
import { BrowserRouter } from 'react-router-dom';
// ... otros imports ...

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ParticipantesProvider>
        <App />
      </ParticipantesProvider>
    </BrowserRouter>
  </StrictMode>
);
```

---

## 2. Definición de Rutas: `Routes` y `Route`

Dentro de tu componente principal (generalmente `App.tsx`), defines el "mapa" de tu aplicación usando `<Routes>` y `<Route>`.
*   `<Routes>`: Actúa como un contenedor que evalúa la URL actual y decide qué ruta renderizar.
*   `<Route>`: Asocia una ruta de la URL (`path`) con un componente específico de React (`element`).

```tsx
// App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormularioPage from "./pages/FormularioPage";
import EditarPage from "./pages/EditarPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nuevo" element={<FormularioPage />} />
      <Route path="/editar/:id" element={<EditarPage />} />
    </Routes>
  );
}
```
*Nota la ruta `/editar/:id`. El `:id` indica que es un parámetro dinámico. Puede ser `/editar/1`, `/editar/99`, etc.*

---

## 3. Navegación Declarativa: `Link`

Para crear enlaces que lleven al usuario de una página a otra (como la etiqueta `<a>` en HTML), usamos `<Link>`. La ventaja de `<Link>` es que cambia la URL y renderiza el nuevo componente **sin recargar la página completa**.

```tsx
import { Link } from "react-router-dom";

// Uso en un componente:
<Link to="/nuevo" className="bg-blue-600 text-white p-2">
  Nuevo participante
</Link>
```

---

## 4. Navegación Programática: `useNavigate`

A veces no quieres navegar porque el usuario hizo clic en un enlace, sino como resultado de una acción en el código. Por ejemplo: *Después de guardar un formulario exitosamente, quiero redirigir al usuario al Home*. Para esto usamos el hook `useNavigate()`.

```tsx
import { useNavigate } from "react-router-dom";

export function FormularioPage() {
  const navigate = useNavigate();

  const guardarDatos = () => {
    // ... lógica para guardar en la base de datos ...
    // Al terminar, redirigimos al Home:
    navigate("/");
  };

  return <button onClick={guardarDatos}>Guardar</button>;
}
```

---

## 5. Capturar Parámetros de la URL: `useParams`

Cuando definimos una ruta dinámica como `/editar/:id`, necesitamos alguna forma de saber qué `id` visitó el usuario (para poder buscar a ese participante en la base de datos). El hook `useParams` extrae esos valores de la URL.

```tsx
// pages/EditarPage.tsx
import { useParams } from "react-router-dom";

export default function EditarPage() {
  // Si la URL es /editar/45, 'id' valdrá "45"
  const { id } = useParams();

  // Ahora podemos buscar al participante con ese id en nuestro Contexto/API
  // ...
}
```

---

## Patrón de Diseño: El callback `onSuccess`

En el TP6 se introduce un patrón muy útil al separar los componentes de UI (`<Formulario />`) de las páginas (`FormularioPage`, `EditarPage`).

El `<Formulario />` en sí no debería saber a dónde redirigir al usuario después de guardar, porque su única responsabilidad es manejar los inputs y disparar la acción (guardar o actualizar). 

La responsabilidad de la navegación recae sobre la "Página" que lo contiene. Para lograr esto, la Página le pasa una función al Formulario a través de una prop llamada (por convención) `onSuccess`.

### Ejemplo del flujo:

1. **La Página** le dice al formulario qué hacer al terminar:
   ```tsx
   // FormularioPage.tsx
   const navigate = useNavigate();
   // Le pasamos el callback onSuccess
   return <Formulario onSuccess={() => navigate("/")} />
   ```

2. **El Formulario** ejecuta esa función solo si todo salió bien:
   ```tsx
   // components/Formulario.tsx
   export default function Formulario({ onSuccess }) {
     const submit = (e) => {
       e.preventDefault();
       
       // ... lógica de guardar (dispatch a Context, o petición a API) ...
       
       // Una vez guardado, ejecutamos la función que nos dio el padre
       // ¡Esto ejecutará el navigate("/") del padre!
       onSuccess(); 
     }
   }
   ```

Este patrón hace que tu `<Formulario />` sea altamente reutilizable en cualquier contexto, ya que no está fuertemente acoplado a React Router.
