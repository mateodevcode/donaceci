export const validarNumeroTelefono = (numero) => {
  // Expresión regular para validar el formato del número de teléfono
  const regex = /^\d{10}$/; // Asegura que el número tenga exactamente 10 dígitos

  // Verifica si el número es válido
  if (!regex.test(numero)) {
    return false; // Número no válido
  }

  // Si el número es válido, retorna true
  return true;
};
