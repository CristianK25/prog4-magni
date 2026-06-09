import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEntity } from "./state/EntityContext";
import { Navbar } from "./ui/Navbar";
import { ListadoPage } from "./pages/ListadoPage";
import { FormularioPage } from "./pages/FormularioPage";

export const AppEjemplo: React.FC = () => {
  const { items } = useEntity();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* 1. BARRA DE NAVEGACIÓN GLOBAL */}
      <Navbar
        totalItems={items.length}
        onNavegar={(vista) => {
          if (vista === "listado") navigate("/");
          if (vista === "formulario") navigate("/nuevo");
        }}
      />

      {/* 2. CONTENIDO PRINCIPAL CAMBIANTE SEGÚN LA RUTA */}
      <main className="max-w-7xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<ListadoPage />} />
          <Route path="/nuevo" element={<FormularioPage />} />
          <Route path="/editar/:id" element={<FormularioPage />} />
          {/* Ruta comodín por si escriben mal la URL */}
          <Route
            path="*"
            element={
              <div className="p-8 text-center border border-dashed border-gray-400 bg-white">
                <h1 className="text-xl font-bold">404 - Página no encontrada</h1>
                <button
                  onClick={() => navigate("/")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm"
                >
                  Volver al listado
                </button>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};
