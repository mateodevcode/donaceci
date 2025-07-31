"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { MasterContext } from "@/context/MasterContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PiPicnicTableBold } from "react-icons/pi";
import { TbHomeCheck } from "react-icons/tb";
import { toast } from "sonner";
import { RiFileList2Line, RiFileList3Line } from "react-icons/ri";
import { BsPersonCheck } from "react-icons/bs";
import { FaPhone, FaUserCheck } from "react-icons/fa6";
import CategoriaNuevoPedido from "./CategoriasNuevoPedido";
import DetalleNuevoPedido from "./DetalleNuevoPedido";
import CardProductoNuevoPedido from "./CardProductoNuevoPedido";
import useCarritoCompras from "@/hooks/useCarritoCompras";
import { getId } from "@qrvey/id-generator";
import { ordenesSchema } from "@/validations/validations/ordenes";
import { actualizar_orden } from "@/lib/socket/orden_socket";
import { metodos_de_pago } from "@/data/metodos_de_pago";

const ModalEditarPedido = () => {
  const { openModalEditarPedido, setOpenModalEditarPedido } =
    useContext(MasterContext);
  const {
    setFormDatos,
    categorias,
    categoriaSeleccionada,
    productos,
    setItemsSeleccionados,
    itemsSeleccionados,
    usuario,
    pedidoAEditar,
    setPedidoAEditar,
  } = useContext(MainfudContext);
  const { actualizarOrdenBaseDatosMaster } = useCarritoCompras();
  const customAlphabet = "0123456789ABCDEF";
  const customLength = 8;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (openModalEditarPedido) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalEditarPedido]);

  const toggleCheckbox = (valor) => {
    setPedidoAEditar((prev) => ({
      ...prev,
      para_llevar: valor,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedidoAEditar((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(null);
  };

  const handleClickPedir = async () => {
    const data = {
      ...pedidoAEditar,
      pedido: getId(customAlphabet, customLength),
      id_usuario: usuario?._id,
      listaPedidos: itemsSeleccionados,
      estado: "pendiente",
      para_llevar: pedidoAEditar.para_llevar,
      name: pedidoAEditar.nombre,
      direccion: pedidoAEditar.direccion,
      mesa: Number(pedidoAEditar.mesa), // <--- Importante convertir a number
      telefono: pedidoAEditar.telefono,
      comentarios: pedidoAEditar.comentarios,
      listaPedidos: pedidoAEditar.listaPedidos || [],
      _id: pedidoAEditar._id, // Asegurarse de que el ID de la orden se mantenga
    };

    const errores = ordenesSchema(data);

    if (errores.length > 0) {
      errores.forEach((e) => toast.error(e));
      return;
    }
    setItemsSeleccionados([]);
    toast.success("Se ha realizado el pedido", {
      duration: 1000,
      position: "top-center",
      style: {
        backgroundColor: "#34d777",
        color: "#000",
        borderColor: "#000",
      },
    });
    if (itemsSeleccionados.length > 0) {
      await actualizarOrdenBaseDatosMaster(
        pedidoAEditar._id,
        itemsSeleccionados
      );
    }
    actualizar_orden(pedidoAEditar._id, {
      name: pedidoAEditar.name,
      direccion: pedidoAEditar.direccion,
      telefono: pedidoAEditar.telefono,
      mesa: pedidoAEditar.mesa,
      estado: "pendiente",
      para_llevar: pedidoAEditar.para_llevar,
      comentarios: pedidoAEditar.comentarios,
      metodo_de_pago: pedidoAEditar.metodo_de_pago,
    });
    const nuevaOrden = {
      pedido: getId(customAlphabet, customLength),
      name: "",
      direccion: "",
      telefono: "",
      mesa: null,
      total: 0,
      estado: "pendiente",
      listaPedidos: [],
      para_llevar: null,
      id_usuario: usuario?._id,
      cuenta_solicitada: false,
      comentarios: "",
      metodo_de_pago: "", // Asegurarse de que el campo exista
    };
    setFormDatos(nuevaOrden);
    setOpenModalEditarPedido(false);
  };

  return (
    <AnimatePresence>
      {openModalEditarPedido && (
        <div className="fixed inset-0 z-30 flex items-center bg-black/10 justify-center bg-opacity-90 overflow-auto">
          <motion.div
            className="relative w-full flex flex-col overflow-y-auto mx-auto h-full items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setOpenModalEditarPedido(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full md:w-[800px] select-none relative"
            >
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center absolute z-10 right-2 top-2 bg-black/10 hover:bg-black/20 transition-colors"
                onClick={() => {
                  setOpenModalEditarPedido(false);
                }}
              >
                <IoClose className="text-lg text-zinc-800 cursor-pointer" />
              </button>
              <div
                className={`p-4 rounded-2xl shadow-lg bg-white text-zinc-800 h-svh overflow-y-auto`}
              >
                <div className="bg-white p-6 text-zinc-800 mt-4">
                  <div className="w-full flex items-center justify-between mb-6">
                    <h2 className="w-full font-semibold text-xl">
                      Editar Pedido
                    </h2>
                    <div className="flex items-center gap-2 text-black">
                      <RiFileList2Line className="text-2xl" />
                      <span className="font-bold">{pedidoAEditar?.pedido}</span>
                    </div>
                  </div>

                  {error && <p className="text-red-500 mt-4">{error}</p>}
                  {success && <p className="text-green-500 mt-4">{success}</p>}

                  {/* inputs textp */}
                  <div className="grid gap-6 mt-10 md:mt-0">
                    <div className="w-full flex flex-col md:flex-row items-center gap-4">
                      <div className="w-11/12 md:w-1/2 flex flex-col gap-4">
                        {/* Nombres Cliente */}
                        <div className="grid gap-2 border-[1px] border-border rounded-full px-4 py-3 relative">
                          <span className="text-xs bg-white absolute left-4 -top-2 px-2">
                            Nombre Cliente
                          </span>
                          <div className="relative flex items-center gap-4">
                            <BsPersonCheck className="h-4 w-4 text-muted-foreground" />
                            <input
                              type="text"
                              placeholder="Ej: Juan Perez"
                              required
                              name="name"
                              onChange={handleChange}
                              value={pedidoAEditar?.nombre ?? ""}
                              className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                            />
                          </div>
                        </div>
                        {/* Direccion */}
                        <div className="grid gap-2 border-[1px] border-border rounded-full px-4 py-3 relative">
                          <span className="text-xs bg-white absolute left-4 -top-2 px-2">
                            Dirección
                          </span>
                          <div className="relative flex items-center gap-4">
                            <TbHomeCheck className="h-4 w-4 text-muted-foreground" />
                            <input
                              type="text"
                              placeholder="Ej: Calle Falsa 123"
                              required
                              name="direccion"
                              onChange={handleChange}
                              value={pedidoAEditar?.direccion ?? ""}
                              className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                            />
                          </div>
                        </div>
                        {/* Telefono */}
                        <div className="grid gap-2 border-[1px] border-border rounded-full px-4 py-3 relative">
                          <span className="text-xs bg-white absolute left-4 -top-2 px-2">
                            Telefono
                          </span>
                          <div className="relative flex items-center gap-4">
                            <FaPhone className="h-4 w-4 text-muted-foreground" />
                            <input
                              type="text"
                              placeholder="Ej: 3001234567"
                              required
                              name="telefono"
                              onChange={handleChange}
                              value={pedidoAEditar?.telefono ?? ""}
                              className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-11/12 md:w-1/2 flex flex-col gap-4">
                        {/* Mesa */}
                        <div className="grid gap-2 border-[1px] border-border rounded-full px-4 py-3 relative">
                          <span className="text-xs bg-white absolute left-4 -top-2 px-2">
                            Mesa
                          </span>
                          <div className="relative flex items-center gap-4">
                            <PiPicnicTableBold className="h-4 w-4 text-muted-foreground" />
                            <input
                              type="number"
                              placeholder="Ej: 14"
                              required
                              name="mesa"
                              onChange={handleChange}
                              value={pedidoAEditar?.mesa ?? 0}
                              className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                            />
                          </div>
                        </div>
                        {/* Empleado */}
                        <div className="grid gap-2 border-[1px] border-border rounded-full px-4 py-3 relative">
                          <span className="text-xs bg-white absolute left-4 -top-2 px-2">
                            Empleado
                          </span>
                          <div className="relative flex items-center gap-4">
                            <FaUserCheck className="h-4 w-4 text-muted-foreground" />
                            <span className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm">
                              {usuario?.name}
                            </span>
                          </div>
                        </div>
                        {/* Opciones para llevar o comer aqui */}
                        <div className="w-full flex items-center gap-4 px-2">
                          <label className="flex items-center gap-3 w-1/2 bg-rose-500/10 p-2 rounded-lg cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={!pedidoAEditar?.para_llevar ?? false}
                              onChange={() => toggleCheckbox(false)}
                              className="appearance-none w-5 h-5 rounded-full border-2 border-zinc-700 checked:bg-green-500 checked:border-green-600 transition-colors"
                            />
                            <span className="text-sm font-semibold">
                              Para comer aquí
                            </span>
                          </label>
                          <label className="flex items-center gap-3 w-1/2 bg-rose-500/10 p-2 rounded-lg cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={pedidoAEditar?.para_llevar ?? false}
                              onChange={() => toggleCheckbox(true)}
                              className="appearance-none w-5 h-5 rounded-full border-2 border-zinc-700 checked:bg-green-500 checked:border-green-600 transition-colors"
                            />
                            <span className="text-sm font-semibold">
                              Para llevar
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Comentarios */}
                    <div className="w-full flex items-center justify-center">
                      <div className="grid gap-2 border-[1px] border-border rounded-lg px-4 py-3 relative w-11/12">
                        <span className="text-xs bg-white absolute left-4 -top-2 px-2">
                          Comentarios
                        </span>
                        <div className="relative flex items-center gap-4">
                          <RiFileList3Line className="h-4 w-4 text-muted-foreground" />
                          <textarea
                            id="comentarios"
                            type="text"
                            placeholder="Ej: Sin cebolla, extra queso"
                            required
                            name="comentarios"
                            onChange={handleChange}
                            value={pedidoAEditar?.comentarios}
                            className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-purple-600 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Medios de Pago */}
                    <div className="w-full flex items-center justify-center">
                      <div className="grid gap-2 border-[1px] border-border rounded-lg px-4 py-3 relative w-11/12">
                        <span className="text-xs bg-white absolute left-4 -top-2 px-2">
                          Medios de Pago
                        </span>
                        <div className="relative flex items-center gap-4">
                          <div className="w-full p-4">
                            <div className="flex flex-wrap w-full p-2 gap-4">
                              {metodos_de_pago.map((metodo, index) => (
                                <div
                                  key={index}
                                  onClick={() =>
                                    setPedidoAEditar((prev) => ({
                                      ...prev,
                                      metodo_de_pago:
                                        metodo.id === "tarjeta_debito" ||
                                        metodo.id === "tarjeta_credito"
                                          ? "efectivo"
                                          : metodo.id,
                                    }))
                                  }
                                  className={`flex flex-col gap-2 w-20 h-20 rounded-lg items-center justify-center  select-none active:scale-95 duration-200 ${
                                    metodo.id === "tarjeta_debito" ||
                                    metodo.id === "tarjeta_credito"
                                      ? "opacity-50 cursor-not-allowed"
                                      : "cursor-pointer"
                                  }`}
                                >
                                  <div
                                    className={`rounded-full hover:bg-green-600/50 ${
                                      metodo.id === "efectivo"
                                        ? "p-4"
                                        : metodo.id === "nequi"
                                        ? "p-3"
                                        : "p-4"
                                    }
                                                    ${
                                                      metodo.id ===
                                                        "tarjeta_debito" ||
                                                      metodo.id ===
                                                        "tarjeta_credito"
                                                        ? "pointer-events-none opacity-50"
                                                        : ""
                                                    } ${
                                      metodo.id ===
                                      pedidoAEditar?.metodo_de_pago
                                        ? "bg-green-600/50"
                                        : "bg-green-50"
                                    }`}
                                  >
                                    {metodo.icono}
                                  </div>
                                  <span className="text-xs font-semibold">
                                    {metodo.nombre}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <CategoriaNuevoPedido />
                      <>
                        {categorias?.map((categoria, index) => {
                          const nombreCategoria =
                            categoria.nombreFormateado.toLowerCase();

                          if (categoriaSeleccionada !== nombreCategoria)
                            return null;

                          const filtrarProductos = productos?.filter((item) => {
                            const perteneceCategoria =
                              item.categoria === nombreCategoria;

                            if (!perteneceCategoria) return false;

                            if (pedidoAEditar?.para_llevar === true) {
                              return item.disponible_para_llevar === true;
                            }

                            if (pedidoAEditar?.para_llevar === false) {
                              return item.disponible_comer_aqui === true;
                            }

                            return true;
                          });

                          return (
                            <CardProductoNuevoPedido
                              key={index}
                              productos={filtrarProductos}
                            />
                          );
                        })}
                      </>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-2 w-full">
                      <button
                        onClick={handleClickPedir}
                        className="font-semibold bg-rose-500 rounded-full text-white p-2 hover:bg-rose-400 transition-colors cursor-pointer select-none active:scale-95 duration-150 w-full"
                      >
                        Agregar Pedido
                      </button>

                      <button
                        className="font-semibold bg-black rounded-full text-white p-2 hover:bg-black/80 transition-colors cursor-pointer select-none active:scale-95 duration-150 w-full"
                        onClick={() => {
                          setOpenModalEditarPedido(false);
                          setItemsSeleccionados([]);
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <DetalleNuevoPedido />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalEditarPedido;
