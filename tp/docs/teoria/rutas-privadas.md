# Rutas Privadas en React (React Router)

En una aplicación web, no todas las pantallas deben ser públicas. Ciertas páginas (como el panel de administración, la edición de perfil o la carga de datos) solo deben estar accesibles si el usuario ha iniciado sesión, y a veces, solo si tiene un **rol específico** (ej: Administrador).

Para lograr esto en React con `react-router-dom`, utilizamos el patrón de **Componente Envoltorio (Wrapper Component)** o Componente de Orden Superior (HOC).

---

## 1. ¿Qué es una Ruta Privada?

Una ruta privada no es una característica mágica que viene incorporada en React Router. Es simplemente un **componente personalizado** que creamos nosotros mismos. Su único trabajo es actuar como un guardia de seguridad en la puerta de una discoteca:

1.  **Revisa la identidad:** Se fija si el usuario tiene sesión iniciada (usualmente consultando un `AuthContext`).
2.  **Revisa los permisos (Rol):** Si la ruta requiere ser "ADMIN", verifica que el usuario lo sea.
3.  **Toma una decisión:**
    *   Si **no** está logueado: Lo echa (redirige a `/login`).
    *   Si está logueado pero **no tiene el rol adecuado**: Lo manda a la página principal (`/`).
    *   Si todo está en orden: Le permite pasar y muestra la pantalla solicitada.

---

## 2. Implementación: El componente `<PrivateRoute>`

Este archivo generalmente se ubica en la carpeta `src/routes/` o `src/components/`.

```tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Tu hook personalizado para leer el contexto de autenticación

interface PrivateRouteProps {
  children: React.ReactNode;
  rol?: "ADMIN" | "CONSULTA"; // Opcional: si la ruta exige un rol específico
}

export default function PrivateRoute({ children, rol }: PrivateRouteProps) {
  // 1. Obtenemos el usuario del contexto global de autenticación
  const { user, cargando } = useAuth();

  // (Opcional pero recomendado): Mostrar un "Cargando" mientras React
  // verifica la sesión inicial, para evitar un parpadeo o redirección en falso.
  if (cargando) return <p>Verificando sesión...</p>;

  // 2. Si NO hay usuario, redirigimos al login
  if (!user) {
    // Usamos el componente <Navigate /> para redirección declarativa en lugar de useNavigate()
    return <Navigate to="/login" replace />; 
  }

  // 3. Si se exigió un rol, y el rol del usuario NO coincide, lo pateamos al inicio
  if (rol && user.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  // 4. Si pasó todos los filtros, renderizamos lo que estaba "adentro" (children)
  return <>{children}</>;
}
```

### ¿Por qué usamos `<Navigate />` y no `useNavigate()`?
*   `useNavigate()` es una función. Se usa en respuesta a eventos (ej: "Al hacer click en el botón de guardar, navega a X").
*   `<Navigate />` es un componente. Se usa en la fase de **renderizado**. Como `PrivateRoute` debe retornar JSX (elementos visuales), si no podemos mostrar la página, retornamos este componente invisible que le dice a React Router "llévame a otra URL de inmediato".

---

## 3. ¿Cómo aplicar las Rutas Privadas?

Una vez creado tu guardia de seguridad (`PrivateRoute`), debes ponerlo en la puerta de las rutas que quieres proteger. Esto se hace en tu archivo de definición de rutas (usualmente `App.tsx` o donde tengas tus `<Routes>`).

Envolvemos el `element` que queremos proteger con nuestro `<PrivateRoute>`.

```tsx
import { Routes, Route } from "react-router-dom";
// ... imports de tus páginas ...

export default function App() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS (No tienen guardia) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/publica" element={<PublicaPage />} />

      {/* RUTAS PRIVADAS BÁSICAS (Solo piden estar logueado) */}
      <Route 
        path="/lista" 
        element={
          <PrivateRoute>
            <ListaPage />
          </PrivateRoute>
        } 
      />

      {/* RUTAS PRIVADAS CON ROL (Piden estar logueado Y ser ADMIN) */}
      <Route 
        path="/nuevo" 
        element={
          <PrivateRoute rol="ADMIN">
            <FormularioPage />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/editar/:id" 
        element={
          <PrivateRoute rol="ADMIN">
            <EditarPage />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}
```
*Si el usuario no es ADMIN e intenta entrar a `/nuevo`, el `PrivateRoute` interceptará la carga del `FormularioPage` y renderizará el `<Navigate to="/" />`.*

---

## 4. Jerarquía de Providers en `main.tsx`

Para que el `<PrivateRoute>` pueda leer si hay un usuario logueado, necesita acceder al `<AuthContext>`. 

A su vez, es muy común que otros contextos de tu aplicación (como un `ParticipantesContext` que carga datos desde una API) necesiten saber el Token del usuario para hacer peticiones. 

Por esta razón, **el Proveedor de Autenticación debe envolver a los demás proveedores**, y todos deben estar dentro del enrutador.

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 1. Router: Habilita la navegación */}
    <BrowserRouter>
      
      {/* 2. Auth: Gestiona el usuario y sesión. Es el padre de la lógica de negocio */}
      <AuthProvider>
        
        {/* 3. Lógica de negocio específica (depende de Auth) */}
        <ParticipantesProvider>
          
          <App /> {/* Aquí adentro viven tus <Routes> y tu <PrivateRoute> */}
          
        </ParticipantesProvider>
        
      </AuthProvider>

    </BrowserRouter>
  </StrictMode>
);
```
