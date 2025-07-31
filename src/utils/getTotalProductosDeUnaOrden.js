export const getTotalProductosDeUnaOrden = (listaPedidos) => {
  if (!Array.isArray(listaPedidos)) return 0;

  let total = 0;

  listaPedidos.forEach((pedido) => {
    if (Array.isArray(pedido.items)) {
      pedido.items.forEach((item) => {
        if (typeof item.cantidad === "number") {
          total += item.cantidad;
        }
      });
    }
  });

  return total;
};
