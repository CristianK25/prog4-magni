import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '../models/user.model';

export interface AuthContextType {
  user: User | null;         // null significa que no hay usuario logueado
  isAuthenticated: boolean;  // Booleano derivado para conveniencia
  login: (name: string, email: string) => void;
  logout: () => void;
}

// 2. Creamos el Contexto con un valor por defecto.
// Tipamos el contexto con nuestra interfaz, o undefined para el estado inicial.
// Lo exportamos por si alguien necesita usarlo directamente con useContext,
// aunque la mejor práctica es usar el Custom Hook que crearemos abajo.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Creamos el Componente Proveedor (Provider).
// Este componente envolverá a toda nuestra aplicación (o parte de ella)
// y le "proveerá" los datos y funciones del contexto a sus hijos.
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Manejamos el estado global de la sesión aquí en el provider
  const [user, setUser] = useState<User | null>(null);

  // Funciones que modifican el estado y que expondremos a toda la app
  const login = (name: string, email: string) => {
    // Simulamos un inicio de sesión
    setUser({ id: Date.now().toString(), name, email });
  };

  const logout = () => {
    setUser(null);
  };

  // El objeto "value" contiene todo lo que queremos exponer
  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null, // Derivamos este valor a partir de 'user'
    login,
    logout,
  };

  return (
    // Proveemos el objeto value a cualquier hijo que consuma este contexto
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 4. Custom Hook: useAuth
 * Es una buena práctica crear un hook para consumir el contexto.
 * Esto evita tener que importar `useContext` y `AuthContext` en cada componente,
 * y nos permite manejar errores si alguien intenta usar el hook fuera del Provider.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  // Verificación de seguridad: si context es undefined, 
  // significa que este componente no está dentro de <AuthProvider>
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};
