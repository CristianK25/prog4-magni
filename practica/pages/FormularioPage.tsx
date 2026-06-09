import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEntity } from "../state/EntityContext";
import { Formulario } from "../ui/Formulario";
import { Panel } from "../ui/TarjetaPanel";

export const FormularioPage: React.FC = () => {
  const { items, agregar, editar, seleccionado, seleccionar } = useEntity();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Si hay un ID en la URL, estamos editando.
  // Buscamos el item en el estado global (o usamos el seleccionado del contexto)
  const esEdicion = id !== undefined;
  const itemEdicion = esEdicion 
    ? seleccionado || items.find((i) => i.id === Number(id)) 
    : null;

  const handleGuardar = (datos: any) => {
    if (esEdicion && itemEdicion) {
      // Editar existente
      editar({ ...datos, id: itemEdicion.id });
    } else {
      // Agregar nuevo
      agregar(datos);
    }
    navigate("/"); // Redirigir al listado principal
  };

  const handleCancelar = () => {
    seleccionar(null); // Limpiar selección en el contexto
    navigate("/");
  };

  // Validación de seguridad si intentan editar un ID que no existe
  if (esEdicion && !itemEdicion) {
    return (
      <Panel titulo="Error" subtitulo="Elemento no encontrado">
        <p className="mb-4">El registro con ID {id} no existe.</p>
        <button
          onClick={() => navigate("/")}
          className="border border-gray-400 px-4 py-2 hover:bg-gray-100"
        >
          Volver al Listado
        </button>
      </Panel>
    );
  }

  return (
    <Panel 
      titulo={esEdicion ? "Editar Registro" : "Nuevo Registro"} 
      subtitulo={esEdicion ? `Modificando ID: ${id}` : "Completa los campos obligatorios"}
    >
      <Formulario
        itemEdicion={itemEdicion as any}
        onGuardar={handleGuardar}
        onCancelar={handleCancelar}
      />
    </Panel>
  );
};
