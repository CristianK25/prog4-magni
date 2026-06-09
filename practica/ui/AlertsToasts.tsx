import React from "react";

// ==========================================
// BANNERS DE ALERTA INDEPENDIENTES
// ==========================================
interface AlertaProps {
  mensaje: string;
  onCerrar?: () => void;
}

export const AlertaExito: React.FC<AlertaProps> = ({ mensaje, onCerrar }) => {
  return (
    <div className="bg-green-50 border border-green-300 text-green-800 p-3 my-2 text-sm flex justify-between items-center">
      <span>{mensaje}</span>
      {onCerrar && (
        <button onClick={onCerrar} className="font-bold hover:text-green-950 px-1">
          ✕
        </button>
      )}
    </div>
  );
};

export const AlertaError: React.FC<AlertaProps> = ({ mensaje, onCerrar }) => {
  return (
    <div className="bg-red-50 border border-red-300 text-red-800 p-3 my-2 text-sm flex justify-between items-center">
      <span>{mensaje}</span>
      {onCerrar && (
        <button onClick={onCerrar} className="font-bold hover:text-red-950 px-1">
          ✕
        </button>
      )}
    </div>
  );
};

export const AlertaInfo: React.FC<AlertaProps> = ({ mensaje, onCerrar }) => {
  return (
    <div className="bg-blue-50 border border-blue-300 text-blue-800 p-3 my-2 text-sm flex justify-between items-center">
      <span>{mensaje}</span>
      {onCerrar && (
        <button onClick={onCerrar} className="font-bold hover:text-blue-950 px-1">
          ✕
        </button>
      )}
    </div>
  );
};

// ==========================================
// MODAL DE CONFIRMACIÓN (PARA ELIMINAR, ETC.)
// ==========================================
interface ModalConfirmacionProps {
  abierto: boolean;
  titulo: string;
  mensaje: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({
  abierto,
  titulo,
  mensaje,
  onConfirmar,
  onCancelar,
}) => {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-gray-400 p-6 max-w-sm w-full shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-2">{titulo}</h3>
        <p className="text-sm text-gray-600 mb-6">{mensaje}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancelar}
            className="px-4 py-2 border border-gray-400 text-sm font-medium hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium border border-red-700 hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
