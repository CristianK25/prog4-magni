import type { RefObject } from "react";
import type { FiltrosBusqueda } from "../utils/filtros";

/**
 * Propiedades para el componente de búsqueda.
 */
interface BusquedaProps {
  /** Estado actual de los filtros de búsqueda */
  filtros: FiltrosBusqueda;
  /** Callback para actualizar los filtros en el estado global/padre */
  onFiltrar: (nuevosFiltros: FiltrosBusqueda) => void;
  /** Referencia al elemento input de búsqueda provisto por el hook padre */
  searchRef: RefObject<HTMLInputElement | null>;
  /** Callback para restablecer los filtros de búsqueda a su estado inicial */
  onLimpiar: () => void;
}

/**
 * Componente de barra de búsqueda con filtros por texto, modalidad y nivel.
 * 
 * Recibe toda la lógica a través de propiedades, manteniéndose como un componente de presentación puro.
 * 
 * @param {BusquedaProps} props - Propiedades del componente.
 * @returns {JSX.Element} Un contenedor con inputs y selects para filtrar participantes.
 */
export default function Busqueda({ 
  filtros, 
  onFiltrar, 
  searchRef, 
  onLimpiar 
}: BusquedaProps) {

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-center m-4 mb-6 gap-2 w-full max-w-4xl mx-auto px-8 mt-8 border border-gray-200 p-4 shadow-sm rounded bg-gray-50">
      <input
        ref={searchRef}
        type="text"
        placeholder="Buscar por nombre... (Ctrl + B)"
        value={filtros.texto}
        onChange={(e) => onFiltrar({ ...filtros, texto: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
      />
      <select
        name="modalidad"
        id="select-modalidad"
        value={filtros.modalidad}
        onChange={(e) => onFiltrar({ ...filtros, modalidad: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
      >
        <option value="">Todas las modalidades</option>
        <option value="presencial">Presencial</option>
        <option value="virtual">Virtual</option>
        <option value="hibrido">Híbrido</option>
      </select>
      <select
        name="nivel"
        id="select-nivel"
        value={filtros.nivel}
        onChange={(e) => onFiltrar({ ...filtros, nivel: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
      >
        <option value="">Todos los niveles</option>
        <option value="principiante">Principiante</option>
        <option value="intermedio">Intermedio</option>
        <option value="avanzado">Avanzado</option>
      </select>

      {/* Botón purificador */}
      <button
        type="button"
        onClick={onLimpiar}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm transition"
        title="Limpiar filtros"
      >
        Limpiar
      </button>
    </div>
  );
}
