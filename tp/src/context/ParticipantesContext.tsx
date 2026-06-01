import { createContext, useState, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import type Participante from "../models/Participante";
import { ParticipanteService } from "../services/participanteService";
import { participantesReducer } from "../reducers/participantesReducer";

/**
 * Define la estructura y acciones disponibles en el contexto de participantes.
 */
export interface ParticipantesContextType {
  /** Lista global de participantes cargados en memoria */
  participantes: Participante[];
  /** 
   * Registra un nuevo participante en el backend y actualiza el estado local.
   * @param {Omit<Participante, "id">} p - Datos del participante sin el ID.
   */
  agregar: (p: Omit<Participante, "id">) => Promise<void>;
  /** 
   * Elimina un participante del backend y lo remueve del estado local.
   * @param {number} id - ID único del participante.
   */
  eliminar: (id: number) => Promise<void>;
  /** 
   * Actualiza los datos de un participante existente.
   * @param {number} id - ID del participante a editar.
   * @param {Omit<Participante, "id">} p - Nuevos datos.
   */
  editar: (id: number, p: Omit<Participante, "id">) => Promise<void>;
  /** Indica si la aplicación está esperando una respuesta del servidor */
  cargando: boolean;
  /** Participante seleccionado para ser mostrado o editado en el formulario */
  participanteSeleccionado: Participante | null;
  /** 
   * Establece el participante que se cargará en el formulario de edición.
   * @param {Participante | null} p - El objeto participante o null para limpiar.
   */
  seleccionarParaEdicion: (p: Participante | null) => void;
}


/**
 * Contexto para la gestión global de los participantes de la aplicación.
 */
export const ParticipantesContext = createContext<ParticipantesContextType>(
  {} as ParticipantesContextType
);


/**
 * Proveedor que envuelve la aplicación para inyectar el estado de los participantes.
 * 
 * Gestiona la sincronización con el backend a través de ParticipanteService
 * y utiliza un reducer para manejar las mutaciones del estado local de forma predecible.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 */
export const ParticipantesProvider = ({ children }: { children: ReactNode }) => {
  const [participantes, dispatch] = useReducer(participantesReducer, []);
  const [cargando, setCargando] = useState(true);
  const [participanteSeleccionado, setParticipanteSeleccionado] = useState<Participante | null>(null);

  /**
   * Obtiene la lista completa de participantes desde el servicio y actualiza el estado.
   */
  const cargarParticipantes = async () => {
    setCargando(true);
    try {
      const data = await ParticipanteService.getAll();
      dispatch({ type: "GET_PARTICIPANTES", payload: data });
    } catch (error) {
      console.error("Error al recuperar participantes de la BD", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarParticipantes();
  }, []);

  const agregar = async (nuevoParticipante: Omit<Participante, "id">) => {
    try {
      const participanteCreado = await ParticipanteService.create(nuevoParticipante);
      dispatch({ type: "AGREGAR", payload: participanteCreado });
    } catch (error) {
      console.error("No se pudo guardar el participante", error);
    }
  };

  const eliminar = async (id: number) => {
    try {
      await ParticipanteService.delete(id);
      dispatch({ type: "ELIMINAR", payload: id });
    } catch (error) {
      console.error("Error al intentar eliminar el participante", error);
    }
  };

  const editar = async (id: number, participanteActualizado: Omit<Participante, "id">) => {
    try {
      const editado = await ParticipanteService.update(id, participanteActualizado);
      dispatch({ type: "EDITAR", payload: editado });
    } catch (error) {
      console.error("Ups, no se pudo editar", error);
    }
  };

  const seleccionarParaEdicion = (p: Participante | null) => {
    setParticipanteSeleccionado(p);
  };

  return (
    <ParticipantesContext.Provider
      value={{
        participantes,
        agregar,
        eliminar,
        editar,
        cargando,
        participanteSeleccionado,
        seleccionarParaEdicion,
      }}
    >
      {children}
    </ParticipantesContext.Provider>
  );
};
