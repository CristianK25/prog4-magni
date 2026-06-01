import api from "./api";
import type { Curso } from "../pages/CursosPage";

export interface Compra {
  id: number;
  payment_id: string;
  status: "success" | "failure" | "pending";
  curso_nombre: string;
  usuario_id: number | null;
  external_reference: string;
  created_at: string;
}

/**
 * Servicio para interactuar con la API de pagos (Mercado Pago Checkout Pro).
 */
export const pagosService = {
  /**
   * Crea una preferencia de pago en el backend.
   */
  crearPreferencia: async (curso: Curso) => {
    const response = await api.post("/pagos/crear-preferencia", { 
      title: curso.title, 
      price: curso.price 
    });
    return response.data;
  },

  /**
   * Lista todas las compras registradas. Solo ADMIN.
   */
  listarCompras: async (): Promise<Compra[]> => {
    const response = await api.get("/pagos/");
    return response.data;
  },

  /**
   * Obtiene los nombres de los cursos que el usuario actual ya compró y están aprobados.
   */
  misCompras: async (): Promise<{ curso_nombre: string }[]> => {
    const response = await api.get("/pagos/mis-compras");
    return response.data;
  }
};

