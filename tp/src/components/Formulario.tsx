import { useEffect, useId, useRef } from "react";
import { useParticipantes } from "../hooks/useParticipante";
import { useForm } from "../hooks/useForm";

/**
 * Estado inicial por defecto para el formulario de participantes.
 */
const ESTADO_INICIAL = {
  nombre: "",
  email: "",
  edad: "",
  pais: "Argentina",
  modalidad: "",
  tecnologias: [] as string[],
  nivel: "principiante",
  aceptaTerminos: false,
};

/**
 * Propiedades para el componente Formulario.
 */
interface FormularioProps {
  /** Callback opcional que se ejecuta tras un registro o edición exitosa */
  onSuccess?: () => void;
}

/**
 * Componente de formulario para la creación y edición de participantes.
 * 
 * Gestiona su propio estado interno para los campos de entrada y se sincroniza
 * con el participante seleccionado del contexto cuando se entra en modo edición.
 * 
 * @param {FormularioProps} props - Propiedades del componente.
 * @returns {JSX.Element} Un formulario completo con validaciones básicas.
 */
export default function Formulario({ onSuccess }: FormularioProps) {
  const baseId = useId();
  const { agregar, editar, participanteSeleccionado, seleccionarParaEdicion } = useParticipantes();

  const { formData, handleChange, resetForm, setValues, setFormData } = useForm(ESTADO_INICIAL);
  
  // Referencia para el foco automático
  const nombreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Al cargar el formulario, el foco va directo al campo nombre
    nombreInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (participanteSeleccionado) {
      setValues({
        ...participanteSeleccionado,
        edad: participanteSeleccionado.edad.toString(),
      });
    } else {
      resetForm();
    }
  }, [participanteSeleccionado]);

  // =============== FUNCIONES ESPECÍFICAS Y CLARAS ===============

  /**
   * Agrega o quita una tecnología del listado seleccionado.
   * 
   * @param {string} tecnologia - Nombre de la tecnología.
   * @param {boolean} estaChequeado - Estado del checkbox.
   */
  const manejarTecnologias = (tecnologia: string, estaChequeado: boolean) => {
    setFormData((prev) => ({
      ...prev,
      tecnologias: estaChequeado
        ? [...prev.tecnologias, tecnologia]
        : prev.tecnologias.filter((tec) => tec !== tecnologia),
    }));
  };

  /**
   * Procesa el envío del formulario para agregar o editar un participante.
   * Valida que los campos obligatorios estén completos antes de llamar al servicio.
   * 
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const botonRegistrarClickeado = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.email ||
      !formData.edad ||
      !formData.modalidad ||
      formData.tecnologias.length === 0 ||
      !formData.aceptaTerminos
    ) {
      alert("Por favor, completa todos los campos y acepta los términos.");
      return;
    }

    const participanteArmado = {
      ...formData,
      edad: Number(formData.edad),
    };

    if (participanteSeleccionado) {
      await editar(participanteSeleccionado.id, participanteArmado);
      seleccionarParaEdicion(null);
    } else {
      await agregar(participanteArmado);
      resetForm();
    }

    onSuccess?.();
  };

  /**
   * Cancela el modo edición y limpia el formulario.
   */
  const cancelarEdicion = () => {
    seleccionarParaEdicion(null);
  };

  const opcionesModalidad = [
    { valor: "presencial", etiqueta: "Presencial" },
    { valor: "virtual", etiqueta: "Virtual" },
    { valor: "hibrido", etiqueta: "Híbrido" },
  ];

  const opcionesTecnologias = [
    { valor: "react", etiqueta: "React" },
    { valor: "angular", etiqueta: "Angular" },
    { valor: "vue", etiqueta: "Vue" },
    { valor: "node", etiqueta: "Node" },
    { valor: "python", etiqueta: "Python" },
    { valor: "java", etiqueta: "Java" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-8 mt-8">
      <form
        onSubmit={botonRegistrarClickeado}
        className="flex flex-col gap-6 border border-gray-200 p-4 shadow-sm rounded"
      >
        <div className="grid grid-cols-2 gap-6 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor={`${baseId}-nombre`} className="text-sm font-medium text-gray-600">Nombre</label>
            <input
              id={`${baseId}-nombre`}
              ref={nombreInputRef}
              name="nombre"
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`${baseId}-email`} className="text-sm font-medium text-gray-600">Email</label>
            <input
              id={`${baseId}-email`}
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`${baseId}-edad`} className="text-sm font-medium text-gray-600">Edad</label>
            <input
              id={`${baseId}-edad`}
              name="edad"
              type="number"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`${baseId}-pais`} className="text-sm font-medium text-gray-600">País</label>
            <select
              id={`${baseId}-pais`}
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
            >
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Mexico">Mexico</option>
              <option value="España">España</option>
            </select>
          </div>
        </div>

        <div>
          <p className="text-lg font-bold text-gray-700">Modalidad</p>
          <div className="flex gap-4 mt-2">
            {opcionesModalidad.map((opcion) => (
              <label
                key={opcion.valor}
                htmlFor={`${baseId}-mod-${opcion.valor}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  id={`${baseId}-mod-${opcion.valor}`}
                  type="radio"
                  name="modalidad"
                  value={opcion.valor}
                  checked={formData.modalidad === opcion.valor}
                  onChange={handleChange}
                />
                {opcion.etiqueta}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg font-bold text-gray-700">Tecnologías</p>
          <div className="grid grid-cols-3 gap-y-4 gap-x-12 mt-2 w-full text-lg font-medium">
            {opcionesTecnologias.map((opcion) => (
              <label
                key={opcion.valor}
                htmlFor={`${baseId}-tec-${opcion.valor}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  id={`${baseId}-tec-${opcion.valor}`}
                  type="checkbox"
                  checked={formData.tecnologias.includes(opcion.valor)}
                  onChange={(e) =>
                    manejarTecnologias(opcion.valor, e.target.checked)
                  }
                />
                {opcion.etiqueta}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${baseId}-nivel`} className="text-sm font-medium text-gray-600">Nivel</label>
          <select
            id={`${baseId}-nivel`}
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded shadow-sm bg-white"
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        <div className="flex gap-4 flex-col mt-4">
          <label htmlFor={`${baseId}-terminos`} className="flex items-center gap-2 cursor-pointer">
            <input
              id={`${baseId}-terminos`}
              name="aceptaTerminos"
              type="checkbox"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
            />
            Acepto términos y condiciones
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-fit px-10 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition-colors text-white font-semibold shadow-sm"
            >
              {participanteSeleccionado ? "Actualizar" : "Registrar"}
            </button>
            {participanteSeleccionado && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="w-fit px-10 py-2 rounded-md bg-gray-500 hover:bg-gray-600 transition-colors text-white font-semibold shadow-sm"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
