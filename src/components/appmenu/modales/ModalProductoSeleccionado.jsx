"use client";

import { MainfudContext } from "@/context/MainfudContext";
import useCarritoCompras from "@/hooks/useCarritoCompras";
import useSonido from "@/hooks/useSonido";
import { bloquearAppMenu } from "@/utils/bloquearAppMenu";
import { formatoDinero } from "@/utils/formatoDinero";
import { formatoNombre } from "@/utils/formatoNombre";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { TiMinus } from "react-icons/ti";
import { toast } from "sonner";

const ModalProductoSeleccionado = () => {
  const {
    openModalProductoSeleccionado,
    setOpenModalProductoSeleccionado,
    productoSeleccionadoMenu,
    setProductoSeleccionadoMenu,
    formDatos,
    usuario,
    setOpenModalTipoPedido,
    setOpenModalDireccionTelefono,
    setOpenModalQRMesaNombre,
    setOpenModalIniciarSesion,
    productos,
    ingredientes,
    setOpenModalBloquearAppMenu,
  } = useContext(MainfudContext);
  const { sonidoAgregarAlCarrito, sonidoRemoverDelCarrito } = useSonido();
  const { agregarProducto } = useCarritoCompras();

  const [contador, setContador] = useState(1);

  useEffect(() => {
    if (openModalProductoSeleccionado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalProductoSeleccionado]);

  const aumentar = () => {
    setContador((prev) => prev + 1);
  };

  const disminuir = () => {
    setContador((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const agregarProductoConCantidad = (producto) => {
    if (contador <= 0) return;

    agregarProducto(producto, contador); // 👈 Le pasas la cantidad directamente
    setContador(1); // Reiniciar contador
  };

  const handleClickAñadirItem = (item) => {
    if (formDatos.para_llevar === null) {
      setOpenModalTipoPedido(true);
      setOpenModalProductoSeleccionado(false);
      return;
    }

    if (
      formDatos.para_llevar === false &&
      (formDatos.mesa === null || formDatos.name === "")
    ) {
      setOpenModalQRMesaNombre(true);
      setOpenModalProductoSeleccionado(false);
      return;
    }

    if (
      formDatos.para_llevar === true &&
      (formDatos.direccion === "" || formDatos.telefono === "")
    ) {
      setOpenModalDireccionTelefono(true);
      setOpenModalProductoSeleccionado(false);
      return;
    }

    if (formDatos.para_llevar && !usuario) {
      // Verificar si esta para llevar y ya inicio sesion
      setOpenModalIniciarSesion(true);
      setOpenModalProductoSeleccionado(false);
      setTimeout(() => {
        toast.error("Debes iniciar sesión para continuar con tu pedido", {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#DBEAFE",
            color: "#1B42A8",
            borderColor: "#1B42A8",
          },
        });
      }, 500);
      return false;
    }

    // funcion para agregar al carrito
    sonidoAgregarAlCarrito();
    toast.success("se ha agregado al carrito", {
      duration: 700,
      position: "bottom-center",
      style: {
        backgroundColor: "#34d777",
        color: "#000",
        borderColor: "#000",
      },
    });
    agregarProducto(item);
  };

  const handleClickAñadirItemConProductos = (item) => {
    if (formDatos.para_llevar === null) {
      setOpenModalTipoPedido(true);
      setOpenModalProductoSeleccionado(false);
      return;
    }

    if (
      formDatos.para_llevar === false &&
      (formDatos.mesa === null || formDatos.name === "")
    ) {
      setOpenModalQRMesaNombre(true);
      setOpenModalProductoSeleccionado(false);
      return;
    }

    if (
      formDatos.para_llevar === true &&
      (formDatos.direccion === "" || formDatos.telefono === "")
    ) {
      setOpenModalDireccionTelefono(true);
      setOpenModalProductoSeleccionado(false);
      return;
    }

    if (formDatos.para_llevar && !usuario) {
      // Verificar si esta para llevar y ya inicio sesion
      setOpenModalIniciarSesion(true);
      setOpenModalProductoSeleccionado(false);
      setTimeout(() => {
        toast.error("Debes iniciar sesión para continuar con tu pedido", {
          duration: 2000,
          position: "top-center",
          style: {
            background: "#DBEAFE",
            color: "#1B42A8",
            borderColor: "#1B42A8",
          },
        });
      }, 500);
      return false;
    }

    // funcion para agregar al carrito
    sonidoAgregarAlCarrito();
    toast.success("se ha agregado al carrito", {
      duration: 700,
      position: "bottom-center",
      style: {
        backgroundColor: "#34d777",
        color: "#000",
        borderColor: "#000",
      },
    });
    agregarProductoConCantidad(item);
  };

  const sugerencias = productos?.filter(
    (item) =>
      item.categoria === productoSeleccionadoMenu?.categoria &&
      item._id !== productoSeleccionadoMenu?._id
  );

  return (
    <AnimatePresence>
      {openModalProductoSeleccionado && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-opacity-90 overflow-auto text-zinc-800"
          onClick={() => setOpenModalProductoSeleccionado(false)}
        >
          {/* max-h-dvh  */}
          <motion.div
            className="relative w-full h-full flex flex-col bg-amber-50 rounded-t-2xl shadow-lg overflow-y-auto mx-auto"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-4`}>
              <button
                onClick={() => setOpenModalProductoSeleccionado(false)}
                className="text-zinc-800 hover:text-zinc-600 cursor-pointer select-none"
              >
                <MdOutlineKeyboardArrowLeft className="text-2xl" />
              </button>
              <h3 className="text-xl font-semibold text-zinc-800">Detalles</h3>
              <div className="w-6"></div> {/* Espaciador para alinear */}
            </div>

            {/* Imagen */}
            <div className="w-full flex justify-center mt-4">
              <div className="flex justify-center w-64 h-64 rounded-full shadow-lg bg-zinc-50 dark:bg-zinc-100 p-8">
                <Image
                  src={productoSeleccionadoMenu.image}
                  alt={productoSeleccionadoMenu.nombre}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Contenido Scroll Horizontal */}
            <div className="px-6 pb-24 bg-amber-50 mt-6">
              {" "}
              {/* Espacio para no tapar footer */}
              <div className="flex flex-row items-center justify-between mt-4">
                <h2 className="text-2xl font-semibold">
                  {productoSeleccionadoMenu.nombre}
                </h2>
                {/* <div className="flex items-center gap-2 pl-2">
                  <span
                    className={`w-6 h-6 p-1 rounded-full flex items-center justify-center select-none active:scale-95 duration-75 ${
                      contador <= 1
                        ? "bg-zinc-200 cursor-not-allowed"
                        : "bg-amber-400 cursor-pointer"
                    }`}
                    onClick={() => {
                      if (contador > 1) {
                        sonidoRemoverDelCarrito();
                        disminuir();
                      }
                    }}
                  >
                    <TiMinus className="text-xl text-white" />
                  </span>
                  <span className="font-semibold font-roboto">{contador}</span>
                  <span
                    className="w-6 h-6 bg-amber-400 p-1 rounded-full flex items-center justify-center cursor-pointer select-none active:scale-95 duration-75"
                    onClick={() => {
                      sonidoRemoverDelCarrito();
                      aumentar();
                    }}
                  >
                    <FiPlus className="text-xl text-white" />
                  </span>
                </div> */}
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                {productoSeleccionadoMenu.descripcion ||
                  "Descripción no disponible."}
              </p>
              {/* Ingredientes */}
              {productoSeleccionadoMenu.ingredientes.length !== 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Ingredientes</h3>
                  <div className="flex overflow-x-auto space-x-4 mt-2 pb-2 h-28">
                    {productoSeleccionadoMenu.ingredientes.map(
                      (ingrediente, index) => {
                        const ingre = ingredientes.find(
                          (ing) => ing._id === ingrediente
                        );

                        return (
                          <div
                            key={index}
                            className="flex-shrink-0 flex flex-col items-center justify-center bg-amber-300 py-2 rounded-md shadow-md w-24 h-24"
                          >
                            <Image
                              src={ingre.imagen}
                              alt={ingre.nombre}
                              width={250}
                              height={250}
                              className="w-14 h-14 rounded-full"
                            />
                            <span className="text-xs text-zinc-700 font-semibold">
                              {ingre.nombre}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
              {/* Similares */}
              {sugerencias.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Similares</h3>
                  <div className="space-y-2 mt-2">
                    {sugerencias.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setProductoSeleccionadoMenu(item);
                        }}
                        className="flex items-center justify-between gap-4 bg-white p-4 rounded-md cursor-pointer select-none active:scale-95 duration-75 hover:bg-zinc-50"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={item.image}
                            alt={item.nombre}
                            width={200}
                            height={200}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex flex-col">
                            <h4 className="font-semibold">
                              {formatoNombre(item.nombre, 20)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {formatoDinero(item.precio)}
                            </p>
                          </div>
                        </div>

                        {/* <button
                          className="flex items-center justify-center bg-amber-400 rounded-full w-7 h-7 cursor-pointer select-none active:scale-95 duration-75"
                          onClick={(e) => {
                            e.stopPropagation();
                            const estaEnRango1 = bloquearAppMenu(11, 30, 17, 0);
                            const estaEnRango2 = bloquearAppMenu(17, 0, 23, 0);

                            if (!estaEnRango1 && !estaEnRango2) {
                              setOpenModalBloquearAppMenu(true);
                              return;
                            }
                            handleClickAñadirItem(item);
                          }}
                        >
                          <FiPlus className="text-xl text-white" />
                        </button> */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Fijo */}
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg flex items-center justify-between px-6 z-20">
              <div className="flex flex-col items-start">
                <span className="text-xs font-semibold text-zinc-800">
                  Precio
                </span>
                <span className="text-xl font-bold text-black">
                  {formatoDinero(productoSeleccionadoMenu.precio)}
                </span>
              </div>
              {/* <button
                className="bg-amber-400 text-white px-4 py-2 rounded text-sm font-semibold"
                onClick={(e) => {
                  e.stopPropagation();
                  const estaEnRango1 = bloquearAppMenu(11, 30, 17, 0);
                  const estaEnRango2 = bloquearAppMenu(17, 0, 23, 0);

                  if (!estaEnRango1 && !estaEnRango2) {
                    setOpenModalBloquearAppMenu(true);
                    return;
                  }
                  handleClickAñadirItemConProductos(productoSeleccionadoMenu);
                }}
              >
                Agregar al carrito
              </button> */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalProductoSeleccionado;
