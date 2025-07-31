"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { formatearDescripcion } from "@/utils/formatearDescripcion";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { RiFileList2Line } from "react-icons/ri";

const ModalComentarios = () => {
  const {
    openModalComentarios,
    setOpenModalComentarios,
    setFormDatos,
    formDatos,
  } = useContext(MainfudContext);

  const handleDatosChange = (e) => {
    const { name, value } = e.target;
    setFormDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const guardarComentario = (e) => {
    e.preventDefault();
    setFormDatos((prevDatos) => ({
      ...prevDatos,
      comentarios: formatearDescripcion(formDatos.comentarios), // Asegurarse de que no haya espacios innecesarios
    }));
    setOpenModalComentarios(false);
  };

  return (
    <AnimatePresence>
      {openModalComentarios && (
        <div className="fixed inset-0 z-30 flex items-center bg-black/10 justify-center bg-opacity-90 overflow-auto">
          <motion.div
            className="relative w-full flex flex-col overflow-y-auto mx-auto h-full items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setOpenModalComentarios(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-96 cursor-pointer select-none relative"
            >
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white absolute -top-12 right-0 z-10"
                onClick={() => {
                  setOpenModalComentarios(false);
                }}
              >
                <IoClose className="text-lg text-zinc-800 cursor-pointer" />
              </button>
              <div
                className={`p-4 rounded-2xl shadow-lg bg-white text-zinc-800`}
              >
                <form className="bg-white p-6 text-zinc-800">
                  <h2 className="w-full font-semibold text-2xl text-center mb-6">
                    Ingresa tus comentarios
                  </h2>
                  {/* inputs textp */}
                  <div className="grid gap-6">
                    <div className="grid gap-2 border-[1px] border-border rounded-lg px-4 py-3 relative">
                      <span className="text-xs bg-white absolute left-4 -top-2 px-2">
                        Comentarios
                      </span>
                      <div className="relative flex items-center gap-4">
                        <RiFileList2Line className="h-4 w-4 text-muted-foreground" />
                        <textarea
                          id="comentarios"
                          type="text"
                          placeholder="Ejemplo: Quiero la pizza sin cebolla"
                          value={formDatos.comentarios}
                          onChange={handleDatosChange}
                          required
                          name="comentarios"
                          className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex items-center flex-col gap-2 w-full">
                      <button
                        type="submit"
                        onClick={guardarComentario}
                        className="font-semibold bg-amber-400 rounded-full text-white p-2 hover:bg-amber-400 transition-colors cursor-pointer select-none active:scale-95 duration-150 w-full"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalComentarios;
