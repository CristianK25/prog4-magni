import React from "react";

interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario" | "peligro" | "advertencia";
  cargando?: boolean;
}

export const Boton: React.FC<BotonProps> = ({
  variante = "primario",
  cargando = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  // Estilos base de Tailwind (simplicidad máxima)
  const estiloBase = "px-4 py-2 border text-sm font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  // Variantes de color minimalistas
  const estilosVariantes = {
    primario: "bg-blue-600 border-blue-700 text-white hover:bg-blue-700",
    secundario: "bg-white border-gray-400 text-gray-700 hover:bg-gray-50",
    peligro: "bg-red-600 border-red-700 text-white hover:bg-red-700",
    advertencia: "bg-yellow-500 border-yellow-600 text-gray-900 hover:bg-yellow-600",
  };

  const estiloVariante = estilosVariantes[variante];

  return (
    <button
      disabled={disabled || cargando}
      className={`${estiloBase} ${estiloVariante} ${className}`}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {cargando && (
          // Spinner simple usando SVG nativo
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </span>
    </button>
  );
};

// ==========================================
// EJEMPLOS DE USO DIRECTO
// ==========================================
export const ListaDeBotones: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2 p-4 border border-gray-200 bg-white">
      <Boton variante="primario">Guardar Cambios</Boton>
      <Boton variante="secundario">Cancelar</Boton>
      <Boton variante="peligro">Eliminar Registro</Boton>
      <Boton variante="advertencia">Advertencia</Boton>
      
      {/* Botón en estado de carga */}
      <Boton variante="primario" cargando={true}>
        Procesando...
      </Boton>

      {/* Botón deshabilitado */}
      <Boton variante="primario" disabled={true}>
        Bloqueado
      </Boton>
    </div>
  );
};
