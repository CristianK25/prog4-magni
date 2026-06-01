import { useEffect, useState } from "react";
import { pagosService, type Compra } from "../services/pagosService";

const STATUS_CONFIG = {
  success: { label: "Aprobado", className: "bg-green-100 text-green-800" },
  failure: { label: "Rechazado", className: "bg-red-100 text-red-800" },
  pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800" },
};

/**
 * Página de administración que muestra todas las compras de cursos realizadas.
 * Solo accesible para usuarios con rol ADMIN.
 */
export default function ComprasPage() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    pagosService
      .listarCompras()
      .then(setCompras)
      .catch(() => setError("No se pudieron cargar las compras."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-4 min-h-screen bg-gray-50 pb-20">
      <h1 className="text-3xl font-bold text-left bg-blue-600 px-5 py-2 text-white">
        Compras de Cursos
      </h1>

      <div className="px-6 max-w-5xl mx-auto w-full">
        {loading && (
          <p className="text-gray-500 text-center mt-10">Cargando compras...</p>
        )}

        {error && (
          <p className="text-red-600 text-center mt-10 font-semibold">{error}</p>
        )}

        {!loading && !error && compras.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            Todavía no hay compras registradas.
          </p>
        )}

        {!loading && !error && compras.length > 0 && (
          <div className="overflow-x-auto mt-4 rounded-lg shadow">
            <table className="w-full bg-white text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">User ID</th>
                  <th className="px-4 py-3 text-left">Curso</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                  <th className="px-4 py-3 text-left">Payment ID</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((c, i) => {
                  const cfg = STATUS_CONFIG[c.status] ?? STATUS_CONFIG.pending;
                  return (
                    <tr
                      key={c.id}
                      className={`border-b ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                    >
                      <td className="px-4 py-3 font-mono text-gray-500">{c.id}</td>
                      <td className="px-4 py-3 font-mono text-blue-600 font-bold">
                        {c.usuario_id ?? "-"}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{c.curso_nombre}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${cfg.className}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-700 break-all">
                        {c.payment_id}
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {new Date(c.created_at).toLocaleString("es-AR")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
