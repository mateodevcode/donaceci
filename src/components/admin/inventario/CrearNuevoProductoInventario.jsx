"use client";

import { AdminContext } from "@/context/AdminContext";
import { MainfudContext } from "@/context/MainfudContext";
import { formatoFecha } from "@/utils/formatoFecha";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { LiaSaveSolid } from "react-icons/lia";
import { toast } from "sonner";

const CrearNuevoProductoInventario = () => {
  const {
    formDatosInventario,
    setFormDatosInventario,
    setInventario,
    nuevoProducto,
    setNuevoProducto,
    editarProducto,
    setEditarProducto,
    productoIventarioSeleccionado,
    productoSeleccionado,
    setProductoSeleccionado,
  } = useContext(AdminContext);
  const { productos } = useContext(MainfudContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatosInventario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (editarProducto && productoIventarioSeleccionado) {
      setFormDatosInventario({
        ...formDatosInventario,
        _id: productoIventarioSeleccionado._id,
        stockActual: productoIventarioSeleccionado.stockActual || 0,
        stockMinimo: productoIventarioSeleccionado.stockMinimo || 0,
        ultimoArqueo:
          productoIventarioSeleccionado.ultimoArqueo ||
          new Date().toISOString(),
        ultimoMovimiento:
          productoIventarioSeleccionado.ultimoMovimiento ||
          new Date().toISOString(),
      });
      setProductoSeleccionado(productoIventarioSeleccionado._id);
    }
  }, [
    productoIventarioSeleccionado,
    editarProducto,
    setFormDatosInventario,
    setProductoSeleccionado,
    formDatosInventario,
  ]);

  const handleCrearProducto = async () => {
    if (!formDatosInventario._id) {
      toast.error("El campo _id es obligatorio");
      return;
    }

    if (
      formDatosInventario.stockActual < 0 ||
      formDatosInventario.stockMinimo < 0
    ) {
      toast.error("Los valores de stock no pueden ser negativos");
      return;
    }

    if (
      formDatosInventario.stockActual === 0 ||
      formDatosInventario.stockMinimo === 0
    ) {
      toast.error("Los valores de stock no pueden ser cero");
      return;
    }

    const response = await fetch("/api/inventario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDatosInventario),
    });

    if (response.ok) {
      toast.success("Producto guardado correctamente");
      setFormDatosInventario({
        _id: "",
        stockActual: 0,
        stockMinimo: 0,
        ultimoArqueo: new Date().toISOString(),
        ultimoMovimiento: new Date().toISOString(),
      });
      setNuevoProducto(false);
      const data = await response.json();
      setInventario((prev) => [...prev, data.inventario]);
      setProductoSeleccionado("");
    } else {
      toast.error("Error al guardar el producto");
    }
  };

  const handleActualizarProducto = async () => {
    if (!productoIventarioSeleccionado._id) {
      toast.error("El campo _id es obligatorio");
      return;
    }
    if (
      formDatosInventario.stockActual < 0 ||
      formDatosInventario.stockMinimo < 0
    ) {
      toast.error("Los valores de stock no pueden ser negativos");
      return;
    }
    if (
      formDatosInventario.stockActual === 0 ||
      formDatosInventario.stockMinimo === 0
    ) {
      toast.error("Los valores de stock no pueden ser cero");
      return;
    }
    const response = await fetch(
      `/api/inventario/${productoIventarioSeleccionado._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formDatosInventario,
          ultimoMovimiento: new Date().toISOString(),
        }),
      }
    );
    if (response.ok) {
      toast.success("Producto actualizado correctamente");
      setFormDatosInventario({
        _id: "",
        stockActual: 0,
        stockMinimo: 0,
        ultimoArqueo: new Date().toISOString(),
        ultimoMovimiento: new Date().toISOString(),
      });
      setNuevoProducto(false);
      const data = await response.json();
      setInventario((prev) =>
        prev.map((inv) => (inv._id === data._id ? data : inv))
      );
      setProductoSeleccionado("");
    } else {
      toast.error("Error al actualizar el producto");
    }
  };

  const ProductoInventario = productos.find(
    (producto) => producto._id === formDatosInventario._id
  );

  return (
    <>
      {nuevoProducto && (
        <tbody>
          <tr
            className={`border-t border-gray-200 transition ${
              editarProducto ? "bg-green-50" : "bg-blue-50"
            }`}
          >
            <td className="px-4 py-3">
              {editarProducto ? (
                <span>{ProductoInventario?.nombre}</span>
              ) : (
                <div className="w-52 relative">
                  <Listbox
                    value={productoSeleccionado}
                    onChange={(pro) => setProductoSeleccionado(pro)}
                  >
                    {({ open }) => (
                      <div>
                        <Listbox.Button className="w-full border border-border rounded-full px-4 py-3 text-left text-sm bg-white text-gray-700 relative">
                          {productoSeleccionado ? (
                            productoSeleccionado
                          ) : (
                            <span className="flex items-center gap-3 text-xs">
                              <AiOutlineProduct className="w-4 h-4 text-gray-500" />{" "}
                              Seleccione un producto
                            </span>
                          )}
                          {/* Flecha a la derecha */}
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          </span>
                        </Listbox.Button>

                        {open && (
                          <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto text-sm">
                            {productos.map((pro, index) => (
                              <Listbox.Option
                                key={index}
                                value={pro._id}
                                onClick={() => {
                                  setFormDatosInventario((prev) => ({
                                    ...prev,
                                    _id: pro._id,
                                  }));
                                }}
                                className={({ active, selected }) =>
                                  `cursor-pointer px-4 py-2 ${
                                    active ? "bg-blue-100" : ""
                                  } ${
                                    selected
                                      ? "font-semibold text-blue-600"
                                      : ""
                                  }`
                                }
                              >
                                {pro.nombre}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        )}
                      </div>
                    )}
                  </Listbox>
                </div>
              )}
            </td>
            <td className="px-4 py-3">None</td>
            <td className="px-4 py-3 text-center">
              <input
                type="number"
                value={formDatosInventario.stockActual}
                className="px-2 py-1 border-l-[1px] border-gray-300 none focus:outline-none focus:border-blue-500 w-20"
                placeholder="Ej: 10"
                name="stockActual"
                onChange={handleChange}
              />
            </td>
            <td className="px-4 py-3 text-center">
              <input
                type="number"
                value={formDatosInventario.stockMinimo}
                className="px-2 py-1 border-l-[1px] border-gray-300 none focus:outline-none focus:border-blue-500 w-20"
                placeholder="Ej: 10"
                name="stockMinimo"
                onChange={handleChange}
              />
            </td>
            <td className="px-4 py-3">None</td>
            <td className="px-4 py-3">
              {formatoFecha(formDatosInventario.ultimoMovimiento)}
            </td>
            <td className="px-4 py-3 flex items-center justify-center gap-2">
              <button
                className="px-2 py-1 text-red-600 hover:text-red-700 active:scale-95 duration-300 cursor-pointer select-none text-xl"
                onClick={() => {
                  setNuevoProducto(false);
                  setEditarProducto(false);
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
                <IoIosCloseCircle />
              </button>
              <button
                className="px-2 py-1 text-blue-600 hover:text-green-700 active:scale-95 duration-300 cursor-pointer select-none text-xl"
                onClick={
                  editarProducto
                    ? handleActualizarProducto
                    : handleCrearProducto
                }
              >
                <LiaSaveSolid />
              </button>
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default CrearNuevoProductoInventario;
