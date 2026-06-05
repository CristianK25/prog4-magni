export default function PlantillaFinalPage() {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-64 mt-4 max-w-4xl mx-auto w-full px-8">
        <div>
            <p>Cantidad de jugadores contratados:</p>
            <p>Costo total invertido:</p>
            <p>Presupuesto restante:</p>
        </div>
        <div>
            <p>Arqueros</p>
            <table>
                <thead></thead>
            </table>

            <p>Defensores</p>
            <table>
                <thead></thead>
            </table>

            <p>MEDIOCAMPISTAS</p>
            <table>
                <thead></thead>
            </table>

            <p>DELANTEROS</p>
            <table>
                <thead></thead>
            </table>
        </div>
        </div>
    )
}