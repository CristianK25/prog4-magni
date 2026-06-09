import React from "react";

interface NavbarProps {
  totalItems?: number;
  onNavegar?: (vista: string) => void;
  vistaActiva?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalItems = 0,
  onNavegar,
  vistaActiva = "listado",
}) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center mb-6">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg tracking-wider">UTN PARCIAL</span>
        
        {/* Enlaces de Navegación manual (si no usan React Router) */}
        {onNavegar && (
          <div className="flex gap-4 text-sm font-medium">
            <button
              onClick={() => onNavegar("listado")}
              className={`hover:text-gray-300 py-1 ${
                vistaActiva === "listado" ? "border-b border-white" : ""
              }`}
            >
              Listado
            </button>
            <button
              onClick={() => onNavegar("formulario")}
              className={`hover:text-gray-300 py-1 ${
                vistaActiva === "formulario" ? "border-b border-white" : ""
              }`}
            >
              Nuevo Registro
            </button>
          </div>
        )}
      </div>

      {/* Información global del estado */}
      <div className="text-xs bg-gray-700 px-3 py-1 border border-gray-600 rounded">
        Registros: <span className="font-bold text-yellow-400">{totalItems}</span>
      </div>
    </nav>
  );
};
