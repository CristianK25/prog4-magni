import React from "react";

// =====================================================================================
// 1. COMPONENTE TARJETA (Tarjeta)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Es una caja contenedora mediana (Card) ideal para agrupar información relacionada,
// como por ejemplo los detalles de un producto, un elemento de una lista o bloques pequeños.
//
// ¿CÓMO SE USA EN EL EXAMEN?:
// <Tarjeta titulo="Producto #1" acciones={<button>Editar</button>}>
//   <p>Precio: $150</p>
//   <p>Categoría: Electrónica</p>
// </Tarjeta>
//
// CLASES DE TAILWIND EXPLICADAS:
// - 'border border-gray-300': Agrega un borde gris claro de 1 píxel.
// - 'p-4': Agrega relleno interno (padding) de 1rem (16px) en todos los lados.
// - 'bg-white': Fondo totalmente blanco.
// - 'mb-4': Margen inferior de 1rem para separar esta tarjeta de la siguiente.
// - 'border-b pb-2 mb-3': Crea una línea divisoria debajo del título con separación interna y externa.
// - 'flex justify-between items-center': Coloca el título a la izquierda y los botones (acciones) a la derecha, alineados al centro.
// =====================================================================================
interface TarjetaProps {
  titulo?: string;
  children: React.ReactNode;
  acciones?: React.ReactNode; // Elementos como botones que van a la derecha del título
}

export const Tarjeta: React.FC<TarjetaProps> = ({ titulo, children, acciones }) => {
  return (
    <div className="border border-gray-300 p-4 bg-white mb-4">
      {titulo && (
        <div className="border-b border-gray-200 pb-2 mb-3 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">{titulo}</h3>
          {acciones && <div className="space-x-2">{acciones}</div>}
        </div>
      )}
      <div className="text-sm text-gray-600">{children}</div>
    </div>
  );
};

// =====================================================================================
// 2. CONTENEDOR PRINCIPAL DE PÁGINA (Panel)
// =====================================================================================
// ¿QUÉ ES Y PARA QUÉ SIRVE?:
// Es la caja principal que envuelve cada una de tus páginas (Listado, Formulario, etc.).
// Le da una estructura y márgenes limpios a todo el contenido del examen.
//
// ¿CÓMO SE USA EN EL EXAMEN?:
// <Panel titulo="Crear Inscripción" subtitulo="Ingresa los datos del alumno" acciones={<button>Volver</button>}>
//   <Formulario />
// </Panel>
//
// CLASES DE TAILWIND EXPLICADAS:
// - 'border border-gray-400': Borde gris un poco más oscuro que el de la Tarjeta.
// - 'p-6': Padding interno más amplio de 1.5rem (24px) para dar aire a la página.
// - 'bg-gray-50': Fondo gris muy claro para contrastar con el fondo blanco de la aplicación.
// - 'my-4': Margen vertical (arriba y abajo) de 1rem.
// - 'flex justify-between items-start': Alinea el bloque de títulos a la izquierda y las acciones a la derecha.
// =====================================================================================
interface PanelProps {
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
  acciones?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ titulo, subtitulo, children, acciones }) => {
  return (
    <div className="border border-gray-400 p-6 bg-gray-50 my-4">
      <div className="border-b border-gray-300 pb-4 mb-4 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{titulo}</h1>
          {subtitulo && <p className="text-sm text-gray-500 mt-1">{subtitulo}</p>}
        </div>
        {acciones && <div className="space-x-2">{acciones}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

// =====================================================================================
// 3. EJEMPLOS DE MAQUETADO DE REFERENCIA (Machete para el examen)
// =====================================================================================
// No los usas directamente, pero te sirven de ejemplo rápido para copiar y pegar:
// - GRID (Grilla): Para poner elementos en columnas.
// - FLEXBOX: Para alinear elementos en fila con espacio intermedio.
// =====================================================================================
export const EjemploLayouts: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 
        EJEMPLO GRID RESPONSIVO:
        - 'grid': Activa el sistema de grillas.
        - 'grid-cols-1': Por defecto en móviles tiene 1 sola columna (una cosa abajo de la otra).
        - 'md:grid-cols-3': En pantallas medianas/grandes pasa a tener 3 columnas de igual ancho.
        - 'gap-4': Separación de 1rem entre columnas y filas.
      */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 mb-2">Ejemplo de Grilla (3 columnas en PC, 1 en Celular)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-300 p-4 bg-white">Columna 1</div>
          <div className="border border-gray-300 p-4 bg-white">Columna 2</div>
          <div className="border border-gray-300 p-4 bg-white">Columna 3</div>
        </div>
      </div>

      {/* 
        EJEMPLO FLEXBOX ALINEADO:
        - 'flex': Activa flexbox.
        - 'flex-col sm:flex-row': En móvil se ordena en columna (vertical), en pantallas sm en adelante en fila (horizontal).
        - 'justify-between': Distribuye los elementos empujando uno al extremo izquierdo y otro al derecho.
        - 'items-center': Alinea verticalmente los elementos al centro.
        - 'gap-2': Espacio mínimo entre elementos si se enciman.
      */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 mb-2">Ejemplo de Flexbox (Espaciado Izquierda / Derecha)</h4>
        <div className="flex flex-col sm:flex-row justify-between items-center border border-gray-300 p-4 bg-white gap-2">
          <span>Texto o información a la izquierda</span>
          <div className="flex gap-2">
            <button className="border border-gray-400 px-3 py-1 text-sm">Acción 1</button>
            <button className="border border-gray-400 px-3 py-1 text-sm bg-gray-100">Acción 2</button>
          </div>
        </div>
      </div>
    </div>
  );
};
