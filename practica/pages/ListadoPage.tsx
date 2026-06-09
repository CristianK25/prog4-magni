import React from "react";
import { useNavigate } from "react-router-dom";
import { useEntity } from "../state/EntityContext";
import { Tabla } from "../ui/Tabla";
import { Panel } from "../ui/TarjetaPanel";

export const ListadoPage: React.FC = () => {
  const { items, eliminar, seleccionar } = useEntity();
  const navigate = useNavigate();

  const handleEditar = (item: any) => {
    // 1. Guardamos el objeto seleccionado en el estado global (Contexto)
    seleccionar(item);
    // 2. Redirigimos a la página de edición pasándole el ID en la URL
    navigate(`/editar/${item.id}`);
  };

  return (
    <Panel titulo="Listado de Registros" subtitulo="Buscar, filtrar y gestionar los elementos">
      <Tabla
        items={items as any}
        onEditar={handleEditar}
        onEliminar={eliminar}
      />
    </Panel>
  );
};
