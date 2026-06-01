/**
 * Representa la estructura de datos de un Participante en el frontend.
 * Sincronizado con el modelo de base de datos del backend.
 */
export default interface Participante {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  tecnologias: string[];
  modalidad: string;
  nivel: string;
  aceptaTerminos: boolean;
}
