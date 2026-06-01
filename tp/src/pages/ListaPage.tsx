import { useState, useContext } from "react";
import { ParticipantesContext } from "../context/ParticipantesContext";
import { filtrarParticipantes } from "../utils/filtros";
import Busqueda from "../components/Busqueda";
import TarjetaParticipantes from "../components/TarjetaParticipante";

/**
 * Página principal que muestra el listado de participantes.
 * 
 * Permite filtrar la lista por nombre, modalidad y nivel mediante el componente Busqueda.
 * Maneja estados de carga y visualización condicional de resultados.
 * 
 * @returns {JSX.Element} Vista con buscador y grilla de participantes.
 */
export default function ListaPage() {
  const { participantes, cargando } = useContext(ParticipantesContext);

  const [filtros, setFiltros] = useState({
    texto: "",
    modalidad: "",
    nivel: "",
  });

  const listaFiltrada = filtrarParticipantes(participantes, filtros);

  let contenidoLista;

  if (cargando) {
    contenidoLista = (
      <div className="col-span-3 text-center text-gray-500 font-medium">
        Cargando participantes, bancame un toque...
      </div>
    );
  } else if (participantes.length === 0) {
    contenidoLista = (
      <div className="col-span-3 text-center text-gray-500 font-medium">
        No hay participantes aún. ¡Agregá el primero!
      </div>
    );
  } else if (listaFiltrada.length === 0) {
    contenidoLista = (
      <div className="col-span-3 text-center text-gray-500 font-medium">
        No se encontraron resultados para esos filtros.
      </div>
    );
  } else {
    contenidoLista = listaFiltrada.map((persona) => (
      <TarjetaParticipantes key={persona.id} participante={persona} />
    ));
  }

  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-start bg-white pb-20">
      <Busqueda filtros={filtros} onFiltrar={setFiltros} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-64 mt-4 max-w-4xl mx-auto w-full px-8">
        {contenidoLista}
      </div>
    </div>
  );
}
