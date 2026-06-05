import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Proveedor } from './context/mercado_context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Proveedor>
      <App />
    </Proveedor>
  </StrictMode>,
)
