import { useState, useEffect } from "react";
import { pagosService } from "../services/pagosService";

/**
 * Interfaz que define la estructura de un Curso.
 */
export interface Curso {
  id: number;
  title: string;
  price: number;
  description: string;
}

/**
 * Constante estática con los 6 cursos basados en las tecnologías del formulario.
 */
const CURSOS_DISPONIBLES: Curso[] = [
  { id: 1, title: "Curso React", price: 2500, description: "Aprendé a crear interfaces interactivas y SPA con la librería más popular de JavaScript." },
  { id: 2, title: "Curso Angular", price: 2800, description: "Dominá el framework de Google para aplicaciones web escalables y robustas." },
  { id: 3, title: "Curso Vue", price: 2200, description: "Descubrí la simplicidad y potencia de Vue.js para el desarrollo frontend." },
  { id: 4, title: "Curso Node", price: 3000, description: "Construí servidores rápidos y escalables utilizando JavaScript en el backend." },
  { id: 5, title: "Curso Python", price: 3500, description: "Introducción al lenguaje multipropósito ideal para backend, data y scripting." },
  { id: 6, title: "Curso Java", price: 4000, description: "Aprendé programación orientada a objetos a nivel empresarial con Java." },
];

/**
 * Página privada que muestra un catálogo de cursos disponibles.
 * Permite iniciar un flujo de compra integrándose con Mercado Pago.
 * 
 * @returns {JSX.Element} Vista del catálogo de cursos.
 */
export default function CursosPage() {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [comprados, setComprados] = useState<string[]>([]);

  useEffect(() => {
    pagosService.misCompras()
      .then(compras => {
        setComprados(compras.map(c => c.curso_nombre));
      })
      .catch(err => console.error("Error al cargar compras previas:", err));
  }, []);

  /**
   * Maneja el clic en "QUIERO ESTE CURSO".
   * Crea la preferencia de pago en el backend y redirige a Checkout Pro.
   */
  const handleBuy = async (curso: Curso) => {
    try {
      setLoadingId(curso.id);
      const response = await pagosService.crearPreferencia(curso);

      // Redirige al init_point devuelto por Mercado Pago
      if (response && response.init_point) {
        window.location.href = response.init_point;
      } else {
        alert(response?.message || "Ocurrió un error al intentar crear el pago.");
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert("No se pudo conectar con Mercado Pago.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-2 min-h-screen bg-gray-50 pb-20">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-left mb-6 bg-blue-600 px-5 py-2 text-white">
          Cursos Disponibles
        </h1>
        <div className="px-10 max-w-6xl mx-auto w-full">
          <p className="text-gray-600 mb-8 text-lg">
            Elegí el curso que mejor se adapte a tus necesidades y pagá de forma segura con Mercado Pago.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CURSOS_DISPONIBLES.map((curso) => (
              <div
                key={curso.id}
                className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{curso.title}</h2>
                  <p className="text-gray-600 mb-4 h-20 overflow-hidden">
                    {curso.description}
                  </p>
                  <p className="text-3xl font-bold text-green-600 mb-6">
                    ${curso.price.toLocaleString("es-AR")}
                  </p>
                </div>

                {comprados.includes(curso.title) ? (
                  <button
                    disabled
                    className="w-full py-3 px-4 bg-green-100 text-green-800 font-bold rounded-md shadow cursor-not-allowed"
                  >
                    YA TENÉS ESTE CURSO
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(curso)}
                    disabled={loadingId === curso.id}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-md shadow transition-colors"
                  >
                    {loadingId === curso.id ? "Conectando..." : "QUIERO ESTE CURSO"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
