import { useContext } from "react";
import { ParticipantesContext } from "../context/ParticipantesContext";

/**
 * Hook personalizado para acceder al contexto de participantes.
 * 
 * Este hook encapsula la lógica de useContext y agrega una validación
 * para asegurar que se esté utilizando dentro de un ParticipantesProvider.
 * 
 * @returns {ParticipantesContextType} El objeto de contexto con el estado y las acciones.
 * @throws {Error} Si se utiliza fuera de un ParticipantesProvider.
 */
export const useParticipantes = () => {
  const context = useContext(ParticipantesContext);

  // Validación de seguridad: si el contexto es indefinido, significa que no pusimos el Provider en App.tsx
  if (!context || Object.keys(context).length === 0) {
    throw new Error(
      "useParticipantes debe ser utilizado dentro de un ParticipantesProvider"
    );
  }

  return context;
};
