import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ParticipantesContext } from "../context/ParticipantesContext";
import Formulario from "../components/Formulario";

/**
 * Página para el registro de nuevos participantes.
 * 
 * Asegura que el estado de edición esté limpio al entrar para que el formulario
 * se muestre vacío y configurado para crear un nuevo registro.
 * 
 * @returns {JSX.Element} Vista con el formulario de registro.
 */
export default function FormularioPage() {
  const { seleccionarParaEdicion } = useContext(ParticipantesContext);
  const navigate = useNavigate();

  useEffect(() => {
    seleccionarParaEdicion(null);
  }, [seleccionarParaEdicion]);

  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-start bg-white pb-20">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-left mb-6 bg-blue-600 px-5 py-2 text-white">
          Nuevo Participante
        </h1>
        <div className="px-10 max-w-4xl mx-auto w-full">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            ← Volver al listado
          </Link>
        </div>
      </div>

      <div className="w-full mt-4">
        <Formulario onSuccess={() => navigate("/")} />
      </div>
    </div>
  );
}
