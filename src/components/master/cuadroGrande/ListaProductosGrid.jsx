"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { MasterContext } from "@/context/MasterContext";
// import { actualizar_producto_disponibilidad } from "@/lib/socket/producto_socket";
import Image from "next/image";
import React, { useContext } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

const ListaProductosGrid = () => {
  const { categoriaSeleccionada } = useContext(MasterContext);
  const { productos, setProductos } = useContext(MainfudContext);

  const listaProductos = productos?.filter(
    (producto) => producto.categoria === categoriaSeleccionada
  );

  const cambiarDisponibilidad = async (producto, disponibilidad) => {
    const updatedProducto = {
      ...producto,
      disponibilidad: disponibilidad,
    };

    try {
      const response = await fetch(`/api/productos/${producto._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProducto),
      });
      if (response.ok) {
        setProductos((prevProductos) =>
          prevProductos.map((prod) =>
            prod._id === producto._id ? { ...prod, disponibilidad } : prod
          )
        );
        toast.success(`Producto actualizado.`);
      }
    } catch (error) {
      toast.error(
        "Error al actualizar la disponibilidad del producto. Por favor, inténtalo de nuevo.",
        {
          description: error.message,
        }
      );
    }
  };

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {listaProductos?.map((producto, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl shadow-lg  text-zinc-800 select-none ${
              producto.disponibilidad
                ? "border-[1px] border-green-500 bg-white"
                : "border-[1px] border-red-500 bg-white/50"
            }`}
          >
            <div
              className={`flex items-center justify-between ${
                producto.disponibilidad ? "" : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="">
                <h3 className="text-sm font-semibold">
                  <span>{producto.nombre}</span>
                </h3>
              </div>
            </div>
            <div
              className={`flex items-center justify-center mt-4 w-full ${
                producto.disponibilidad ? "" : "opacity-50 cursor-not-allowed"
              }`}
            >
              <Image
                src={producto.image}
                alt={producto.nombre}
                width={250}
                height={250}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
            <div
              className={`w-full flex items-center justify-between p-2 rounded-lg mt-2`}
            >
              <div
                className={`flex items-center justify-center text-sm gap-2 ${
                  producto.disponibilidad ? "" : "opacity-50 cursor-not-allowed"
                }`}
              >
                <span className="font-semibold">Estado:</span>
                {producto.disponibilidad ? (
                  <div className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Disponible
                  </div>
                ) : (
                  <div className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    No disponible
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2">
                {producto.disponibilidad ? (
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      cambiarDisponibilidad(producto, false);
                    }}
                  >
                    <IoClose className="text-lg text-zinc-800 cursor-pointer" />
                  </button>
                ) : (
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      cambiarDisponibilidad(producto, true);
                    }}
                  >
                    <FaCheck className="text-lg text-zinc-800 cursor-pointer" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProductosGrid;
