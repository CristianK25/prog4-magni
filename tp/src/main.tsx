/**
 * Punto de entrada de la aplicación React.
 * Configura el renderizado en el DOM y envuelve la aplicación en los
 * proveedores de contexto globales (Router, Auth, Participantes).
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ParticipantesProvider } from "./context/ParticipantesContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ParticipantesProvider>
          <App />
        </ParticipantesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
