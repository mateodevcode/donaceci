import { useContext, useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MainfudContext } from "@/context/MainfudContext";
import { reordenar_categorias } from "@/lib/socket/orden_socket";
import { toast } from "sonner";

function SortableItem({ position, name }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: position.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    paddingLeft: "16px",
    border: "1px solid #ccc",
    borderRadius: "30px",
    marginBottom: "8px",
    backgroundColor: "#f9f9f9",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {name}
    </div>
  );
}

export default function OrdenarCategorias() {
  const { categorias: catt, setCategorias: setCatt } =
    useContext(MainfudContext);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Inicializa las categorías desde el contexto
    if (catt && catt.length > 0) {
      const categoriasOrdenadas = [...catt].sort(
        (a, b) => a.position - b.position
      );
      setCategorias(categoriasOrdenadas);
    }
  }, [catt]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    //
    const oldIndex = categorias.findIndex(
      (cat) => cat.position.toString() === active.id
    );
    const newIndex = categorias.findIndex(
      (cat) => cat.position.toString() === over.id
    );
    const nuevoOrden = arrayMove(categorias, oldIndex, newIndex);
    setCategorias(nuevoOrden);
  };

  const handleGuardar = async () => {
    // Reasigna nuevas posiciones ordenadas
    const ordenadas = categorias.map((cat, i) => ({
      ...cat,
      position: i + 1,
    }));

    reordenar_categorias(ordenadas); // Emitir el evento al servidor
    toast.success("Categoria reordenada correctamente", {
      duration: 3000,
      position: "top-right",
      style: {
        backgroundColor: "#34d777",
        color: "#000",
        borderColor: "#000",
      },
    });
    setCatt(ordenadas); // actualizar en el contexto
  };

  return (
    <div className="p-4 w-full md:w-72 shadow-md rounded-lg mt-4 border-[1px] border-zinc-100">
      {/* <h2 className="text-xl font-semibold">Ordenar Categorías</h2> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categorias.map((cat) => cat.position.toString())}
          strategy={verticalListSortingStrategy}
        >
          {categorias.map((cat, index) => (
            <SortableItem
              key={index}
              position={cat.position}
              name={cat.nombre}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button
        onClick={handleGuardar}
        className="mt-4 w-full bg-[#252235] text-white py-2 rounded-full hover:bg-[#252235]/80 transition duration-200 disabled:opacity-50 cursor-pointer select-none"
      >
        Guardar Orden
      </button>
    </div>
  );
}
