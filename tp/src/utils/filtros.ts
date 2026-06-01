import type Participante from "../models/Participante";

/**
 * Define los criterios de búsqueda aplicables a la lista de participantes.
 */
export interface FiltrosBusqueda {
  /** Texto para buscar por nombre (case-insensitive) */
  texto: string;
  /** Modalidad específica (presencial, virtual, hibrido) */
  modalidad: string;
  /** Nivel de experiencia (principiante, intermedio, avanzado) */
  nivel: string;
}

/**
 * Filtra una lista de participantes basándose en múltiples criterios de búsqueda.
 * Aplica una lógica de intersección (AND) donde el participante debe cumplir
 * con todos los filtros activos para ser incluido en el resultado.
 * 
 * @param {Participante[]} participantes - La lista completa de participantes a filtrar.
 * @param {FiltrosBusqueda} filtros - Los criterios de filtrado seleccionados.
 * @returns {Participante[]} Un nuevo arreglo con los participantes que coinciden con los filtros.
 */
export const filtrarParticipantes = (
  participantes: Participante[],
  filtros: FiltrosBusqueda
): Participante[] => {
  return participantes.filter((persona) => {
    const coincideTexto =
      filtros.texto === "" ||
      persona.nombre.toLowerCase().includes(filtros.texto.toLowerCase());

    const coincideModalidad =
      filtros.modalidad === "" || persona.modalidad === filtros.modalidad;

    const coincideNivel =
      filtros.nivel === "" || persona.nivel === filtros.nivel;

    return coincideTexto && coincideModalidad && coincideNivel;
  });
};
