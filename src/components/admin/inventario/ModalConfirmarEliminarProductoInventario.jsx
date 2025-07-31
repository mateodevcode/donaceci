"use client";

import { AdminContext } from "@/context/AdminContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

const ModalConfirmarEliminarProductoInventario = () => {
  const {
    openModalConfirmrEliminarProducto,
    setOpenModalConfirmarEliminarProducto,
    productoIventarioSeleccionado,
    setProductoInventarioSeleccionado,
    setInventario,
  } = useContext(AdminContext);

  useEffect(() => {
    if (openModalConfirmrEliminarProducto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalConfirmrEliminarProducto]);

  const handleEliminarProducto = async (id) => {
    try {
      const response = await fetch(`/api/inventario/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el producto del inventario");
      }
      const data = await response.json();
      setInventario((prevInventario) =>
        prevInventario.filter((producto) => producto._id !== id)
      );
      toast.success(data.message);
    } catch (error) {
      console.error("Error:", error.message);
      // Manejo de errores, como mostrar un mensaje al usuario
    }
  };

  return (
    <AnimatePresence>
      {openModalConfirmrEliminarProducto && (
        <div className="fixed inset-0 z-30 flex items-center bg-black/10 justify-center bg-opacity-90 overflow-auto">
          <motion.div
            className="relative w-full flex flex-col overflow-y-auto mx-auto h-full items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setOpenModalConfirmarEliminarProducto(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-96 cursor-pointer select-none relative"
            >
              <button
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-black/10 absolute top-3 right-3 z-10"
                onClick={() => {
                  setOpenModalConfirmarEliminarProducto(false);
                }}
              >
                <IoClose className="text-lg text-zinc-800 cursor-pointer" />
              </button>
              <div
                className={`p-4 rounded-lg shadow-lg bg-white text-zinc-800`}
              >
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Confirmar Eliminación
                  </h2>
                  <p className="text-sm mb-4">
                    ¿Estás seguro de que deseas eliminar el producto{" "}
                    <span className="font-semibold">
                      {productoAEliminar?.nombre}
                    </span>{" "}
                    del inventario?
                  </p>
                </div>
                <div className="w-full flex items-center justify-start gap-4">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer select-none active:scale-95 duration-300"
                    onClick={() => {
                      handleEliminarProducto(productoAEliminar._id);
                      setOpenModalConfirmarEliminarProducto(false);
                      setProductoInventarioSeleccionado(null);
                    }}
                  >
                    Confirmar
                  </button>
                  <button
                    className="ml-2 text-red-600 hover:text-red-800 cursor-pointer select-none active:scale-95 duration-300"
                    onClick={() => {
                      setOpenModalConfirmarEliminarProducto(false);
                      setProductoInventarioSeleccionado(null);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalConfirmarEliminarProductoInventario;
