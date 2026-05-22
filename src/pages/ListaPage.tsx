import { useSearchParticipantes } from "../hooks/useSearchParticipantes";
import Busqueda from "../components/Busqueda";
import TarjetaParticipantes from "../components/TarjetaParticipante";

/**
 * Página principal que muestra el listado de participantes.
 * 
 * Delega el estado de los filtros y la lógica de filtrado al custom hook useSearchParticipantes.
 * 
 * @returns {JSX.Element} Vista con buscador y grilla de participantes.
 */
export default function ListaPage() {
  const {
    filtros,
    setFiltros,
    listaFiltrada,
    cargando,
    searchRef,
    limpiarFiltros,
    totalParticipantes,
  } = useSearchParticipantes();

  let contenidoLista;

  if (cargando) {
    contenidoLista = (
      <div className="col-span-3 text-center text-gray-500 font-medium">
        Cargando participantes, bancame un toque...
      </div>
    );
  } else if (totalParticipantes === 0) {
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
      <Busqueda 
        filtros={filtros} 
        onFiltrar={setFiltros} 
        searchRef={searchRef} 
        onLimpiar={limpiarFiltros}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-64 mt-4 max-w-4xl mx-auto w-full px-8">
        {contenidoLista}
      </div>
    </div>
  );
}
