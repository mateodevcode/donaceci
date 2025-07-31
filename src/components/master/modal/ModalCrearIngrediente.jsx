"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { MasterContext } from "@/context/MasterContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { TbFileTextSpark } from "react-icons/tb";
import { toast } from "sonner";
import { GoNumber } from "react-icons/go";

const ModalCrearIngrediente = () => {
  const {
    openModalIngrediente,
    setOpenModalIngrediente,
    ingrediente,
    setIngrediente,
    formDatosIngrediente,
    setFormDatosIngrediente,
    producto,
    setProducto,
    setProductoSeleccionado,
  } = useContext(MasterContext);
  const { productos, setProductos, categorias, ingredientes, setIngredientes } =
    useContext(MainfudContext);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ingredienteInicial, setIngredienteInicial] = useState(null);

  useEffect(() => {
    if (ingrediente) {
      setFormDatosIngrediente({
        nombre: ingrediente.nombre,
        cantidad: ingrediente.cantidad,
        imagen: ingrediente.imagen,
        publicId: ingrediente.publicId,
        opcion: "editar", // Cambia a 'editar' si estás editando un producto
      });
      setIngredienteInicial(ingrediente);
      setFile(null); // Resetea el archivo para evitar problemas con la previsualización
      setPreview(ingrediente.imagen); // Usa la imagen actual de la categoría para la previsualización
    } else {
      setFormDatosIngrediente({
        nombre: "",
        cantidad: "",
        imagen: "",
        publicId: "",
        opcion: "crear", // Cambia a 'crear' si estás creando un nuevo producto
      });
      setFile(null);
      setPreview(null);
    }
  }, [ingrediente, setFormDatosIngrediente]);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDatosChange = (e) => {
    const { name, value } = e.target;
    setFormDatosIngrediente((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (openModalIngrediente) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalIngrediente]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!ingrediente) {
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
      if (!formDatosIngrediente.nombre.trim()) {
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
    formData.append("nombre", formDatosIngrediente.nombre);
    formData.append("cantidad", formDatosIngrediente.cantidad);
    formData.append("opcion", formDatosIngrediente.opcion); // 'crear' o 'editar'
    formData.append("producto", producto._id); // el ID del producto al que pertenece el ingrediente
    if (formDatosIngrediente.opcion === "editar") {
      formData.append("ingredienteId", ingrediente._id); // el ID de la categoría que vas a editar
    }

    try {
      const res = await fetch("/api/upload/ingrediente", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error al subir:", data);
        throw new Error(data.details || data.error || "Error desconocido");
      }

      const nuevoIngrediente = data.ingrediente;
      // setIngrediente(data.ingrediente);
      setProducto((prev) => ({
        ...prev,
        ingredientes: [...prev.ingredientes, nuevoIngrediente._id],
      }));
      setProductoSeleccionado((prev) => ({
        ...prev,
        ingredientes: [...prev.ingredientes, nuevoIngrediente._id],
      }));
      setIngredientes((prevIngrediente) => {
        const index = prevIngrediente.findIndex(
          (cat) => cat._id === nuevoIngrediente._id
        );

        if (index !== -1) {
          // Ya existe → reemplazar
          const actualizadas = [...prevIngrediente];
          actualizadas[index] = nuevoIngrediente;
          return actualizadas;
        } else {
          // No existe → agregar
          return [...prevIngrediente, nuevoIngrediente];
        }
      });
      setProductos((prevProducto) => {
        const productoIndex = prevProducto.findIndex(
          (prod) => prod._id === producto._id
        );
        if (productoIndex !== -1) {
          // Actualizar el producto existente
          const updatedProductos = [...prevProducto];
          updatedProductos[productoIndex] = {
            ...updatedProductos[productoIndex],
            ingredientes: [
              ...updatedProductos[productoIndex].ingredientes,
              nuevoIngrediente._id,
            ],
          };
          return updatedProductos;
        } else {
          // Si el producto no existe, simplemente retornar los productos sin cambios
          return prevProducto;
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
      setOpenModalIngrediente(false);
      setFormDatosIngrediente({
        nombre: "",
        cantidad: "",
        imagen: "",
        publicId: "",
        opcion: "crear", // Resetea a 'crear' para futuros productos
      });
      setFile(null);
      setPreview(null);
    } catch (err) {
      toast.error(
        `Error al subir el ingrediente*+*++
        : ${err.message}`,
        {
          position: "top-center",
          style: {
            background: "#FEE2E2", // Light red background
            color: "#B91C1C", // Dark red text
            borderColor: "#B91C1C", // Dark red border
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!ingrediente) {
      toast.error("No hay ingrediente para eliminar.", {
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
      const res = await fetch(`/api/ingredientes/${ingrediente._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredienteId: ingrediente._id,
          productoId: producto._id, // el ID del producto al que pertenece el ingrediente
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
      setIngredientes((prevIngredientes) =>
        prevIngredientes.filter((ing) => ing._id !== ingrediente._id)
      );
      setProductos((prevProductos) => {
        const productoIndex = prevProductos.findIndex(
          (prod) => prod._id === producto._id
        );
        if (productoIndex !== -1) {
          // Actualizar el producto existente
          const updatedProductos = [...prevProductos];
          updatedProductos[productoIndex] = {
            ...updatedProductos[productoIndex],
            ingredientes: updatedProductos[productoIndex].ingredientes.filter(
              (ingId) => ingId !== ingrediente._id
            ),
          };
          return updatedProductos;
        } else {
          // Si el producto no existe, simplemente retornar los productos sin cambios
          return prevProductos;
        }
      });
      setOpenModalIngrediente(false);
      setFormDatosIngrediente({
        nombre: "",
        cantidad: "",
        imagen: "",
        publicId: "",
        opcion: "crear", // Resetea a 'crear' para futuros productos
      });
      setFile(null);
      setPreview(null);
      setIngrediente(null); // Resetea el ingrediente seleccionado
    } catch (err) {
      toast.error(`Error al eliminar el ingrediente: ${err.message}`, {
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
      {openModalIngrediente && (
        <div className="fixed inset-0 z-30 flex items-center bg-black/10 justify-center bg-opacity-90 overflow-auto">
          <motion.div
            className="relative w-full flex flex-col overflow-y-auto mx-auto h-full items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setOpenModalIngrediente(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-96 cursor-pointer select-none relative"
            >
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white absolute -top-12 right-0 z-10"
                onClick={() => {
                  setOpenModalIngrediente(false);
                }}
              >
                <IoClose className="text-lg text-zinc-800 cursor-pointer" />
              </button>
              <div
                className={`p-4 rounded-2xl shadow-lg bg-white text-zinc-800`}
              >
                <form className="bg-white p-6 text-zinc-800">
                  <h2 className="w-full font-semibold text-2xl text-center">
                    {producto?.nombre}
                  </h2>
                  <h3 className="-full text-xl text-center mb-6">
                    {ingrediente ? "Editar Ingrediente" : "Agregar Ingrediente"}
                  </h3>
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
                          capture="environment"
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
                        <TbFileTextSpark className="h-4 w-4 text-muted-foreground" />
                        <input
                          id="nombre"
                          type="text"
                          placeholder="Ejemplo: Ajo"
                          value={formDatosIngrediente.nombre}
                          onChange={handleDatosChange}
                          required
                          name="nombre"
                          className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                        />
                      </div>
                    </div>
                    {/* Cantidad */}
                    <div className="grid gap-2 border-[1px] border-border rounded-full px-4 py-3 relative">
                      <span className="text-xs bg-white absolute left-4 -top-2 px-2">
                        Cantidad
                      </span>
                      <div className="relative flex items-center gap-4">
                        <GoNumber className="h-4 w-4 text-muted-foreground" />
                        <input
                          id="cantidad"
                          type="text"
                          placeholder="Ejemplo: 150 gr"
                          value={formDatosIngrediente.cantidad}
                          onChange={handleDatosChange}
                          required
                          name="cantidad"
                          className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center flex-col gap-2 w-full">
                      {ingrediente && (
                        <button
                          type="submit"
                          onClick={handleUpload}
                          className="font-semibold bg-rose-500 rounded-full text-white p-2 hover:bg-rose-400 transition-colors cursor-pointer select-none active:scale-95 duration-150 w-full"
                        >
                          Editar
                        </button>
                      )}
                      {!ingrediente && (
                        <button
                          type="submit"
                          onClick={handleUpload}
                          // disabled={loading || !file}
                          className="font-semibold bg-rose-500 rounded-full text-white p-2 hover:bg-rose-400 transition-colors cursor-pointer select-none active:scale-95 duration-150 w-full"
                        >
                          {loading ? "Subiendo..." : "Crear"}
                        </button>
                      )}
                      {ingrediente && (
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

export default ModalCrearIngrediente;
