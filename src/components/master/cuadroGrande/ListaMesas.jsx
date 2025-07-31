"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { mesas } from "@/data/mesas";
import {
  actualizar_orden,
  eliminar_producto_orden,
} from "@/lib/socket/orden_socket";
import { calcularAdicionales } from "@/utils/calcularAdicionales";
import { formatoDinero } from "@/utils/formatoDinero";
import { formatoHora } from "@/utils/formatoFecha";
import { useContext, useEffect, useState } from "react";
import { IoClose, IoPrintOutline, IoWalletOutline } from "react-icons/io5";
import { RiFileList2Line } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";
import { toast } from "sonner";
import { MasterContext } from "@/context/MasterContext";

const ListaMesas = ({ listaOrdenes }) => {
  const { ordenes, setOrdenes } = useContext(MainfudContext);
  const { setDatosTicket, setOpenModalTicket } = useContext(MasterContext);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [servicioVoluntario, setServicioVoluntario] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [valorEnvio, setValorEnvio] = useState(0);
  const [editar, setEditar] = useState(false);

  const ordenCompleta = ordenes?.find(
    (orden) => orden._id === mesaSeleccionada?._id
  );

  useEffect(() => {
    if (!ordenCompleta) return;

    const { valorEnvio, servicioVoluntario, precioTotal } = calcularAdicionales(
      ordenCompleta.createdAt,
      ordenCompleta.para_llevar,
      ordenCompleta.total
    );
    setValorEnvio(valorEnvio);
    setServicioVoluntario(servicioVoluntario);
    setPrecioTotal(precioTotal);
  }, [ordenCompleta]);

  const pagarCuenta = async () => {
    if (!ordenCompleta) {
      console.error("No hay orden pendiente para pagar.");
      return;
    }

    const payload = {
      ...ordenCompleta,
      estado: "terminado",
    };

    try {
      actualizar_orden(ordenCompleta._id, payload);
      setOrdenes((prev) =>
        prev.map((orden) =>
          orden._id === ordenCompleta._id
            ? { ...orden, estado: "terminado" }
            : orden
        )
      );
      setMesaSeleccionada(null);

      toast.success("Pedido completado", {
        description: "Mesa liberada y orden pagada.",
        duration: 1000,
        position: "bottom-center",
        style: {
          backgroundColor: "#34d777",
          color: "#000",
          borderColor: "#000",
        },
      });
    } catch (error) {
      toast.error("Error al actualizar al pagar el pedido.", {
        position: "bottom-center",
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          borderColor: "#B91C1C",
        },
      });
      console.error("Error de red al terminar la orden:", error);
    }
  };

  const cancelarPedido = async () => {
    if (!ordenCompleta) {
      console.error("No hay orden pendiente para cancelar.");
      return;
    }

    const payload = {
      ...ordenCompleta,
      estado: "cancelado",
    };

    try {
      actualizar_orden(ordenCompleta._id, payload);
      setOrdenes((prev) =>
        prev.map((orden) =>
          orden._id === ordenCompleta._id
            ? { ...orden, estado: "cancelado" }
            : orden
        )
      );
      setMesaSeleccionada(null);
      setEditar(false);
      toast.success("Pedido cancelado", {
        description: "Mesa liberada y orden canceladas.",
        duration: 1000,
        position: "bottom-center",
        style: {
          backgroundColor: "#34d777",
          color: "#000",
          borderColor: "#000",
        },
      });
    } catch (error) {
      toast.error("Error al actualizar al pagar el pedido.", {
        position: "bottom-center",
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          borderColor: "#B91C1C",
        },
      });
      console.error("Error de red al terminar la orden:", error);
    }
  };

  return (
    <div className="p-2 flex gap-4 h-[70vh] items-start flex-col md:flex-row md:justify-between">
      {/* mesas */}
      <div className="flex flex-wrap gap-4 h-min md:w-[900px]">
        {mesas.map((orden, index) => {
          const pedido = listaOrdenes.filter((pedido) => pedido.mesa === orden);
          return (
            <div
              key={index}
              onClick={() => {
                if (pedido.length > 0) {
                  setMesaSeleccionada(pedido[0]);
                } else {
                  setMesaSeleccionada(null);
                }
              }}
              className={`p-4 rounded-2xl shadow-lg cursor-pointer select-none h-24 flex items-center justify-center w-28 ${
                pedido.length > 0
                  ? "hover:bg-amber-400 hover:text-black bg-[#252235] text-zinc-100 transition-transform transform active:scale-95 duration-150"
                  : "bg-white text-zinc-800"
              }`}
            >
              <div className="flex flex-col items-center justify-between gap-2">
                {pedido.length ? (
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-semibold">
                      {pedido[0]?.mesa}
                    </span>
                    <span className="text-base font-semibold">
                      {formatoDinero(pedido[0]?.total)}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-semibold">{orden}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* detalle de cada mesa */}
      {ordenCompleta ? (
        <div className="w-12/12 md:w-[500px] bg-white rounded-xl relative h-full overflow-y-auto">
          <div className="flex items-center p-4 rounded-t-2xl w-full justify-between gap-4 border-b-[1px] border-zinc-200 sticky top-0 bg-white z-10">
            <button
              className="text-xl cursor-pointer select-none"
              onClick={() => {
                setMesaSeleccionada(null);
              }}
            >
              <IoClose />
            </button>
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm">
                  Mesa {ordenCompleta?.mesa}
                </span>
                <span className="text-sm">
                  {formatoDinero(ordenCompleta?.total)}
                </span>
              </div>
              <button
                onClick={() => setEditar(!editar)}
                className="text-xl cursor-pointer select-none hover:text-rose-500 transition-colors duration-200"
              >
                <SlOptions />
              </button>
            </div>
          </div>
          <div className="h-full overflow-y-auto">
            <div className="w-full">
              <div className="w-full px-4 text-right flex justify-end items-center">
                <span className="text-sm text-zinc-500 mt-2">
                  a las {formatoHora(ordenCompleta?.createdAt)}
                </span>
              </div>
              {ordenCompleta?.listaPedidos.map((item, index) => (
                <div key={index} className={`border-b-[1px] border-zinc-200`}>
                  <div className="w-full px-4 md:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <span className="text-base font-semibold">
                        {item.pedido}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out`}
                  >
                    <div className="text-black text-sm leading-relaxed space-y-1 p-4">
                      {/* {item.content} */}
                      {item?.items.map((pedido, index) => {
                        return (
                          <div
                            key={index}
                            className={`flex items-center justify-between gap-1 text-sm w-full select-none relative`}
                          >
                            <div className="flex items-center gap-2">
                              {editar && (
                                <button
                                  className="flex items-center justify-center w-6 h-6 bg-black/20 rounded-full hover:bg-rose-500 cursor-pointer select-none"
                                  onClick={() => {
                                    eliminar_producto_orden(
                                      ordenCompleta._id,
                                      pedido._id
                                    );

                                    toast.success("Producto eliminado", {
                                      description:
                                        "Producto eliminado de la orden.",
                                      duration: 1000,
                                      position: "bottom-center",
                                      style: {
                                        backgroundColor: "#34d777",
                                        color: "#000",
                                        borderColor: "#000",
                                      },
                                    });
                                  }}
                                >
                                  <IoClose />
                                </button>
                              )}
                              <div className="text-xs bg-zinc-100 text-black px-3 py-1 flex items-center gap-1 rounded-full">
                                <span>x</span>{" "}
                                <span className="font-semibold">
                                  {pedido.cantidad}
                                </span>
                              </div>
                              <span className="text-xs md:text-sm">
                                {pedido.nombre}
                              </span>
                            </div>
                            <span className="text-black px-2 py-0.5 rounded-full font-semibold text-xs md:text-sm">
                              {formatoDinero(pedido.precio)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 w-full p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                  <RiFileList2Line />
                  <span>Comentarios:</span>
                </div>
                <p className="text-xs text-zinc-500 break-words whitespace-pre-line">
                  {ordenCompleta.comentarios
                    ? ordenCompleta.comentarios
                    : "Sin comentarios"}
                </p>
              </div>
              {/* Envio o Servicio voluntario */}
              {ordenCompleta?.para_llevar ? (
                <div className="w-full px-5">
                  <span className="text-sm text-rose-500 mt-2 font-semibold flex items-center justify-between">
                    <span className="text-black">Valor de envío</span>{" "}
                    <span>{formatoDinero(valorEnvio)}</span>
                  </span>
                </div>
              ) : (
                <div className="w-full px-5">
                  <span className="text-sm text-rose-500 mt-2 font-semibold flex items-center justify-between">
                    <span className="text-black">Servicio voluntario</span>{" "}
                    <span>{formatoDinero(servicioVoluntario)}</span>
                  </span>
                </div>
              )}
              {/* Total */}
              <div className="w-full px-5 mt-4 text-right flex justify-end items-center">
                <span className="text-sm text-rose-500 mt-2 font-semibold">
                  <span className="text-black">Total a pagar:</span>{" "}
                  {formatoDinero(precioTotal)}
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex items-center gap-2 p-4 absolute bottom-0 left-0 right-0">
              {editar ? (
                <button
                  onClick={cancelarPedido}
                  className="w-full border-rose-400 border-[1px] text-black py-2 rounded-xl flex items-center gap-2 transition-colors duration-200 justify-center cursor-pointer select-none active:scale-95 hover:bg-rose-500 hover:text-white"
                >
                  <IoPrintOutline />
                  <span className="text-sm">Cancelar pedido</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setDatosTicket(ordenCompleta);
                    setOpenModalTicket(true);
                  }}
                  className="w-full border-rose-400 border-[1px] text-black py-2 rounded-xl flex items-center gap-2 transition-colors duration-200 justify-center cursor-pointer select-none active:scale-95 hover:bg-rose-500 hover:text-white"
                >
                  <IoPrintOutline />
                  <span className="text-sm">Imprimir Ticket</span>
                </button>
              )}
              <button
                onClick={pagarCuenta}
                className="w-full border-zinc-400 border-[1px] text-black py-2 rounded-xl flex items-center gap-2 transition-colors duration-200 justify-center cursor-pointer select-none active:scale-95 hover:bg-[#252235] hover:text-white"
              >
                <IoWalletOutline />{" "}
                <span className="text-sm">Pagar Cuenta</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-12/12 md:w-[500px] bg-white rounded-xl relative">
          <div className="flex items-center p-4 rounded-t-2xl w-full justify-between gap-4 border-b-[1px] border-zinc-200">
            <span className="text-lg font-semibold">Selecciona una mesa</span>
            <button
              className="text-xl cursor-pointer select-none"
              onClick={() => setMesaSeleccionada(null)}
            >
              <IoClose />
            </button>
          </div>
          <div className="p-6 text-center text-zinc-500 flex flex-col items-center justify-center h-72 w-full">
            <span className="text-sm">
              Haz clic en una mesa para ver los pedidos
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaMesas;
