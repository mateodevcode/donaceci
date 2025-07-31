"use client";

import { AdminContext } from "@/context/AdminContext";
import { MainfudContext } from "@/context/MainfudContext";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { formatoNombre } from "@/utils/formatoNombre";
import { FaBarcode } from "react-icons/fa6";
import { toast } from "sonner";

export default function ArqueoDiario() {
  const { inventario } = useContext(AdminContext);
  const { productos, categorias, usuario } = useContext(MainfudContext);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [filtrarStockBajo, setFiltrarStockBajo] = useState(false);
  const [formDatosArqueoInventario, setFormDatosArqueoInventario] = useState({
    fecha: new Date().toISOString(),
    usuario: "",
    detalles: [],
  });

  const categoriasConMostrarTodo = [
    { nombre: "Mostrar todo", nombreFormateado: "" },
    ...categorias,
  ];

  const toggleFiltroStockBajo = () => {
    setFiltrarStockBajo((prev) => !prev);
  };

  const inventarioConDatos = inventario.map((inv) => {
    const producto = productos.find((p) => p._id === inv._id);
    return {
      ...inv,
      nombre: producto?.nombre || "Producto desconocido",
      categoria: producto?.categoria || "Sin categoría",
      precio: producto?.precio || 0,
      precioTotal: inv.stockActual * (producto?.precio || 0),
    };
  });

  const invFiltradoCategoria = categoriaSeleccionada
    ? inventarioConDatos.filter(
        (inv) => inv.categoria === categoriaSeleccionada
      )
    : inventarioConDatos;

  const inventariosAMostrar = filtrarStockBajo
    ? invFiltradoCategoria.filter((inv) => inv.stockActual < inv.stockMinimo)
    : invFiltradoCategoria;

  const handleDetalleChange = (index, field, value) => {
    const nuevosDetalles = [...formDatosArqueoInventario.detalles];
    nuevosDetalles[index][field] =
      field === "stockFisico" ? Number(value) : value;

    // Recalcular diferencia
    nuevosDetalles[index].diferencia =
      nuevosDetalles[index].stockFisico - nuevosDetalles[index].stockSistema;

    setFormDatosArqueoInventario((prev) => ({
      ...prev,
      detalles: nuevosDetalles,
    }));
  };

  useEffect(() => {
    if (inventario.length > 0 && productos.length > 0) {
      const detallesIniciales = inventarioConDatos.map((inv) => ({
        productoId: inv._id,
        nombre: inv.nombre,
        stockSistema: inv.stockActual,
        stockFisico: inv.stockActual,
        diferencia: 0,
        observacion: "",
      }));

      setFormDatosArqueoInventario((prev) => ({
        ...prev,
        usuario: usuario?._id,
        detalles: detallesIniciales,
      }));
    }
  }, [inventario, productos, inventarioConDatos, usuario?._id]);

  const handleGuardarArqueo = async () => {
    try {
      const response = await fetch("/api/arqueo-inventario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDatosArqueoInventario),
      });

      if (response.ok) {
        toast.success("Arqueo guardado exitosamente.");
        setFormDatosArqueoInventario({
          fecha: new Date().toISOString(),
          usuario: usuario?._id,
          detalles: [],
        });
      } else {
        toast.error("Error al guardar el arqueo.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-0 md:p-6">
      <div className="h-14 w-full flex flex-row items-center justify-between gap-2">
        <div className="flex-1 flex items-center gap-2">
          <button
            className="flex items-center justify-center w-11 h-11 bg-gray-100 rounded-full hover:bg-gray-200 transition cursor-pointer select-none active:scale-95 duration-300 border-[1px] border-gray-300"
            onClick={() => {
              setCategoriaSeleccionada("");
              setFiltrarStockBajo(false);
            }}
          >
            <LuFilterX />
          </button>
          <div className="relative md:w-60 w-40">
            <Listbox
              value={categoriaSeleccionada}
              onChange={(cat) => setCategoriaSeleccionada(cat)}
            >
              {({ open }) => (
                <div>
                  <Listbox.Button className="w-full border border-border rounded-full px-4 py-3 text-left text-sm bg-white text-gray-700 relative">
                    {categoriaSeleccionada ? (
                      categoriaSeleccionada
                    ) : (
                      <span className="flex items-center gap-3">
                        <AiOutlineProduct className="w-4 h-4 text-gray-500" />{" "}
                        <span className="hidden md:flex">
                          Seleccione una categoría
                        </span>
                        <span className="flex md:hidden">Categorías</span>
                      </span>
                    )}

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </span>
                  </Listbox.Button>

                  {open && (
                    <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto text-sm">
                      {categoriasConMostrarTodo.map((cat, index) => (
                        <Listbox.Option
                          key={index}
                          value={cat.nombreFormateado}
                          className={({ active, selected }) =>
                            `cursor-pointer px-4 py-2 ${
                              active ? "bg-blue-100" : ""
                            } ${selected ? "font-semibold text-blue-600" : ""}`
                          }
                        >
                          {cat.nombre}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  )}
                </div>
              )}
            </Listbox>
          </div>
          <button
            className={`px-5 py-2 border-[1px] rounded-full transition text-sm cursor-pointer select-none active:scale-95 duration-300 txt-sm ${
              filtrarStockBajo
                ? "bg-blue-100 text-blue-600 border-blue-600 hover:bg-blue-200"
                : "bg-red-100 text-red-600 border-red-600 hover:bg-red-200"
            }`}
            onClick={toggleFiltroStockBajo}
          >
            {filtrarStockBajo ? (
              <div className="flex items-center gap-2">
                <LuFilterX />
                <span className="hidden md:flex">Mostrar Todo</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LuFilter />
                <span className="hidden md:flex">Filtrar Stock Bajo</span>
              </div>
            )}
          </button>
        </div>
        <div>
          <button
            className="px-5 py-2 border-[1px] border-blue-700 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition cursor-pointer select-none active:scale-95 duration-300 flex items-center gap-2"
            onClick={() => {
              handleGuardarArqueo();
              setFormDatosArqueoInventario({
                fecha: new Date().toISOString(),
                usuario: usuario?._id,
                detalles: [],
              });
            }}
          >
            <FaBarcode className="" />
            <span className="text-sm hidden md:flex">Cierre arqueo</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="w-[600px] md:w-full text-sm text-left bg-white border border-gray-200 overflow-x-auto">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Stock Sistema</th>
              <th className="px-4 py-3 text-center">Stock Fisico</th>
              <th className="px-4 py-3 text-center">Observaciones</th>
              <th className="px-4 py-3">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {inventariosAMostrar.map((product, index) => {
              const detalle =
                formDatosArqueoInventario.detalles.find(
                  (d) => d.productoId === product._id
                ) || {};

              return (
                <tr
                  key={product._id}
                  className={`border-t border-gray-200 transition ${
                    product.stockActual < product.stockMinimo
                      ? "bg-red-100 text-red-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3">
                    {formatoNombre(product.nombre, 35)}
                  </td>
                  <td className="px-4 py-3">{product.stockActual}</td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      value={detalle.stockFisico ?? ""}
                      className="px-2 py-1 border-l-[1px] border-gray-300 focus:outline-none focus:border-blue-500 w-20 font-semibold text-blue-700"
                      placeholder="Ej: 10"
                      onChange={(e) =>
                        handleDetalleChange(
                          index,
                          "stockFisico",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="text"
                      value={detalle.observacion ?? ""}
                      className="px-2 py-1 border-l-[1px] border-gray-300 focus:outline-none focus:border-blue-500 w-32"
                      placeholder="Sin observaciones"
                      onChange={(e) =>
                        handleDetalleChange(
                          index,
                          "observacion",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    {detalle.diferencia ?? 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
