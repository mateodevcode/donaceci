export function capitalizarFrase(frase) {
  return frase
    .toLowerCase() // Primero pasamos todo a minúsculas
    .split(" ") // Separamos por palabras
    .filter((palabra) => palabra.trim() !== "") // Eliminamos espacios extras
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)) // Capitalizamos cada palabra
    .join(" "); // Unimos las palabras nuevamente
}
