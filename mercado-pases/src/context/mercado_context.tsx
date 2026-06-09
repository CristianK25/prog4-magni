import { createContext, useContext, useState, type ReactNode } from 'react';
import type JugadorMercado from '../modelo/JugadorMercado';
// Importamos el archivo JSON con los jugadores iniciales.
// En Vite, podés importar archivos JSON directamente con su ruta relativa.
import datosJugadores from "../../docs/mercado_pases.json";

// =====================================================================================
// 1. INTERFAZ DEL CONTEXTO (JugadorMercadoType)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Es la declaración de qué variables y funciones van a ser compartidas de manera global.
// Cualquier componente que se conecte a este contexto tendrá acceso a esto exactamente.
//
// ¿QUÉ TENGO QUE REEMPLAZAR O ADAPTAR EN EL EXAMEN?:
// - Si el examen de mañana trata de otra cosa (por ejemplo, "Alquiler de Autos"), cambiarás:
//   * 'jugadoresDisponibles' -> 'autosDisponibles'
//   * 'comprarJugador' -> 'alquilarAuto'
//   * 'presupuestoDisponible' -> 'dineroDisponible'
// =====================================================================================
export interface JugadorMercadoType {
  jugadoresDisponibles: JugadorMercado[];
  jugadoresComprados: JugadorMercado[];
  presupuestoDisponible: number;
  
  comprarJugador: (jugador: JugadorMercado) => void;
  venderJugador: (jugador: JugadorMercado) => void;
  puedeConfirmarPlantilla: () => string | null; // Devuelve error en string o null si es válida
}

// =====================================================================================
// 2. CREACIÓN DEL CONTEXTO (Contexto)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Es el canal o la "caja" que almacena los datos definidos en la interfaz.
//
// ¿CÓMO FUNCIONA?:
// Le damos un valor por defecto. En este caso se inicializa en 'undefined' o 'null'.
// =====================================================================================
export const Contexto = createContext<JugadorMercadoType | undefined>(undefined);

// =====================================================================================
// 3. COMPONENTE PROVEEDOR (Proveedor)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Es el componente que envuelve a la aplicación (en tu main.tsx). Aquí declaramos
// los estados reales usando 'useState' y la lógica de las funciones.
//
// ¿CÓMO FUNCIONA?:
// - Al arrancar la aplicación, 'jugadoresDisponibles' se inicializa cargando
//   todos los registros del archivo 'mercado_pases.json'.
// - 'presupuestoDisponible' inicia con el valor máximo permitido (120 millones).
// - 'jugadoresComprados' inicia como un arreglo vacío '[]'.
// =====================================================================================
export function Proveedor({ children }: { children: ReactNode }) {
  // ESTADOS PRINCIPALES:
  // Cargamos los jugadores iniciales desde el JSON importado
  const [jugadoresDisponibles, setJugadoresDisponibles] = useState<JugadorMercado[]>(datosJugadores);
  const [jugadoresComprados, setJugadoresComprados] = useState<JugadorMercado[]>([]);
  const [presupuestoDisponible, setPresupuestoDisponible] = useState<number>(120000000); // $120.000.000

  // -----------------------------------------------------------------------------------
  // MÉTODO: COMPRAR JUGADOR
  // -----------------------------------------------------------------------------------
  // ¿CÓMO FUNCIONA?:
  // 1. Quita al jugador seleccionado de la lista de disponibles utilizando '.filter()'.
  // 2. Añade al jugador a la lista de comprados usando el operador spread '[...prev, jugador]'.
  // 3. Resta el valor del jugador ('jugador.valorMercado') al presupuesto disponible.
  // -----------------------------------------------------------------------------------
  const comprarJugador = (jugador: JugadorMercado) => {
    // Quitar de disponibles
    setJugadoresDisponibles((prev) => prev.filter((j) => j.id !== jugador.id));
    
    // Agregar a comprados
    setJugadoresComprados((prev) => [...prev, jugador]);
    
    // Restar del presupuesto
    setPresupuestoDisponible((prev) => prev - jugador.valorMercado);
  };

  // -----------------------------------------------------------------------------------
  // MÉTODO: VENDER JUGADOR
  // -----------------------------------------------------------------------------------
  // ¿CÓMO FUNCIONA?:
  // Hace exactamente lo inverso a comprar:
  // 1. Quita al jugador de la lista de comprados.
  // 2. Lo devuelve a la lista de disponibles.
  // 3. Suma de vuelta su valor al presupuesto.
  // -----------------------------------------------------------------------------------
  const venderJugador = (jugador: JugadorMercado) => {
    // Quitar de comprados
    setJugadoresComprados((prev) => prev.filter((j) => j.id !== jugador.id));
    
    // Devolver a disponibles
    setJugadoresDisponibles((prev) => [...prev, jugador]);
    
    // Devolver dinero al presupuesto
    setPresupuestoDisponible((prev) => prev + jugador.valorMercado);
  };

  // -----------------------------------------------------------------------------------
  // MÉTODO: COMPROBAR / VALIDAR CONDICIONES DE LA PLANTILLA
  // -----------------------------------------------------------------------------------
  // ¿CÓMO FUNCIONA?:
  // Comprueba una a una las reglas requeridas por el enunciado en el PDF:
  // - Presupuesto no negativo.
  // - Cantidad total de comprados entre 18 y 23.
  // - Mínimos por posición (2 Arqueros, 5 Defensores, 5 Mediocampistas, 3 Delanteros).
  // Devuelve la frase de error si alguna condición falla, o 'null' si todo es válido.
  // -----------------------------------------------------------------------------------
  const puedeConfirmarPlantilla = (): string | null => {
    // Regla 1: El presupuesto no puede quedar en negativo
    if (presupuestoDisponible < 0) {
      return "La plantilla no cumple los requisitos deportivos o económicos.";
    }

    // Regla 2: Cantidad total de contratados entre 18 y 23 jugadores inclusive
    const totalContratados = jugadoresComprados.length;
    if (totalContratados < 18 || totalContratados > 23) {
      return "La plantilla no cumple los requisitos deportivos o económicos.";
    }

    // Regla 3: Mínimos por posición (usando .filter().length para contar por códigoPosicion)
    const cantArqueros = jugadoresComprados.filter(j => j.codigoPosicion === "ARQ").length;
    const cantDefensores = jugadoresComprados.filter(j => j.codigoPosicion === "DEF").length;
    const cantMediocampistas = jugadoresComprados.filter(j => j.codigoPosicion === "MED").length;
    const cantDelanteros = jugadoresComprados.filter(j => j.codigoPosicion === "DEL").length;

    if (cantArqueros < 2) return "La plantilla no cumple los requisitos deportivos o económicos.";
    if (cantDefensores < 5) return "La plantilla no cumple los requisitos deportivos o económicos.";
    if (cantMediocampistas < 5) return "La plantilla no cumple los requisitos deportivos o económicos.";
    if (cantDelanteros < 3) return "La plantilla no cumple los requisitos deportivos o económicos.";

    // Si pasó todas las comprobaciones sin retornar antes, la plantilla es VÁLIDA.
    return null;
  };

  return (
    // Pasamos todas las variables y métodos al Contexto para que los hijos las consuman
    <Contexto.Provider
      value={{
        jugadoresDisponibles,
        jugadoresComprados,
        presupuestoDisponible,
        comprarJugador,
        venderJugador,
        puedeConfirmarPlantilla,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}

// =====================================================================================
// 4. HOOK PERSONALIZADO DE ACCESO (useMercado)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Te simplifica enormemente la vida en las páginas. En lugar de escribir:
//   "import { useContext } from 'react'; import { Contexto } from './mercado_context';"
// Solo escribes:
//   "import { useMercado } from '../context/mercado_context';"
// =====================================================================================
export const useMercado = () => {
  const context = useContext(Contexto);
  if (context === undefined) {
    throw new Error("useMercado debe utilizarse dentro de un Proveedor");
  }
  return context;
};