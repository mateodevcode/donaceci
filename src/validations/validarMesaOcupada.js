export function validarMesaOcupada(ordens, mesa) {
  return ordens.some(
    (orden) =>
      orden.estado === "pendiente" &&
      orden.mesa === mesa &&
      orden.para_llevar === false
  );
}
