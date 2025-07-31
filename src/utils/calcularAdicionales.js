export const calcularAdicionales = (fecha, paraLlevar, total) => {
  const totalNumerico = Number(total) || 0;
  const opciones = {
    timeZone: "America/Bogota",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };

  let valorEnvio = 0;
  let servicioVoluntario = 0;

  if (paraLlevar) {
    const horaColombia = new Intl.DateTimeFormat("es-CO", opciones).format(
      new Date(fecha)
    );
    const [hora, minutos] = horaColombia.split(":").map(Number);
    const esDespuesDeLas10 = hora > 22 || (hora === 22 && minutos > 0);
    valorEnvio = esDespuesDeLas10 ? 4000 : 3000;
  } else {
    servicioVoluntario = totalNumerico * 0.1;
  }

  const precioTotal = totalNumerico + valorEnvio + servicioVoluntario;

  return {
    subTotal: totalNumerico,
    valorEnvio,
    servicioVoluntario,
    precioTotal,
  };
};
