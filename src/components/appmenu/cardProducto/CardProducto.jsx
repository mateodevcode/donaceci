"use client";

import { MainfudContext } from "@/context/MainfudContext";
import useCarritoCompras from "@/hooks/useCarritoCompras";
import useSonido from "@/hooks/useSonido";
import { bloquearAppMenu } from "@/utils/bloquearAppMenu";
import { formatoDinero } from "@/utils/formatoDinero";
import { formatoNombre } from "@/utils/formatoNombre";
import Image from "next/image";
import React, { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";

const CardProducto = ({ productos }) => {
  const {
    setProductoSeleccionadoMenu,
    setOpenModalProductoSeleccionado,
    formDatos,
    usuario,
    setOpenModalIniciarSesion,
    setOpenModalTipoPedido,
    setOpenModalDireccionTelefono,
    setOpenModalQRMesaNombre,
    setOpenModalBloquearAppMenu,
    itemsSeleccionados,
  } = useContext(MainfudContext);
  const { sonidoAgregarAlCarrito } = useSonido();
  const { agregarProducto } = useCarritoCompras();

  const handleClickAñadirItem = (item) => {
    if (formDatos.para_llevar === null) {
      setOpenModalTipoPedido(true);
      return;
    }

    if (
      formDatos.para_llevar === false &&
      (formDatos.mesa === null || formDatos.name === "")
    ) {
      setOpenModalQRMesaNombre(true);
      return;
    }

    if (
      formDatos.para_llevar === true &&
      (formDatos.direccion === "" || formDatos.telefono === "")
    ) {
      setOpenModalDireccionTelefono(true);
      return;
    }

    if (formDatos.para_llevar && !usuario) {
      // Verificar si esta para llevar y ya inicio sesion
      setOpenModalIniciarSesion(true);
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

  return (
    <div className="w-11/12 mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {productos?.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setProductoSeleccionadoMenu(item);
            setOpenModalProductoSeleccionado(true);
          }}
          className={`bg-white shadow-lg rounded-lg p-4 flex flex-col items-center select-none relative overflow-hidden ${
            item.disponibilidad
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-50 pointer-events-none"
          }`}
        >
          {!item.disponibilidad && (
            <div className="absolute top-8 -left-10 w-[160px] bg-red-600 text-white text-sm font-semibold text-center rotate-[-45deg] shadow-md py-1">
              Agotado
            </div>
          )}

          <div className="bg-zinc-50 dark:bg-zinc-100 rounded-full w-28 h-28 p-3 flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.nombre}
              width={100}
              height={100}
              className="w-20 h-20 shadow-png rounded-full object-cover"
            />
          </div>
          <div className="w-full">
            <h3 className="font-semibold text-black text-xs mt-2">
              {formatoNombre(item.nombre, 16)}
            </h3>
            <div className="flex items-center justify-between w-full mt-1">
              <span className="text-gray-600 text-xs font-semibold font-roboto">
                {formatoDinero(item.precio)}
              </span>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardProducto;
