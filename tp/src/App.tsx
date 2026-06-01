import { Routes, Route, Navigate } from "react-router-dom";
import ListaPage from "./pages/ListaPage";
import FormularioPage from "./pages/FormularioPage";
import EditarPage from "./pages/EditarPage";
import LoginPage from "./pages/LoginPage";
import PublicaPage from "./pages/PublicaPage";
import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoute";
import CursosPage from "./pages/CursosPage";
import ComprasPage from "./pages/ComprasPage";
import PaymentSuccess from "./pages/pagos/PaymentSucces";
import PaymentFailure from "./pages/pagos/PaymentFailure";
import PaymentPending from "./pages/pagos/PaymentPending";

/**
 * Componente raíz de la aplicación.
 * 
 * Define la estructura base de la interfaz y la configuración de las rutas
 * protegidas y públicas, utilizando React Router para la navegación.
 * 
 * @returns {JSX.Element} El árbol de componentes con la configuración de rutas.
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/publica" element={<PublicaPage />} />
        
        {/* Rutas de retorno de MercadoPago */}
        <Route path="/pagos/success" element={<PaymentSuccess />} />
        <Route path="/pagos/failure" element={<PaymentFailure />} />
        <Route path="/pagos/pending" element={<PaymentPending />} />

        {/* El "/" lo mandamos al login o a la lista según la lógica de la rúbrica */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas Privadas (Cualquier rol logueado) */}
        <Route 
          path="/lista" 
          element={
            <PrivateRoute>
              <ListaPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/cursos" 
          element={
            <PrivateRoute>
              <CursosPage />
            </PrivateRoute>
          } 
        />

        {/* Rutas Privadas (Solo ADMIN) */}
        <Route 
          path="/nuevo" 
          element={
            <PrivateRoute rol="ADMIN">
              <FormularioPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/editar/:id" 
          element={
            <PrivateRoute rol="ADMIN">
              <EditarPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/compras" 
          element={
            <PrivateRoute rol="ADMIN">
              <ComprasPage />
            </PrivateRoute>
          } 
        />
        
        {/* Fallback para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
