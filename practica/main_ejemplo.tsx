import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { EntityProvider } from "./state/EntityContext";
import { AppEjemplo } from "./App_ejemplo";
import "./index.css"; // Estilos globales (Tailwind CSS)

// =========================================================================
// ASÍ DE SIMPLE DEBERÍA QUEDAR TU main.tsx EN EL EXAMEN:
// El Proveedor de Estado (Context) y el Router envuelven a la aplicación
// =========================================================================

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EntityProvider>
      <BrowserRouter>
        <AppEjemplo />
      </BrowserRouter>
    </EntityProvider>
  </React.StrictMode>
);
