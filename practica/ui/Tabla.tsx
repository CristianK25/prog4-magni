import React from "react";

// =====================================================================================
// OPCIÓN 1: LA TABLA MÁS SIMPLE Y GENÉRICA POSIBLE (Solo lectura)
// =====================================================================================
// ¿PARA QUÉ SIRVE?:
// Es la estructura base de cualquier tabla HTML. Sirve para mostrar cualquier lista de
// datos que tengas en tu estado o contexto.
//
// ¿CÓMO SE COPIA Y SE ADAPTA EN EL EXAMEN?:
// 1. Cambiá el nombre 'TablaGenerica' por el tuyo (ej. 'TablaAlumnos').
// 2. Definí qué datos va a recibir en sus props (ej. 'alumnos: Alumno[]').
// 3. Modificá las cabeceras (<th>) con las columnas que pida el enunciado.
// 4. Modificá el recorrido '.map()' para renderizar los campos correspondientes
//    de tu objeto (ej. 'alumno.nombre', 'alumno.legajo', etc.).
// =====================================================================================

interface TablaGenericaProps {
  // Recibe una lista de cualquier tipo de objetos
  elementos: any[]; 
}

export const TablaGenerica: React.FC<TablaGenericaProps> = ({ elementos }) => {
  return (
    // 'w-full' hace que ocupe todo el ancho disponible
    // 'border-collapse' hace que los bordes de las celdas se unan limpiamente
    // 'border border-gray-300' dibuja el borde exterior gris
    <table className="w-full border-collapse border border-gray-300 text-left text-sm">
      
      {/* 1. ENCABEZADO DE LA TABLA (Títulos de columna) */}
      <thead className="bg-gray-100">
        <tr>
          {/* Cada 'th' es una columna. Ajustá los nombres según tu examen */}
          <th className="border border-gray-300 p-2 font-bold text-gray-700">ID</th>
          <th className="border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
          <th className="border border-gray-300 p-2 font-bold text-gray-700">Detalle</th>
          <th className="border border-gray-300 p-2 font-bold text-gray-700">Valor</th>
        </tr>
      </thead>

      {/* 2. CUERPO DE LA TABLA (Filas de datos) */}
      <tbody>
        {/* Paso clave: Si la lista está vacía, mostramos un renglón indicándolo */}
        {elementos.length === 0 ? (
          <tr>
            {/* 'colSpan' debe ser igual a la cantidad total de columnas que declaraste en el thead */}
            <td colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
              No hay registros disponibles.
            </td>
          </tr>
        ) : (
          // Recorremos el arreglo mapeando cada elemento a una fila de tabla (<tr>)
          elementos.map((item) => (
            // IMPORTANTE: Cada fila del mapa debe tener una propiedad 'key' única (usualmente el id)
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{item.id}</td>
              <td className="border border-gray-300 p-2 font-medium">{item.nombre}</td>
              <td className="border border-gray-300 p-2">{item.detalle || "-"}</td>
              <td className="border border-gray-300 p-2">{item.valor}</td>
            </tr>
          ))
        )}
      </tbody>

    </table>
  );
};


// =====================================================================================
// OPCIÓN 2: TABLA CON ACCIONES CRUD (Editar, Eliminar, Agregar)
// =====================================================================================
// ¿PARA QUÉ SIRVE?:
// Es igual a la anterior, pero incluye una última columna con botones para interactuar
// con el estado global (Contexto) de tu aplicación.
//
// ¿CÓMO SE CONECTAN LOS BOTONES?:
// - Los botones disparan funciones callback recibidas por Props ('onEditar', 'onEliminar').
// - En tu página o componente padre, enganchás estas propiedades con las funciones del contexto.
// =====================================================================================

interface TablaConAccionesProps {
  elementos: any[];
  onEditar: (item: any) => void;
  onEliminar: (id: number) => void;
}

export const TablaConAcciones: React.FC<TablaConAccionesProps> = ({
  elementos,
  onEditar,
  onEliminar,
}) => {
  return (
    <table className="w-full border-collapse border border-gray-300 text-left text-sm bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 p-2 font-bold text-gray-700">ID</th>
          <th className="border border-gray-300 p-2 font-bold text-gray-700">Nombre</th>
          <th className="border border-gray-300 p-2 font-bold text-gray-700">Estado</th>
          {/* Cabecera para los botones de acción */}
          <th className="border border-gray-300 p-2 font-bold text-gray-700 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {elementos.length === 0 ? (
          <tr>
            <td colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
              Sin elementos en la lista.
            </td>
          </tr>
        ) : (
          elementos.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{item.id}</td>
              <td className="border border-gray-300 p-2 font-medium">{item.nombre}</td>
              <td className="border border-gray-300 p-2">
                {/* Ejemplo de condición visual: Badge simple de color */}
                <span className={`px-2 py-0.5 text-xs ${item.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {item.activo ? "Activo" : "Inactivo"}
                </span>
              </td>
              {/* Celda de botones */}
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <button
                  onClick={() => onEditar(item)}
                  className="px-2 py-1 text-xs border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(item.id)}
                  className="px-2 py-1 text-xs border border-red-600 text-red-600 hover:bg-red-50 font-medium"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
