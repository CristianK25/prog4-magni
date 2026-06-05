export default function MercadoPasesPage() {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-64 mt-4 max-w-4xl mx-auto w-full px-8">
        <div>
            <p>Jugadores Disponibles</p>
            <table>
                <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Equipo Actual</th>
                  <th className="px-4 py-3 text-left">Posicion</th>
                  <th className="px-4 py-3 text-left">Valor de Mercado</th>
                  <th className="px-4 py-3 text-left">Accion</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                </tr>
              </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>

        
        <div>
            <p>Jugadores Comprados</p>
            <table>
                <th>Nombre</th>
                <th>Equipo Actual</th>
                <th>Posicion</th>
                <th>Valor de Mercado</th>
                <th>Accion</th>
            </table>
        </div>
        </div>
    )
}