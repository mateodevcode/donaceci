export const formatoDinero = (cantidad) => {
  if (cantidad === undefined) {
    return;
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(cantidad);
};
