import { Routes, Route } from 'react-router-dom';
import MercadoPasesPage from './paginas/mercado-pases';
import PlantillaFinalPage from './paginas/plantilla-final';

// =====================================================================================
// ARCHIVO PRINCIPAL DE ENRUTAMIENTO (App.tsx)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Es el componente raíz que define la estructura general de tu aplicación y las URLs
// (rutas) de tus diferentes páginas.
//
// ¿CÓMO FUNCIONA?:
// - Conecta cada ruta (`Route`) con un componente (`element`) que se mostrará cuando la
//   URL en el navegador coincida con el `path`.
// - El `<BrowserRouter>` ya lo pusimos en el `main.tsx` envolviendo a `<App />`, por lo que
//   aquí adentro ya podemos usar `<Routes>` y `<Route>` sin problemas.
//
// ¿QUÉ TENÍAS MAL O DE MÁS?:
// 1. Sobraba la variable `presupuestoDisponible` y el `useState`. En los exámenes con Contexto,
//    toda la información de estado (presupuesto, listas de jugadores) se maneja en el Provider
//    (`mercado_context.tsx`). App.tsx solo sirve para definir rutas y la maqueta general.
// 2. Te faltaba importar las utilidades de enrutamiento (`Routes` y `Route`).
//
// ¿QUÉ DEBERÍAS REEMPLAZAR O ADAPTAR EN EL EXAMEN?:
// - Los nombres de los componentes de páginas (`MercadoPasesPage`, `PlantillaFinalPage`) y sus
//   rutas de archivos correspondientes.
// - Los `path` de las URL (ej. cambiar `/` por `/listado` si el examen te lo pide).
// =====================================================================================

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800">
      <Routes>
        {/* Ruta principal: Muestra la pantalla de compra de jugadores */}
        <Route path="/" element={<MercadoPasesPage />} />

        {/* Ruta final: Muestra el plantel definitivo agrupado */}
        <Route path="/final" element={<PlantillaFinalPage />} />
      </Routes>
    </div>
  );
}

export default App;
