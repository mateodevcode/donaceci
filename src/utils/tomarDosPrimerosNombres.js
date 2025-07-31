export function tomarDosPrimerosNombres(nombreCompleto) {
  // Limpiamos y dividimos por espacios
  const nombres = (nombreCompleto || "").trim().split(/\s+/);

  // Filtramos elementos vacíos por si hay múltiples espacios
  const nombresValidos = nombres.filter(Boolean);

  // Si no hay nombres, devolvemos vacío
  if (nombresValidos.length === 0) return "";

  // Tomamos máximo dos nombres
  const seleccionados = nombresValidos.slice(0, 2);

  // Capitalizamos cada nombre
  const capitalizados = seleccionados.map((nombre) => {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  });

  // Unimos y devolvemos
  return capitalizados.join(" ");
}
