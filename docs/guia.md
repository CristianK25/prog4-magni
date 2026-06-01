# Plan de Estudio y Práctica Guiada (React + TypeScript)

Este documento es tu **hoja de ruta**. Como te estás preparando para rendir a mano, **vos vas a tipear todos los comandos y el código**. Yo voy a funcionar como tu Arquitecto/Mentor: te voy a dar los requerimientos de cada ejercicio, vos lo implementás en tu carpeta `practica`, y yo te corrijo conceptos, arquitectura y buenas prácticas.

Para no enredarnos con la complejidad de "Participantes", vamos a usar un dominio mucho más simple: **Un Gestor de Notas** (`Nota`: `id`, `texto`, `importante`). Es código corto pero te obliga a usar todos los conceptos.

## 0. Setup Inicial (Tu tarea)

1. En la consola, inicializá el proyecto: `npm create vite@latest practica -- --template react-ts`
2. Entrá a la carpeta e instalá todo: `cd practica` y `npm install`
3. Instalá TailwindCSS (fijate en tus comandos.txt si no te acordás).
4. Creá **manualmente** las carpetas vacías (`components`, `models`, `context`, etc.) para ir visualizando la arquitectura final.
5. Limpiá `App.tsx` para que solo renderice un `<div className="p-4 text-2xl">Gestor de Notas</div>`.

## Etapa 1: Estado Local y Props (Basado en TP2)
**Objetivo**: Entender cómo los datos bajan (Props) y los eventos suben (Callbacks).
- **Ejercicio 1.1**: Creá la interfaz `Nota` (`id: number`, `texto: string`, `importante: boolean`).
- **Ejercicio 1.2**: En `App.tsx`, creá un estado `notas` usando `useState<Nota[]>([])`.
- **Ejercicio 1.3**: Creá un componente `<FormularioNota />` que reciba por props una función `onAgregar(texto: string, importante: boolean)`. Tipeá el `onChange` de los inputs y el `onSubmit` del form.
- **Ejercicio 1.4**: Creá un componente `<ListaNotas notas={notas} />` que reciba las notas y haga un `.map()`.

## Etapa 2: Efectos y Persistencia (Basado en TP3)
**Objetivo**: El ciclo de vida. ¿Cuándo leo y cuándo guardo en el disco?
- **Ejercicio 2.1**: Agregá un `useEffect` en `App.tsx` que, cuando el componente se monte (array de dependencias vacío `[]`), lea las notas de `localStorage` y las setee en el estado.
- **Ejercicio 2.2**: Agregá otro `useEffect` que "escuche" la variable `notas`. Cada vez que cambie, la guarde en `localStorage`.

## Etapa 3: Context API (Basado en TP4)
**Objetivo**: Eliminar el paso de props (*prop drilling*).
- **Ejercicio 3.1**: Creá `NotasContext` y `NotasProvider`.
- **Ejercicio 3.2**: Llevate el estado `notas` y la función `agregarNota` de `App.tsx` hacia adentro del `NotasProvider`.
- **Ejercicio 3.3**: Modificá `<FormularioNota />` y `<ListaNotas />` para que consuman los datos directamente usando `useContext(NotasContext)` en lugar de recibirlos por Props.

## Etapa 4: useReducer (Basado en TP5)
**Objetivo**: Escalar la lógica del estado cuando hay muchas acciones (agregar, borrar, editar).
- **Ejercicio 4.1**: Reemplazá el `useState` dentro de tu Provider por un `useReducer`.
- **Ejercicio 4.2**: Definí el tipo `Action` con acciones claras: `{ type: 'AGREGAR', payload: Nota }`, `{ type: 'ELIMINAR', payload: number }`.
- **Ejercicio 4.3**: Implementá un botón de "Eliminar" en la UI que dispare el `dispatch` correspondiente.

> [!IMPORTANT]
> **Dinámica de trabajo**
> 
> No intentes hacer todo junto. Empezaremos por el **Setup Inicial** y el **Ejercicio 1.1**. Vos escribís, si te trabás me preguntás, y cuando lo tengas funcionando pasamos al siguiente.
