import { useState, type ChangeEvent } from "react";


/**
 * Hook personalizado genérico para la gestión de estados de formularios.
 * 
 * Permite manejar el estado de cualquier objeto, proporcionando una función
 * estándar para cambios en inputs de texto, select y radio, además de una
 * función para resetear el formulario.
 * 
 * @template T - El tipo del objeto que representa los datos del formulario.
 * @param {T} initialForm - El estado inicial del formulario.
 * @returns {Object} Un objeto con el estado actual, el manejador de cambios y funciones auxiliares.
 */
export const useForm = <T>(initialForm: T) => {
  const [formData, setFormData] = useState<T>(initialForm);

  /**
   * Maneja cambios en inputs estándar (text, number, email, select, radio).
   * Utiliza el atributo 'name' del input para mapear el valor al estado.
   */
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = target;
    
    // Si es checkbox, usamos 'checked', sino usamos 'value'
    const valorFinal = type === "checkbox" 
      ? (target as HTMLInputElement).checked 
      : value;

    setFormData({
      ...formData,
      [name]: valorFinal,
    });
  };

  /**
   * Reinicia el formulario al estado inicial proporcionado.
   */
  const resetForm = () => {
    setFormData(initialForm);
  };

  /**
   * Permite actualizar manualmente todo el estado o una parte (útil para edición).
   */
  const setValues = (newValues: T) => {
    setFormData(newValues);
  };

  return {
    formData,
    ...formData, // Exponemos los campos individualmente para facilitar el acceso
    handleChange,
    resetForm,
    setValues,
    setFormData, // Exponemos la función cruda por si necesitamos lógica compleja (ej: arrays)
  };
};
