export const formatoFecha = (fecha) => {
  if (!fecha) return "";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // hour12: false,
  };

  return new Date(fecha).toLocaleDateString("es-ES", options);
};

export const formatoHora = (fecha) => {
  if (!fecha) return "";

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Cambia a false si prefieres el formato de 24 horas
  };

  return new Date(fecha).toLocaleTimeString("es-ES", options);
};

export const formatoFechaCorta = (fecha) => {
  if (!fecha) return "";

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return new Date(fecha).toLocaleDateString("es-ES", options);
};
