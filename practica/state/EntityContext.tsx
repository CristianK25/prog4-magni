import React, { createContext, useContext, useReducer, useEffect } from "react";
// Importamos el reducer, la interfaz del modelo y las acciones desde entityReducer.ts
import { entityReducer, Entity, EntityState, EntityAction } from "./entityReducer";

// =====================================================================================
// 1. INTERFAZ DEL CONTEXTO (EntityContextType)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Define la "firma" o contrato de todo lo que el Contexto va a exponer de forma pública
// a tus componentes (páginas, botones, tablas). Todo lo que esté aquí declarado es lo que
// vas a poder extraer usando "const { items, agregar, ... } = useEntity()".
//
// ¿CÓMO FUNCIONA?:
// Declara las variables de estado (como la lista 'items') y los métodos/funciones que
// permiten alterar ese estado (como 'agregar' o 'eliminar').
//
// ¿QUÉ TENGO QUE REEMPLAZAR O SACAR EN EL EXAMEN?:
// - Cambiar 'Entity' por tu entidad del examen (ej. 'Inscripcion', 'Vehiculo', 'Producto').
// - Si tu entidad no necesita edición, podés borrar 'seleccionado' y 'seleccionar'.
// - Si necesitás funciones extra (ej. 'filtrar', 'vaciarLista'), tenés que declararlas acá
//   con su tipo correspondiente (ej. 'vaciarLista: () => void').
// =====================================================================================
interface EntityContextType {
  items: Entity[];                       // La lista de elementos actualizados en memoria
  seleccionado: Entity | null;           // El elemento que se cargará en el formulario al editar (null si es creación)
  agregar: (item: Omit<Entity, "id">) => void; // Función para añadir (recibe el objeto SIN el ID, el ID se autogenera)
  editar: (item: Entity) => void;        // Función para actualizar un elemento existente (debe incluir su ID)
  eliminar: (id: number) => void;        // Función para borrar un elemento mediante su ID
  seleccionar: (item: Entity | null) => void; // Guarda un elemento en 'seleccionado' para que el formulario lo lea
}

// =====================================================================================
// 2. CREACIÓN DEL CONTEXTO (EntityContext)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Es la "caja" vacía de React donde se almacenarán los datos definidos en la interfaz anterior.
// Sirve como canal de comunicación. No tiene lógica en sí mismo, solo el molde.
//
// ¿CÓMO FUNCIONA?:
// Se usa 'createContext' pasándole un valor inicial. Ponemos '{} as EntityContextType'
// para engañar a TypeScript y evitar tener que inicializar todas las funciones vacías acá.
//
// ¿QUÉ TENGO QUE REEMPLAZAR O SACAR EN EL EXAMEN?:
// - Renombrar 'EntityContext' por el nombre de tu contexto (ej. 'VehiculoContext').
// - Renombrar el tipo genérico 'EntityContextType' por el tuyo (ej. 'VehiculoContextType').
// =====================================================================================
export const EntityContext = createContext<EntityContextType>({} as EntityContextType);

// Estado inicial del Reducer al arrancar la aplicación
const estadoInicial: EntityState = {
  items: [],
  seleccionado: null,
};

// =====================================================================================
// 3. COMPONENTE PROVEEDOR (EntityProvider)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Es el componente "cerebro". Aquí vive el estado real ('state') gestionado por el Reducer,
// se ejecutan los 'effects' de persistencia y se definen las funciones reales que
// llaman a los dispatch del Reducer.
//
// ¿CÓMO FUNCIONA?:
// - 'useReducer' conecta tu archivo reducer con este componente para manejar el estado.
// - 'useEffect' corre una única vez al montar el componente (gracias al array vacío '[]')
//   y recupera del LocalStorage la lista que guardamos antes. Si existe, la carga al estado.
// - Las funciones ('agregar', 'editar', etc.) disparan eventos ('dispatch') al Reducer
//   con la acción ('type') y la información nueva ('payload').
//
// ¿QUÉ TENGO QUE REEMPLAZAR O SACAR EN EL EXAMEN?:
// - Renombrar 'EntityProvider' por tu proveedor (ej. 'VehiculoProvider').
// - Cambiar 'entities' en 'localStorage.getItem("entities")' por una clave única para tu
//   examen (ej. 'mis_vehiculos_local'). ¡Ojo! Debe coincidir con la clave que uses en el Reducer.
// - Si tu modelo tiene nombres distintos, asegurate de actualizar los tipos de datos.
// =====================================================================================
export const EntityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(entityReducer, estadoInicial);

  // Cargar datos iniciales desde LocalStorage al iniciar la App
  useEffect(() => {
    // CAMBIAR "entities" por el string de clave local que prefieras para tu examen
    const datosGuardados = localStorage.getItem("entities");
    if (datosGuardados) {
      try {
        const itemsParseados: Entity[] = JSON.parse(datosGuardados);
        // Despachamos la acción para cargar todo en el estado en memoria
        dispatch({ type: "GET_ALL", payload: itemsParseados });
      } catch (error) {
        console.error("Error al parsear LocalStorage", error);
      }
    }
  }, []);

  // Función Agregar: Despacha la acción de insertar un elemento
  const agregar = (nuevoItem: Omit<Entity, "id">) => {
    dispatch({ type: "AGREGAR", payload: nuevoItem });
  };

  // Función Editar: Despacha la acción de actualizar un elemento existente
  const editar = (itemActualizado: Entity) => {
    dispatch({ type: "EDITAR", payload: itemActualizado });
  };

  // Función Eliminar: Despacha la acción de borrar por ID
  const eliminar = (id: number) => {
    dispatch({ type: "ELIMINAR", payload: id });
  };

  // Función Seleccionar: Guarda/Limpia el item que está siendo editado
  const seleccionar = (item: Entity | null) => {
    dispatch({ type: "SELECCIONAR", payload: item });
  };

  return (
    // Proveemos los datos de estado y funciones a todos los componentes hijos
    <EntityContext.Provider
      value={{
        items: state.items,
        seleccionado: state.seleccionado,
        agregar,
        editar,
        eliminar,
        seleccionar,
      }}
    >
      {children}
    </EntityContext.Provider>
  );
};

// =====================================================================================
// 4. HOOK PERSONALIZADO (useEntity)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Es un "atajo" extremadamente cómodo para consumir tu contexto sin tener que escribir
// 'useContext(EntityContext)' en cada componente de UI.
//
// ¿CÓMO FUNCIONA?:
// Invoca a 'useContext' pasándole tu contexto. Hace un chequeo de seguridad: si el
// contexto es indefinido, significa que te olvidaste de envolver la aplicación con
// el '<EntityProvider>' en el 'main.tsx'.
//
// ¿QUÉ TENGO QUE REEMPLAZAR O SACAR EN EL EXAMEN?:
// - Renombrar 'useEntity' por tu hook personalizado (ej. 'useVehiculos').
// - Renombrar 'EntityContext' por el nombre de tu contexto creado en el paso 2.
// =====================================================================================
export const useEntity = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error("useEntity debe ser utilizado dentro de un EntityProvider");
  }
  return context;
};
