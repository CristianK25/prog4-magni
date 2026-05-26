import api from "./api";
import type { Curso } from "../pages/CursosPage";

/**
 * Servicio para interactuar con la API de pagos (Mercado Pago Checkout Pro).
 */
export const pagosService = {
  /**
   * Crea una preferencia de pago en el backend.
   * 
   * @param curso Objeto con la información del curso (title y price requeridos por el backend).
   * @returns Un objeto con el init_point (URL de checkout) y otros datos de la preferencia.
   */
  crearPreferencia: async (curso: Curso) => {
    const response = await api.post("/pagos/crear-preferencia", { 
      title: curso.title, 
      price: curso.price 
    });
    return response.data;
  }
};
