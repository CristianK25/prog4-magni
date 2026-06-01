import api from "./api";
import type Participante from "../models/Participante";

/**
 * Servicio para la gestión de participantes a través de la API.
 */
export const ParticipanteService = {
  /**
   * Obtiene la lista completa de participantes.
   * @returns {Promise<Participante[]>} Lista de participantes o arreglo vacío en caso de error.
   */
  getAll: async (): Promise<Participante[]> => {
    try {
      const response = await api.get<Participante[]>("/participantes");
      return response.data;
    } catch (error) {
      console.error("Error trayendo participantes del back", error);
      return [];
    }
  },

  /**
   * Crea un nuevo participante en el sistema.
   * @param {Omit<Participante, "id">} nuevoParticipante - Datos del participante a registrar.
   * @returns {Promise<Participante>} El participante creado con su ID asignado.
   */
  create: async (nuevoParticipante: Omit<Participante, "id">): Promise<Participante> => {
    const response = await api.post<Participante>("/participantes", nuevoParticipante);
    return response.data;
  },

  /**
   * Elimina un participante de forma permanente.
   * @param {number} id - ID del participante a eliminar.
   * @returns {Promise<void>}
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/participantes/${id}`);
  },

  /**
   * Actualiza los datos de un participante existente.
   * @param {number} id - ID del participante.
   * @param {Omit<Participante, "id">} datosActualizados - Nuevos datos.
   * @returns {Promise<Participante>} El participante actualizado.
   */
  update: async (id: number, datosActualizados: Omit<Participante, "id">): Promise<Participante> => {
    const response = await api.put<Participante>(`/participantes/${id}`, datosActualizados);
    return response.data;
  },
};
