"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { MasterContext } from "@/context/MasterContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { HiOutlineCamera } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

const ModalCrearCategoria = () => {
  const {
    openModalCrearCategoria,
    setOpenModalCrearCategoria,
    categoria,
    setCategoria,
    formDatosCategoria,
    setFormDatosCategoria,
    setIngrediente,
  } = useContext(MasterContext);
  const { categorias, setCategorias, setIngredientes, setProductos } =
    useContext(MainfudContext);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoriaInicial, setCategoriaInicial] = useState(null);

  useEffect(() => {
    if (categoria) {
      setFormDatosCategoria({
        nombre: categoria.nombre,
        imagen: categoria.imagen,
        opcion: "editar", // Cambia a 'editar' si estás editando una categoría
        categoriaInicial: categoria, // Guarda el usuario inicial si es necesario
      });
      setCategoriaInicial(categoria);
      setFile(null); // Resetea el archivo para evitar problemas con la previsualización
      setPreview(categoria.imagen); // Usa la imagen actual de la categoría para la previsualización
    } else {
      setFormDatosCategoria({
        nombre: "",
        imagen: "",
        opcion: "crear",
        categoriaInicial: null,
      });
      setFile(null);
      setPreview(null);
    }
  }, [categoria, setFormDatosCategoria]);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDatosChange = (e) => {
    const { name, value } = e.target;
    setFormDatosCategoria((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (openModalCrearCategoria) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalCrearCategoria]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!categoria) {
      if (!file) {
        toast.error("Por favor, selecciona una imagen.", {
          position: "top-center",
          style: {
            background: "#DBEAFE",
            color: "#1B42A8",
            borderColor: "#1B42A8",
          },
        });
        return;
      }
      if (!formDatosCategoria.nombre.trim()) {
        toast.error("Por favor, ingresa una categoria.", {
          position: "top-center",
          style: {
            background: "#DBEAFE",
            color: "#1B42A8",
            borderColor: "#1B42A8",
          },
        });
        return;
      }
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("nombre", formDatosCategoria.nombre);
    formData.append("nombreFormateado", formDatosCategoria.nombre);
    formData.append("opcion", formDatosCategoria.opcion); // 'crear' o 'editar'
    if (formDatosCategoria.opcion === "editar") {
      formData.append("categoriaId", categoria._id); // el ID de la categoría que vas a editar
    }

    try {
      const res = await fetch("/api/upload/categoria", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error al subir:", data);
        throw new Error(data.details || data.error || "Error desconocido");
      }
      const nuevaCategoria = data.categoria;
      setCategoria(data.categoria);
      setCategorias((prevCategorias) => {
        const index = prevCategorias.findIndex(
          (cat) => cat._id === nuevaCategoria._id
        );

        if (index !== -1) {
          // Ya existe → reemplazar
          const actualizadas = [...prevCategorias];
          actualizadas[index] = nuevaCategoria;
          return actualizadas;
        } else {
          // No existe → agregar
          return [...prevCategorias, nuevaCategoria];
        }
      });
      toast.success(data.message, {
        duration: 3000,
        position: "top-right",
        style: {
          backgroundColor: "#34d777", // Green color for success
          color: "#000",
          borderColor: "#000", // Darker green border
        },
      });
      setOpenModalCrearCategoria(false);
      setFormDatosCategoria({ nombre: "", imagen: "" });
      setFile(null);
      setPreview(null);
    } catch (err) {
      toast.error(`Error al subir la categoría: ${err.message}`, {
        position: "top-center",
        style: {
          background: "#FEE2E2", // Light red background
          color: "#B91C1C", // Dark red text
          borderColor: "#B91C1C", // Dark red border
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!categoria) {
      toast.error("No hay una categoria seleccionada", {
        position: "top-center",
        style: {
          background: "#DBEAFE",
          color: "#1B42A8",
          borderColor: "#1B42A8",
        },
      });
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`/api/categorias/${categoria._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoriaId: categoria._id, // el ID del producto al que pertenece el ingrediente
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Error al eliminar:", data);
        throw new Error(data.details || data.error || "Error desconocido");
      }
      toast.success(data.message, {
        duration: 3000,
        position: "top-right",
        style: {
          backgroundColor: "#34d777", // Green color for success
          color: "#000",
          borderColor: "#000", // Darker green border
        },
      });
      setIngredientes(data.ingredientes);
      setProductos(data.productos);
      setCategorias(data.categorias);
      setCategoria(null); // Resetea la categoría actual
      setOpenModalCrearCategoria(false);
      setFormDatosCategoria({ nombre: "", imagen: "", opcion: "crear" });
      setFile(null);
      setPreview(null);
      setIngrediente(null); // Resetea el ingrediente seleccionado
    } catch (err) {
      toast.error(`Error al eliminar el producto: ${err.message}`, {
        position: "top-center",
        style: {
          background: "#FEE2E2", // Light red background
          color: "#B91C1C", // Dark red text
          borderColor: "#B91C1C", // Dark red border
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {openModalCrearCategoria && (
        <div className="fixed inset-0 z-30 flex items-center bg-black/10 justify-center bg-opacity-90 overflow-auto">
          <motion.div
            className="relative w-full flex flex-col overflow-y-auto mx-auto h-full items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setOpenModalCrearCategoria(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-96 cursor-pointer select-none relative"
            >
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white absolute -top-12 right-0 z-10"
                onClick={() => {
                  setOpenModalCrearCategoria(false);
                }}
              >
                <IoClose className="text-lg text-zinc-800 cursor-pointer" />
              </button>
              <div
                className={`p-4 rounded-2xl shadow-lg bg-white text-zinc-800`}
              >
                <form className="bg-white p-6 text-zinc-800">
                  <h2 className="w-full font-semibold text-2xl text-center mb-6">
                    {categoria ? "Editar Categoría" : "Agregar Categoría"}
                  </h2>
                  <div className="flex flex-col items-center gap-4 mb-10">
                    <div className="w-32 h-32 bg-white rounded-lg border-dashed border-[1px] border-zinc-800 flex items-center justify-center shadow-md relative p-0.5">
                      <Image
                        src={preview || "/master/categorias/categorias.png"}
                        alt="Avatar"
                        width={500}
                        height={500}
                        className="w-full h-full rounded-lg object-cover"
                      />
                      <div className="absolute bottom-0 right-0 bg-rose-500 text-white p-2 rounded-full hover:bg-rose-400 transition-colors cursor-pointer select-none active:scale-95 duration-150 overflow-hidden">
                        {/* Icono visible */}
                        <HiOutlineCamera className="pointer-events-none cursor-pointer" />

                        {/* Input oculto pero funcional */}
                        <input
                          id="cameraInput"
                          type="file"
                          accept="image/*"
                          capture="environment" // Opcional: para abrir directamente la cámara en móviles
                          className="absolute inset-0 opacity-0 cursor-pointer peer"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* inputs textp */}
                  <div className="grid gap-6">
                    <div className="grid gap-2 border-[1px] border-border rounded-full px-4 py-3 relative">
                      <span className="text-xs bg-white absolute left-4 -top-2 px-2">
                        Nombre
                      </span>
                      <div className="relative flex items-center gap-4">
                        <AiOutlineProduct className="h-4 w-4 text-muted-foreground" />
                        <input
                          id="nombre"
                          type="text"
                          placeholder="Ejemplo: Empanadas"
                          value={formDatosCategoria.nombre}
                          onChange={handleDatosChange}
                          required
                          name="nombre"
                          className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex items-center flex-col gap-2 w-full">
                      {categoria && (
                        <button
                          type="submit"
                          onClick={handleUpload}
                          className="font-semibold bg-rose-500 rounded-full text-white p-2 hover:bg-rose-400 transition-colors cursor-pointer select-none active:scale-95 duration-150 w-full"
                        >
                          Editar
                        </button>
                      )}
                      {!categoria && (
                        <button
                          type="submit"
                          onClick={handleUpload}
                          // disabled={loading || !file}
                          className="font-semibold bg-rose-500 rounded-full text-white p-2 hover:bg-rose-400 transition-colors cursor-pointer select-none active:scale-95 duration-150 w-full"
                        >
                          {loading ? "Subiendo..." : "Crear"}
                        </button>
                      )}
                      {categoria && (
                        <button
                          type="submit"
                          onClick={handleDelete}
                          className="font-semibold bg-rose-500 rounded-full text-white p-2 hover:bg-rose-400 transition-colors cursor-pointer select-none active:scale-95 duration-150 w-full"
                        >
                          Eliminar
                        </button>
                      )}
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

export default ModalCrearCategoria;
