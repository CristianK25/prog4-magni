import React, { useState, useEffect } from "react";

// Estructura de ejemplo para la entidad (adaptar al examen)
interface DatosFormulario {
  nombre: string;
  categoria: string;
  precio: string; // Se suele capturar como string y parsear a número al guardar
  fechaRegistro: string;
  activo: boolean;
}

interface FormularioProps {
  itemEdicion?: DatosFormulario | null; // Si se pasa, es modo edición
  onGuardar: (datos: DatosFormulario) => void;
  onCancelar: () => void;
}

export const Formulario: React.FC<FormularioProps> = ({
  itemEdicion = null,
  onGuardar,
  onCancelar,
}) => {
  // Estado inicial vacío
  const estadoInicial: DatosFormulario = {
    nombre: "",
    categoria: "",
    precio: "",
    fechaRegistro: "",
    activo: true,
  };

  const [form, setForm] = useState<DatosFormulario>(estadoInicial);
  const [errores, setErrores] = useState<Partial<Record<keyof DatosFormulario, string>>>({});

  // Cargar datos si viene de una edición
  useEffect(() => {
    if (itemEdicion) {
      setForm(itemEdicion);
    } else {
      setForm(estadoInicial);
    }
    setErrores({});
  }, [itemEdicion]);

  // Manejador genérico para inputs de texto, número, fecha, select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador específico para checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Validaciones locales (personalizar según las reglas del examen)
  const validar = (): boolean => {
    const nuevosErrores: Partial<Record<keyof DatosFormulario, string>> = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (form.nombre.length < 3) {
      nuevosErrores.nombre = "Debe tener al menos 3 caracteres.";
    }

    if (!form.categoria) {
      nuevosErrores.categoria = "Debe seleccionar una categoría.";
    }

    if (!form.precio) {
      nuevosErrores.precio = "El precio es obligatorio.";
    } else if (isNaN(Number(form.precio)) || Number(form.precio) <= 0) {
      nuevosErrores.precio = "Debe ser un número mayor a 0.";
    }

    if (!form.fechaRegistro) {
      nuevosErrores.fechaRegistro = "La fecha es obligatoria.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validar()) {
      onGuardar(form);
      setForm(estadoInicial); // Limpiar formulario
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-gray-300 p-4 bg-white max-w-lg">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
        {itemEdicion ? "Editar Elemento" : "Nuevo Elemento"}
      </h2>

      {/* 1. INPUT TEXTO */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className={`w-full border p-2 text-sm focus:outline-none ${
            errores.nombre ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
          }`}
        />
        {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
      </div>

      {/* 2. SELECTOR (SELECT) */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Categoría</label>
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className={`w-full border p-2 text-sm focus:outline-none ${
            errores.categoria ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
          }`}
        >
          <option value="">-- Seleccionar --</option>
          <option value="Electronica">Electrónica</option>
          <option value="Hogar">Hogar</option>
          <option value="Indumentaria">Indumentaria</option>
        </select>
        {errores.categoria && <p className="text-red-500 text-xs mt-1">{errores.categoria}</p>}
      </div>

      {/* 3. INPUT NÚMERO */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Precio ($)</label>
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          className={`w-full border p-2 text-sm focus:outline-none ${
            errores.precio ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
          }`}
        />
        {errores.precio && <p className="text-red-500 text-xs mt-1">{errores.precio}</p>}
      </div>

      {/* 4. INPUT FECHA */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Fecha de Registro</label>
        <input
          type="date"
          name="fechaRegistro"
          value={form.fechaRegistro}
          onChange={handleChange}
          className={`w-full border p-2 text-sm focus:outline-none ${
            errores.fechaRegistro ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
          }`}
        />
        {errores.fechaRegistro && <p className="text-red-500 text-xs mt-1">{errores.fechaRegistro}</p>}
      </div>

      {/* 5. CHECKBOX */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="activo"
          id="activo"
          checked={form.activo}
          onChange={handleCheckboxChange}
          className="h-4 w-4 border-gray-300"
        />
        <label htmlFor="activo" className="text-sm text-gray-700 font-medium cursor-pointer">
          ¿Está activo en el catálogo?
        </label>
      </div>

      {/* BOTONES DE ACCIÓN */}
      <div className="flex justify-end gap-2 border-t pt-3">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 border border-gray-400 text-sm font-medium hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium border border-blue-700 hover:bg-blue-700"
        >
          {itemEdicion ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};
