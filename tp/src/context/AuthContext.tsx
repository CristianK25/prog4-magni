import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../services/api";

/**
 * Representa la información básica de un usuario autenticado.
 */
export interface User {
  /** ID único del usuario en la base de datos */
  id: number;
  /** Nombre de usuario utilizado para el login */
  username: string;
  /** Rol del usuario que define sus permisos en la aplicación */
  rol: "ADMIN" | "CONSULTA";
}

/**
 * Estructura de los datos y métodos expuestos por el contexto de autenticación.
 */
interface AuthContextType {
  /** Datos del usuario actual o null si no está autenticado */
  user: User | null;
  /** Token JWT de la sesión actual */
  token: string | null;
  /** 
   * Inicia sesión en el sistema y persiste los datos en localStorage.
   * @param {string} username - Nombre de usuario.
   * @param {string} password - Contraseña.
   */
  login: (username: string, password: string) => Promise<void>;
  /** Cierra la sesión actual y limpia la persistencia local */
  logout: () => void;
  /** Indica si se está verificando la sesión al cargar la aplicación */
  cargando: boolean;
}

/**
 * Contexto para gestionar la autenticación y el estado del usuario en toda la app.
 */
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

/**
 * Proveedor de autenticación que gestiona el login, logout y la persistencia de sesión.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Componentes hijos con acceso al contexto.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setCargando(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { access_token, user: userData } = response.data;

      setToken(access_token);
      setUser(userData);

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error en el login", error);
      throw new Error("Usuario o contraseña incorrectos");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para acceder fácilmente al contexto de autenticación.
 * 
 * @returns {AuthContextType} Objeto con el estado y métodos de autenticación.
 * @throws {Error} Si se usa fuera de un AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
