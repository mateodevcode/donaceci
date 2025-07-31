export const validarNombre = (nombre) => {
  // Expresión regular para validar la longitud y caracteres del nombre
  const regex = /^[a-zA-ZÀ-ÿ\s]{3,30}$/; // Permite letras, acentos y espacios, entre 3 y 30 caracteres

  // Verifica si el nombre es válido
  if (!regex.test(nombre)) {
    return false; // nombre no válido
  }

  // Si el nombre es válido, retorna true
  return true;
};
