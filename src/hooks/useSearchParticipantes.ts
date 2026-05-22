import { useState, useEffect, useRef, useContext } from "react";
import { ParticipantesContext } from "../context/ParticipantesContext";
import { filtrarParticipantes } from "../utils/filtros";

/**
 * Hook personalizado para gestionar el estado de los filtros de búsqueda,
 * el atajo de teclado Ctrl + B para enfocar el buscador, y el listado de participantes filtrados.
 */
export const useSearchParticipantes = () => {
  const { participantes, cargando } = useContext(ParticipantesContext);
  
  const [filtros, setFiltros] = useState({
    texto: "",
    modalidad: "",
    nivel: "",
  });

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const manejarAtajo = (e: KeyboardEvent) => {
      // Al presionar Ctrl + B, enfocamos el input buscador
      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", manejarAtajo);
    
    // Limpieza del event listener al desmontar el hook
    return () => {
      window.removeEventListener("keydown", manejarAtajo);
    };
  }, []);

  const limpiarFiltros = () => {
    setFiltros({
      texto: "",
      modalidad: "",
      nivel: "",
    });
  };

  const listaFiltrada = filtrarParticipantes(participantes, filtros);

  return {
    filtros,
    setFiltros,
    listaFiltrada,
    cargando,
    searchRef,
    limpiarFiltros,
    totalParticipantes: participantes.length,
  };
};
