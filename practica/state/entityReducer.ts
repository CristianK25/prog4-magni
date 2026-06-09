// =====================================================================================
// 1. INTERFAZ DEL MODELO DE DATOS (Entity)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Define la estructura exacta del objeto con el que vas a trabajar. Obliga a que
// cada registro tenga los mismos campos y tipos de datos, previniendo errores de tipeo.
//
// ¿CÓMO FUNCIONA?:
// Declara los atributos del objeto y su tipo (string, number, boolean).
//
// ¿QUÉ TENGO QUE REEMPLAZAR O SACAR EN EL EXAMEN?:
// - Renombrar 'Entity' por tu entidad del examen (ej. 'Producto', 'Inscripcion').
// - Modificar/Eliminar/Agregar campos según el enunciado. ¡Cuidado!: El campo 'id: number'
//   es obligatorio que lo mantengas para que funcione la lógica de editar/eliminar.
// =====================================================================================
export interface Entity {
  id: number;          // ID único numérico (se autogenera al agregar)
  nombre: string;      // Campo de ejemplo
  categoria: string;   // Campo de ejemplo
  precio: number;      // Campo de ejemplo
  activo: boolean;     // Campo de ejemplo
}

// =====================================================================================
// 2. ESTADO DEL REDUCER (EntityState)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Define la forma (shape) que tendrá el estado global administrado por el reducer.
//
// ¿CÓMO FUNCIONA?:
// Agrupa la lista completa de registros ('items') y el registro seleccionado para ser
// editado ('seleccionado').
//
// ¿QUÉ TENGO QUE REEMPLAZAR O SACAR EN EL EXAMEN?:
// - Cambiar 'Entity' por el nombre de tu interfaz de modelo del paso 1.
// - Si tu examen no requiere formulario de edición (solo crear y listar), podés eliminar
//   'seleccionado' tanto de aquí como de todo el reducer.
// =====================================================================================
export type EntityState = {
  items: Entity[];
  seleccionado: Entity | null;
};

// =====================================================================================
// 3. ACCIONES DEL REDUCER (EntityAction)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Define una lista estricta de todas las operaciones que tu reducer sabe resolver.
// Si intentás despachar otra cosa no declarada aquí, TypeScript te dará un error.
//
// ¿CÓMO FUNCIONA?:
// Cada acción se define con un tipo ('type') en mayúsculas y un cargamento de datos ('payload'):
// - 'GET_ALL': Carga la lista inicial desde LocalStorage.
// - 'AGREGAR': Recibe los datos nuevos SIN el ID (por eso usa Omit<Entity, "id">).
// - 'EDITAR': Recibe el elemento completo modificado (incluyendo su ID).
// - 'ELIMINAR': Recibe el ID numérico del elemento a borrar.
// - 'SELECCIONAR': Recibe el objeto a editar o null para limpiar la selección.
//
// ¿QUÉ TENGO QUE REEMPLAZAR O SACAR EN EL EXAMEN?:
// - Reemplazar 'Entity' por el nombre de tu modelo.
// - Si no necesitás editar, podés borrar 'EDITAR' y 'SELECCIONAR'.
// =====================================================================================
export type EntityAction =
  | { type: "GET_ALL"; payload: Entity[] }
  | { type: "AGREGAR"; payload: Omit<Entity, "id"> }
  | { type: "EDITAR"; payload: Entity }
  | { type: "ELIMINAR"; payload: number }
  | { type: "SELECCIONAR"; payload: Entity | null };

// =====================================================================================
// 4. FUNCIÓN REDUCER (entityReducer)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Es una función "pura" (no modifica directamente las variables, sino que devuelve un nuevo
// objeto de estado con los cambios aplicados). Recibe el estado actual y la acción a realizar.
//
// ¿CÓMO FUNCIONA?:
// Evalúa con un 'switch(action.type)' qué acción se solicitó y realiza la modificación lógica:
// - AGREGAR: Genera un ID autoincremental sumando 1 al ID más alto que exista en la lista.
//   Si la lista está vacía, arranca en 1. Luego guarda la lista actualizada en LocalStorage.
// - EDITAR: Usa un '.map()' para recorrer la lista y reemplazar el objeto que coincide en ID.
// - ELIMINAR: Usa un '.filter()' para remover el elemento que coincide en ID.
//
// ¿QUÉ TENGO QUE REEMPLAZAR O SACAR EN EL EXAMEN?:
// - Renombrar 'entityReducer' por el tuyo (ej. 'vehiculoReducer').
// - Cambiar los tipos de datos 'EntityState', 'EntityAction' y 'Entity' por los tuyos.
// - CAMBIAR "entities" en 'localStorage.setItem("entities", ...)' por el mismo nombre
//   de clave único que hayas configurado en tu Contexto.
// =====================================================================================
export const entityReducer = (state: EntityState, action: EntityAction): EntityState => {
  switch (action.type) {
    case "GET_ALL":
      // Carga en memoria la lista que se recuperó del LocalStorage en el Contexto.
      return {
        ...state,
        items: action.payload,
      };

    case "AGREGAR": {
      // 1. CÁLCULO DE ID AUTOINCREMENTAL:
      // Si hay elementos en la lista, busca el ID máximo de todos y le suma 1. Si no hay elementos, arranca en 1.
      const nuevoId = state.items.length > 0 ? Math.max(...state.items.map((i) => i.id)) + 1 : 1;
      
      // 2. Creación del nuevo objeto inyectándole el ID calculado
      const nuevoItem: Entity = {
        ...action.payload,
        id: nuevoId,
      };
      
      // 3. Creamos una copia de la lista existente y le añadimos el nuevo elemento
      const itemsActualizados = [...state.items, nuevoItem];
      
      // 4. Guardamos la lista serializada en LocalStorage (CAMBIAR "entities" si cambiás tu clave local)
      localStorage.setItem("entities", JSON.stringify(itemsActualizados));
      
      return {
        ...state,
        items: itemsActualizados,
      };
    }

    case "EDITAR": {
      // Recorre la lista de items. Si coincide el ID, reemplaza todo el objeto por el payload actualizado.
      const itemsActualizados = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      
      // Guardamos la lista modificada en LocalStorage (CAMBIAR "entities" si cambiás tu clave local)
      localStorage.setItem("entities", JSON.stringify(itemsActualizados));
      
      return {
        ...state,
        items: itemsActualizados,
        seleccionado: null, // Limpia el elemento de edición para volver a modo creación
      };
    }

    case "ELIMINAR": {
      // Filtra la lista para excluir el item que tenga el ID recibido en el payload.
      const itemsActualizados = state.items.filter((item) => item.id !== action.payload);
      
      // Guardamos la lista en LocalStorage tras eliminar (CAMBIAR "entities" si cambiás tu clave local)
      localStorage.setItem("entities", JSON.stringify(itemsActualizados));
      
      return {
        ...state,
        items: itemsActualizados,
        // Limpieza de seguridad: si el elemento eliminado estaba seleccionado para editar, limpiamos la selección
        seleccionado: state.seleccionado?.id === action.payload ? null : state.seleccionado,
      };
    }

    case "SELECCIONAR":
      // Guarda en 'seleccionado' el objeto que queremos cargar en el formulario (o null para limpiar)
      return {
        ...state,
        seleccionado: action.payload,
      };

    default:
      return state;
  }
};
