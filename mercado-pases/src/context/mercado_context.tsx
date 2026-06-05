import { createContext } from 'react';
import type { ReactNode } from "react";
import { useState } from 'react';
import type JugadorMercado from '../modelo/JugadorMercado';

export interface JugadorMercadoType{
    jugadoresDisponibles: JugadorMercado[]
    jugadoresComprados: JugadorMercado[]
    presupuestoDisponible: number

    comprarJugador: (jugador: JugadorMercado) => void
    venderJugador: (jugador: JugadorMercado) => void
    puedeConfirmarPlantilla: () => string | null
}


// Se crea el contexto. El valor inicial se puede dejar vacío o castear en TypeScript.
export const Contexto = createContext<JugadorMercadoType | null>(null);

export function Proveedor({ children } : { children: ReactNode }) {
  const [dato, setDato] = useState("Valor Global");
  
  return (
    <Contexto.Provider value={{ dato, setDato }}>
      {children}
    </Contexto.Provider>
  );
}