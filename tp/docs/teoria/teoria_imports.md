# Guía Definitiva de Imports y Exports en React + TypeScript

Entender cómo funcionan los imports y exports es fundamental. No es "magia de React", es el estándar de módulos de JavaScript (ES6 Modules) combinado con las reglas de TypeScript.

## 1. Con llaves `{}` vs Sin llaves (Named vs Default Exports)

La regla de oro: **Si lleva llaves o no, depende exclusivamente de CÓMO se exportó**.

### Exportación por Defecto (`export default`)
Se usa cuando un archivo tiene un **único protagonista** (por ejemplo, un componente de React o un modelo único). Solo puede haber un `export default` por archivo.
- **Cómo se exporta:** `export default function App() { ... }`
- **Cómo se importa:** SIN llaves. Al importarlo por defecto, podés llamarlo como quieras (aunque por convención usamos el mismo nombre).
  ```typescript
  // Importamos sin llaves
  import App from './App';
  import AplicacionPrincipal from './App'; // Válido, pero raro. Sigue siendo App.
  ```

### Exportación Nombrada (`export`)
Se usa cuando un archivo exporta **varias cosas independientes** (funciones de utilidad, constantes, múltiples hooks).
- **Cómo se exporta:** `export const sumar = () => {}`, `export const restar = () => {}`
- **Cómo se importa:** CON llaves `{}` y el nombre **tiene que coincidir exactamente** con lo que se exportó.
  ```typescript
  // Importamos con llaves
  import { sumar, restar } from './utils';
  
  // Por eso React se importa así (React exporta cientos de hooks y funciones):
  import { useState, useEffect } from 'react'; 
  ```

---

## 2. El modificador `type` (Específico de TypeScript)

Como vimos con tu error, TypeScript desaparece cuando el código se compila a JavaScript para el navegador. Herramientas ultrarrápidas modernas como **Vite** compilan archivo por archivo sin mirar el contexto global. Necesitan saber urgente qué imports son código real y cuáles son solo "tipos" para borrarlos rápido y no empaquetarlos por error.

- **Importar un tipo por defecto:**
  ```typescript
  import type Nota from './models/Nota';
  ```
- **Importar un tipo nombrado:**
  ```typescript
  import type { UsuarioProps } from './types';
  
  // O mezclar código real con tipos en una sola línea:
  import { useState, type ChangeEvent } from 'react';
  ```
**La regla:** Si lo que estás importando es una `interface` o un `type` de TypeScript, siempre ponele `type` adelante. Si te olvidás, el editor de código (o Vite) te lo va a recordar.

---

## 3. Alias: Cambiar nombres al importar (`as`)

A veces tenés colisiones de nombres. Imaginate que tenés tu propio componente `Button`, pero también querés importar un `Button` de una librería externa (como Material UI). Podés renombrarlos en el momento de importar usando la palabra `as`.

```typescript
import { Button as BotonPropio } from './components/Button';
import { Button as BotonLibreria } from 'libreria-ui';

// Ahora podés usar <BotonPropio /> y <BotonLibreria /> sin que choquen.
```

---

## 4. Importar TODO junto (`* as`)

Si un archivo tiene muchísimas exportaciones nombradas (por ejemplo, un archivo `utils/math.ts` lleno de fórmulas matemáticas), en vez de importarlas una por una con llaves, podés importar "todo el paquete" en un solo objeto.

```typescript
import * as MathUtils from './utils/math';

MathUtils.sumar(2, 2);
MathUtils.restar(5, 1);
```

---

## Resumen (El Machete Mental)

1. ¿El archivo exportó con `export default`? ➔ Lo importo libre, **sin llaves**.
2. ¿El archivo exportó con solo `export`? ➔ Lo importo **con llaves** y el nombre exacto.
3. ¿Es una `interface` o un `type`? ➔ Le pongo la palabra `type` en el import.
4. ¿Chocan dos nombres iguales? ➔ Uso `as` para renombrarlo en este archivo.
