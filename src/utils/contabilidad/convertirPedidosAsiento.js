export function convertirPedidoAAsiento(pedido) {
  const totalVenta = Number(pedido.total);
  let servicio = 0;
  let envio = 0;
  const horaPedido = new Date(pedido.createdAt).getHours();

  if (!pedido.para_llevar) {
    servicio = Math.round(totalVenta * 0.1);
  }

  if (pedido.para_llevar) {
    envio = horaPedido >= 22 ? 4000 : 3000;
  }

  const totalCobrado = totalVenta + servicio + envio;

  const detalles_cobro = {
    total_venta: totalVenta,
    servicio_voluntario: servicio,
    envio: envio,
    total_cobrado: totalCobrado,
  };

  const movimientos = [
    {
      cuenta: "1105",
      nombre: "Caja",
      debe: totalCobrado,
      haber: 0,
    },
    {
      cuenta: "4135",
      nombre: "Ingresos por ventas",
      debe: 0,
      haber: totalVenta,
    },
  ];

  if (servicio > 0) {
    movimientos.push({
      cuenta: "4235",
      nombre: "Ingresos por servicios",
      debe: 0,
      haber: servicio,
    });
  }

  if (envio > 0) {
    movimientos.push({
      cuenta: "4240",
      nombre: "Ingresos por domiciliario",
      debe: 0,
      haber: envio,
    });
  }

  return {
    fecha: new Date(pedido.createdAt).toISOString().split("T")[0],
    detalle: `Venta a cliente ${pedido.nombre} - Pedido ${pedido.pedido}`,
    movimientos,
    detalles_cobro, // ← Lo agregamos aquí
  };
}
