export function formatearDescripcion(entrada) {
  if (entrada === null || entrada === undefined) return "";

  // Convertir a string, limpiar espacios y pasar a minúsculas
  const frase = String(entrada).trim().toLowerCase();

  if (!frase) return "";

  // Separar en palabras
  const palabras = frase.split(" ");

  // Capitalizar la primera palabra
  palabras[0] = palabras[0].charAt(0).toUpperCase() + palabras[0].slice(1);

  // Unir y devolver
  return palabras.join(" ");
}
