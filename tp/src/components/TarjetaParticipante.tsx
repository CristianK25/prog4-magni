import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import type Participante from "../models/Participante";
import { ParticipantesContext } from "../context/ParticipantesContext";
import { useAuth } from "../context/AuthContext";

/**
 * Propiedades para la tarjeta del participante.
 */
interface PropsTarjeta {
  /** El objeto participante con toda su información */
  participante: Participante;
}

/**
 * Componente que muestra la información resumida de un participante en una tarjeta.
 * Incluye acciones de edición y eliminación restringidas a administradores.
 * 
 * @param {PropsTarjeta} props - Propiedades del componente.
 * @returns {JSX.Element} Una tarjeta con los datos del participante y botones de acción según el rol.
 */
export default function TarjetaParticipantes({ participante }: PropsTarjeta) {
  const { eliminar } = useContext(ParticipantesContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { id, nombre, pais, modalidad, nivel, tecnologias } = participante;
  
  let colorNivel = "";
  if (nivel === "principiante") colorNivel = "bg-green-200 text-green-900";
  else if (nivel === "intermedio") colorNivel = "bg-yellow-200 text-yellow-900";
  else if (nivel === "avanzado") colorNivel = "bg-red-200 text-red-900";

  return (
    <div className={`border border-gray-200 shadow-sm rounded p-4 bg-white`}>
      <p className="text-lg font-bold">{nombre}</p>
      <p className="text-gray-600">{pais}</p>
      <p className="text-sm">Modalidad: {modalidad}</p>

      <p className={`inline-block px-2 py-1 rounded font-semibold mt-2 mb-2 ${colorNivel}`}>
        Nivel: {nivel}
      </p>
      <p className="text-sm text-gray-700">{tecnologias.join(", ")}</p>

      {user?.rol === "ADMIN" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/editar/${id}`)}
            className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
          >
            Editar
          </button>
          <button
            onClick={() => eliminar(id)}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
