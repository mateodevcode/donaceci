export const getFechaColombia = () => {
  const hoy = new Date();
  const fechaHoy = hoy.toISOString().slice(0, 10);
  return fechaHoy; // Devuelve "YYYY-MM-DD"
};

export const formatearFechaColombia = (fechaISO) => {
  const fecha = fechaISO.slice(0, 10);
  return fecha; // Devuelve "YYYY-MM-DD"
};
