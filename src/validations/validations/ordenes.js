export function ordenesSchema(data) {
  const errores = [];

  if (!data.name || data.name.trim() === "") {
    errores.push("El nombre es obligatorio");
  }

  if (data.para_llevar === true) {
    if (!data.direccion || data.direccion.trim() === "") {
      errores.push("La dirección es obligatoria");
    }
    if (!data.telefono || data.telefono.trim() === "") {
      errores.push("El teléfono es obligatorio");
    }
  }

  if (data.para_llevar === false) {
    if (!data.mesa || isNaN(Number(data.mesa))) {
      errores.push("La mesa es obligatoria y debe ser un número");
    }
  }

  if (typeof data.para_llevar !== "boolean") {
    errores.push("El campo 'para llevar' debe ser verdadero o falso");
  }

  if (!data.id_usuario) {
    errores.push(
      "El ID de usuario es obligatorio, si no lo tienes borra tus cookies y vuelve a iniciar sesión"
    );
  }

  if (!data.pedido || data.pedido.trim() === "" || data.pedido.length < 8) {
    errores.push(
      "El pedido es obligatorio, Por favor, contacta con tu administrador."
    );
  }

  if (!data.listaPedidos || data.listaPedidos.length === 0) {
    errores.push("Lista de pedidos vacía, debes agregar al menos un producto");
  }

  return errores;
}
