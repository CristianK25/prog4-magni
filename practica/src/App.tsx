import { useState } from "react"
import type Nota from "./models/Nota"

function App() {
  const [notas, setNotas] = useState<Nota[]>([]);
  return (
    <div className="p-4 text-2xl">Gestor de Notas
    </div>
  )
}

export default App
