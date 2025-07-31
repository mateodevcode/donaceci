"use client";

import { AdminContext } from "@/context/AdminContext";
import { MainfudContext } from "@/context/MainfudContext";
import { formatoDinero } from "@/utils/formatoDinero";
import { formatoFecha } from "@/utils/formatoFecha";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useContext, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
import CrearNuevoProductoInventario from "./CrearNuevoProductoInventario";

export default function TablaInventarios() {
  const {
    inventario,
    setOpenModalConfirmarEliminarProducto,
    setProductoInventarioSeleccionado,
    setNuevoProducto,
    setEditarProducto,
    setFormDatosInventario,
    setProductoSeleccionado,
  } = useContext(AdminContext);
  const { productos, categorias } = useContext(MainfudContext);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [filtrarStockBajo, setFiltrarStockBajo] = useState(false);

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
                    {/* Flecha a la derecha */}
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
              setNuevoProducto(true);
              setEditarProducto(false);
              setProductoInventarioSeleccionado(null);
              setFormDatosInventario({
                _id: "",
                stockActual: 0,
                stockMinimo: 0,
                ultimoArqueo: new Date().toISOString(),
                ultimoMovimiento: new Date().toISOString(),
              });
              setProductoSeleccionado("");
            }}
          >
            <FiPlus className="" />
            <span className="text-sm hidden md:flex">Agregar Producto</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="min-w-full text-sm text-left bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoria</th>
              {/* <th className="px-4 py-3">Unidad</th> */}
              <th className="px-4 py-3 text-center">Cantidad</th>
              <th className="px-4 py-3 text-center">Stock mínimo</th>
              <th className="px-4 py-3">Precio Total</th>
              <th className="px-4 py-3">Ultimo movimiento</th>
              <th className="px-4 py-3 text-center">Opciones</th>
            </tr>
          </thead>
          <CrearNuevoProductoInventario />
          <tbody>
            {inventariosAMostrar.map((product, index) => (
              <tr
                key={index}
                className={`border-t border-gray-200 transition ${
                  product.stockActual < product.stockMinimo
                    ? "bg-red-100 text-red-700"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="px-4 py-3">{product.nombre}</td>
                <td className="px-4 py-3">{product.categoria}</td>
                {/* <td className="px-4 py-3">{product.unit}</td> */}
                <td className="px-4 py-3 text-center font-semibold text-blue-700">
                  {product.stockActual}
                </td>
                <td className="px-4 py-3 text-center bg-red-50">
                  {product.stockMinimo}
                </td>
                <td className="px-4 py-3">
                  {formatoDinero(product.precioTotal)}
                </td>
                <td className="px-4 py-3">
                  {formatoFecha(product.ultimoMovimiento)}
                </td>
                <td className="px-4 py-3 flex items-center justify-end gap-2">
                  <button
                    className="px-2 py-1 text-blue-600 hover:text-blue-700 active:scale-95 duration-300 cursor-pointer select-none text-xl"
                    onClick={() => {
                      setEditarProducto(true);
                      setNuevoProducto(true);
                      setProductoInventarioSeleccionado(product);
                    }}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="px-2 py-1 text-xl text-blue-600 hover:text-red-700 active:scale-95 duration-300 cursor-pointer select-none"
                    onClick={() => {
                      setOpenModalConfirmarEliminarProducto(true);
                      setProductoInventarioSeleccionado(product);
                      setNuevoProducto(false);
                    }}
                  >
                    <RiDeleteBin2Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
