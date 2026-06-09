import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos el Contexto (la caja) que creamos en mercado_context.tsx
import { Contexto, type JugadorMercadoType } from '../context/mercado_context';
import type JugadorMercado from '../modelo/JugadorMercado';

// =====================================================================================
// PÁGINA PRINCIPAL: MercadoPasesPage
// =====================================================================================
export default function MercadoPasesPage() {
  // 1. Usar useContext para leer el estado global
  const contexto = useContext(Contexto) as JugadorMercadoType;
  
  // Extraemos todos los datos y funciones que expone el proveedor
  const {
    jugadoresDisponibles,
    jugadoresComprados,
    presupuestoDisponible,
    comprarJugador,
    venderJugador,
    puedeConfirmarPlantilla
  } = contexto;

  // 2. Estado local para manejar el mensaje de error de validación
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

  // 3. Hook de enrutamiento para ir a la pantalla final al aprobar
  const navigate = useNavigate();

  // Función auxiliar rápida para formatear los números a pesos con puntos (ej. 15000000 -> $15.000.000)
  const formatearDinero = (monto: number) => {
    return "$" + monto.toLocaleString("es-AR");
  };

  // Cálculo del Costo Total Invertido
  const costoTotalInvertido = jugadoresComprados.reduce((sum, j) => sum + j.valorMercado, 0);

  // 4. Manejador para el botón "Confirmar Plantilla"
  const handleConfirmar = () => {
    const resultado = puedeConfirmarPlantilla();
    if (resultado) {
      setErrorValidacion(resultado);
    } else {
      setErrorValidacion(null);
      navigate("/final");
    }
  };

  return (
    // Centramos todo el contenido en una sola columna vertical con un ancho máximo de 4xl
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* ====================================================================
          1. HEADER: PRESUPUESTO DISPONIBLE
          ==================================================================== */}
      <div className="border border-gray-400 p-4 bg-gray-100 text-center font-bold text-xl rounded">
        Presupuesto Disponible: <span className="text-blue-700">{formatearDinero(presupuestoDisponible)}</span>
      </div>

      {/* ====================================================================
          2. SECCIÓN SUPERIOR: JUGADORES DISPONIBLES (CON SCROLL)
          ==================================================================== */}
      <div className="border border-gray-300 bg-white rounded shadow-sm">
        <div className="bg-gray-100 p-3 border-b border-gray-300 font-bold text-sm text-gray-800 rounded-t">
          Jugadores Disponibles: {jugadoresDisponibles.length}
        </div>
        
        {/* Contenedor del scroll: 'max-h-[300px] overflow-y-auto' */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          <table className="w-full border-collapse border border-gray-300 text-left text-xs">
            <thead>
              <tr>
                {/* 
                  Aplicamos 'sticky top-0 bg-gray-200 z-10' directamente a cada 'th'.
                  Esto garantiza que la celda tenga fondo gris y tape las filas que suben.
                */}
                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Equipo Actual</th>
                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Posición</th>
                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Valor</th>
                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {jugadoresDisponibles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="border border-gray-300 p-4 text-center text-gray-500">
                    No hay más jugadores disponibles.
                  </td>
                </tr>
              ) : (
                jugadoresDisponibles.map((jugador: JugadorMercado) => (
                  <tr key={jugador.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 font-medium text-gray-900">{jugador.nombreCompleto}</td>
                    <td className="border border-gray-300 p-2 text-gray-600">{jugador.equipoActual}</td>
                    <td className="border border-gray-300 p-2 text-gray-600">{jugador.posicion}</td>
                    <td className="border border-gray-300 p-2 text-gray-900 font-semibold">{formatearDinero(jugador.valorMercado)}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        onClick={() => comprarJugador(jugador)}
                        className="bg-blue-600 border border-blue-700 text-white px-3 py-1 font-semibold text-xs hover:bg-blue-700 rounded"
                      >
                        Comprar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================================
          3. SECCIÓN INFERIOR: JUGADORES COMPRADOS (CON SCROLL)
          ==================================================================== */}
      <div className="border border-gray-300 bg-white rounded shadow-sm">
        <div className="bg-gray-100 p-3 border-b border-gray-300 font-bold text-sm text-gray-800 rounded-t">
          Jugadores Comprados: {jugadoresComprados.length}
        </div>

        {/* Cuadro resumen de gastos */}
        <div className="m-4 p-3 border border-gray-300 bg-gray-50 text-xs space-y-1 font-medium rounded">
          <p className="text-gray-700">Cantidad de jugadores contratados: <span className="font-bold text-gray-900">{jugadoresComprados.length}</span></p>
          <p className="text-gray-700">Costo total invertido: <span className="font-bold text-red-600">{formatearDinero(costoTotalInvertido)}</span></p>
          <p className="text-gray-700">Presupuesto restante: <span className="font-bold text-green-700">{formatearDinero(presupuestoDisponible)}</span></p>
        </div>

        {/* Contenedor del scroll para jugadores comprados */}
        <div className="max-h-[250px] overflow-y-auto p-2">
          <table className="w-full border-collapse border border-gray-300 text-left text-xs">
            <thead>
              <tr>
                {/* Aplicamos la misma regla sticky a cada celda de cabecera 'th' */}
                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Equipo Actual</th>
                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Posición</th>
                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700">Valor</th>
                <th className="sticky top-0 bg-gray-200 z-10 border border-gray-300 p-2 font-bold text-gray-700 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {jugadoresComprados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="border border-gray-300 p-4 text-center text-gray-500">
                    Aún no has comprado ningún jugador.
                  </td>
                </tr>
              ) : (
                jugadoresComprados.map((jugador: JugadorMercado) => (
                  <tr key={jugador.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 font-medium text-gray-900">{jugador.nombreCompleto}</td>
                    <td className="border border-gray-300 p-2 text-gray-600">{jugador.equipoActual}</td>
                    <td className="border border-gray-300 p-2 text-gray-600">{jugador.posicion}</td>
                    <td className="border border-gray-300 p-2 text-gray-900 font-semibold">{formatearDinero(jugador.valorMercado)}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        onClick={() => venderJugador(jugador)}
                        className="bg-green-600 border border-green-700 text-white px-3 py-1 font-semibold text-xs hover:bg-green-700 rounded"
                      >
                        Vender
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================================
          4. PIE DE PÁGINA: VALIDACIONES Y ACCIÓN DE CONFIRMAR
          ==================================================================== */}
      <div className="border border-gray-300 p-4 bg-white rounded shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          {/* Mensaje de error de validación en rojo si las reglas deportivas fallaron */}
          {errorValidacion && (
            <p className="text-red-600 font-bold text-sm border border-red-300 bg-red-50 p-2 rounded">
              {errorValidacion}
            </p>
          )}
        </div>
        
        <button
          onClick={handleConfirmar}
          className="bg-gray-700 border border-gray-800 text-white px-6 py-2 font-bold text-sm hover:bg-gray-800 rounded self-end"
        >
          Confirmar Plantilla
        </button>
      </div>

    </div>
  );
}