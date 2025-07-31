"use client";

import { calcularAdicionales } from "@/utils/calcularAdicionales";
import { formatoDinero } from "@/utils/formatoDinero";
import React, { useEffect, useState } from "react";

const Ticket = ({ datos }) => {
  const [servicioVoluntario, setServicioVoluntario] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [valorEnvio, setValorEnvio] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const items = datos?.listaPedidos.flatMap((p) => p.items);

  useEffect(() => {
    if (!datos) return;

    const { valorEnvio, servicioVoluntario, precioTotal, subTotal } =
      calcularAdicionales(datos.createdAt, datos.para_llevar, datos.total);
    setSubTotal(subTotal);
    setValorEnvio(valorEnvio);
    setServicioVoluntario(servicioVoluntario);
    setPrecioTotal(precioTotal);
  }, [datos]);

  return (
    <div className="print-area w-[300px] p-2 text-xs font-mono">
      <div className="text-center mb-2">
        <h2 className="font-bold text-base">Doña Ceci Restaurante</h2>
        <p>NIT 901762980-0</p>
        <p>Cl. 22 Cra 12-35, Sabanalarga, Atlántico</p>
        <p>Tel: 305 930 2227</p>
      </div>

      <div className="border-t border-dashed my-2" />

      <div className="text-xs mb-1">
        <p>
          <strong>Fecha:</strong> {new Date().toLocaleString()}
        </p>
        <p>
          <strong>Mesa:</strong> {datos.mesa || "No asignada"}
        </p>
        <p>
          <strong>Cliente:</strong> {datos.nombre || "Invitado"}
        </p>
        <p>
          <strong>Pedido ID:</strong> #{datos.pedido || "N/A"}
        </p>
      </div>

      <div className="border-t border-dashed my-2" />

      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-dashed">
            <th className="text-left">Cant</th>
            <th className="text-left mx-2">Producto</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody className="">
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.cantidad}</td>
              <td>{item.nombre}</td>
              <td className="text-right">
                {formatoDinero(item.precio * item.cantidad)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-dashed my-2" />

      <div className="text-right mb-1">
        <p>
          <strong>Subtotal:</strong> {formatoDinero(subTotal)}
        </p>
        {datos?.para_llevar ? (
          <p>
            <strong>Valor de envío:</strong> {formatoDinero(valorEnvio)}
          </p>
        ) : (
          <p>
            <strong>Servicio voluntario:</strong>{" "}
            {formatoDinero(servicioVoluntario)}
          </p>
        )}
        <p className="text-sm">
          <strong>Total: {formatoDinero(precioTotal)}</strong>
        </p>
      </div>

      <div className="border-t border-dashed my-2" />

      <div className="text-center text-xs">
        <p>¡Gracias por su compra!</p>
        <p>Ver factura digital:</p>
        {/* <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://mainfud.com/factura/12345`}
          alt="QR"
          className="mx-auto my-3"
        /> */}
      </div>
    </div>
  );
};

export default Ticket;
