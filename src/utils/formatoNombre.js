export const formatoNombre = (nombre, limite = 20) => {
  if (!nombre || nombre === undefined) return "";

  if (nombre.length > limite) {
    return nombre.slice(0, limite) + "...";
  }

  return nombre;
};
