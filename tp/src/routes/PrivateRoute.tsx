import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

/**
 * Propiedades para el componente de ruta privada.
 */
interface PrivateRouteProps {
  /** Componentes que se renderizarán si el acceso es permitido */
  children: ReactNode;
  /** Rol mínimo requerido para acceder a la ruta (opcional) */
  rol?: "ADMIN" | "CONSULTA";
}

/**
 * Componente de orden superior para proteger rutas según el estado de autenticación.
 * 
 * Verifica si existe un usuario autenticado y si posee el rol necesario.
 * Redirige al login si no hay sesión, o al inicio si no cumple con el rol.
 * 
 * @param {PrivateRouteProps} props - Propiedades del componente.
 * @returns {JSX.Element} El contenido protegido o un componente de redirección.
 */
const PrivateRoute = ({ children, rol }: PrivateRouteProps) => {
  const { user, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Verificando sesión...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (rol && user.rol !== rol) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
