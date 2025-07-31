"use client";

import { formatoDinero } from "@/utils/formatoDinero";
import Pedidos from "./Pedidos";
import { MainfudContext } from "@/context/MainfudContext";
import { useContext, useEffect, useState } from "react";
import BadgeEstado from "../../badges/BadgeEstado";
import { formatoFecha } from "@/utils/formatoFecha";
import { tomarDosPrimerosNombres } from "@/utils/tomarDosPrimerosNombres";
import { actualizar_orden } from "@/lib/socket/orden_socket";
import { toast } from "sonner";

const Orden = () => {
  const { ordenPendiente } = useContext(MainfudContext);

  const [servicioVoluntario, setServicioVoluntario] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [valorEnvio, setValorEnvio] = useState(0);

  useEffect(() => {
    if (ordenPendiente?.para_llevar) {
      const fecha = new Date(ordenPendiente.createdAt);

      // Convertimos a hora de Colombia
      const opciones = {
        timeZone: "America/Bogota",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      };
      const horaColombia = new Intl.DateTimeFormat("es-CO", opciones).format(
        fecha
      );

      const [hora, minutos] = horaColombia.split(":").map(Number);
      const esDespuesDeLas10 = hora > 22 || (hora === 22 && minutos > 0);

      const valorEnvio = esDespuesDeLas10 ? 4000 : 3000;
      setValorEnvio(valorEnvio);
      setPrecioTotal(Number(ordenPendiente?.total) + valorEnvio);
    } else {
      setValorEnvio(0);

      const servicio = Number(ordenPendiente?.total) * 0.1 || 0;
      setServicioVoluntario(servicio);
      setPrecioTotal(Number(ordenPendiente?.total) + servicio);
    }
  }, [ordenPendiente]);

  const solicitarCuenta = async () => {
    if (!ordenPendiente) {
      console.error("No se encontró una orden pendiente.");
      return;
    }

    const payload = {
      ...ordenPendiente,
      cuenta_solicitada: true,
    };

    try {
      actualizar_orden(ordenPendiente._id, payload);

      toast.success("La cuenta ha sido solicitada", {
        description: "Uno de nuestros meseros se acercará a cobrar.",
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#34d777",
          color: "#000",
          borderColor: "#000",
        },
      });
    } catch (error) {
      toast.error("Error al cobrar la cuenta", {
        position: "bottom-center",
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          borderColor: "#B91C1C",
        },
      });
      console.error("Error de red al cobrar la cuenta:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* <Header /> */}
      {ordenPendiente && (
        <div className="w-11/12 md:w-[450px] flex flex-col items-center bg-zinc-50 relative p-10 h-[75vh] rounded-2xl text-zinc-800 border-[1px] border-zinc-50">
          <div className="absolute overflow-y-auto w-full px-7 h-[77%]">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center justify-between gap-4 w-full">
                <p className="font-bold text-3xl">Pedido</p>
                <div className="flex flex-row items-center gap-8">
                  <BadgeEstado estado={ordenPendiente?.estado} />
                </div>
              </div>
            </div>
            {/* Nombre y pedido */}
            <div className="flex flex-row w-full justify-between items-start mt-5 mb-5 gap-4">
              <div className="w-1/2">
                <p className="text-sm md:text-base font-semibold text-zinc-500">
                  Nombre del cliente
                </p>
                <span className="">
                  {tomarDosPrimerosNombres(ordenPendiente?.nombre)}
                </span>
              </div>
              <div className="w-1/2">
                <p className="text-sm md:text-base font-semibold text-zinc-500">
                  Pedido N°
                </p>
                <span className="text-sm md:text-base">
                  {ordenPendiente?.pedido}
                </span>
              </div>
            </div>

            {/* Direccion y fecha */}
            <div className="flex flex-row w-full justify-between items-start gap-4">
              {ordenPendiente?.para_llevar ? (
                <div className="w-1/2">
                  <p className="text-sm md:text-base font-semibold text-zinc-500">
                    Dirección
                  </p>

                  <span className="text-sm md:text-base">
                    {ordenPendiente?.direccion}
                  </span>
                </div>
              ) : (
                <div className="w-1/2">
                  <p className="text-sm md:text-base font-semibold text-zinc-500">
                    Mesa
                  </p>
                  <span className="text-sm md:text-base">
                    {ordenPendiente?.mesa}
                  </span>
                </div>
              )}
              <div className="w-1/2">
                <p className="text-sm md:text-lg font-semibold text-zinc-500">
                  Fecha
                </p>
                <span className="text-sm md:text-base">
                  {formatoFecha(ordenPendiente?.createdAt)}
                </span>
              </div>
            </div>

            {/* resumen */}
            <div className="w-full">
              <div className="w-full bg-amber-800/10 text-zinc-800 p-4 mt-5 flex flex-row justify-between items-center h-12">
                <span className="text-sm md:text-base font-semibold">
                  Descripción
                </span>
                <span className="text-sm md:text-base font-semibold">
                  Precio
                </span>
              </div>
              <Pedidos ordenCompleta={ordenPendiente} />
            </div>

            {/* Total */}
            <>
              {!ordenPendiente?.para_llevar && (
                <div className="w-full">
                  <div className="w-full py-4 flex flex-row justify-between px-2 items-center h-16 gap-2 ">
                    <span className="text-sm text-black h-12 md:h-16 flex font-semibold items-center justify-center">
                      Servicio voluntario: (10%)
                    </span>
                    <span className="text-sm md:text-base font-semibold">
                      {formatoDinero(servicioVoluntario)}
                    </span>
                  </div>
                </div>
              )}

              {ordenPendiente?.para_llevar && (
                <div className="w-full">
                  <div className="w-full py-4 flex flex-row justify-between px-2 items-center h-16 gap-">
                    <span className="text-sm text-black h-12 md:h-16 flex font-semibold items-center justify-center">
                      Valor de envío:
                    </span>
                    <span className="text-sm md:text-base font-semibold">
                      {formatoDinero(valorEnvio)}
                    </span>
                  </div>
                </div>
              )}

              <div className="w-full bg-amber-800/10">
                <div className="w-full p-4 flex flex-row justify-end items-center h-12 gap-2">
                  <span className="text-sm md:text-base font-semibold bg-black/50 text-white h-12 px-5 flex items-center justify-center">
                    Total:
                  </span>
                  <span className="text-sm md:text-base font-semibold">
                    {formatoDinero(precioTotal)}
                  </span>
                </div>
              </div>

              {ordenPendiente?.para_llevar === false &&
                ordenPendiente?.estado === "pendiente" && (
                  <div className="w-full flex items-center justify-end mt-10">
                    <button
                      className="text-sm md:text-base font-semibold bg-blue-600 text-white h-12 md:h-16 px-6 flex items-center justify-center cursor-pointer active:scale-95 hover:bg-blue-700 transition-colors duration-200"
                      onClick={solicitarCuenta}
                    >
                      Solicitar cuenta
                    </button>
                  </div>
                )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orden;
