export const normalizarOrden = (orden) => {
  if (!orden) return null;

  const todosLosItems = (orden.listaPedidos ?? []).flatMap(
    (pedido) => pedido.items ?? []
  );

  const total = todosLosItems.reduce(
    (acumulado, item) => acumulado + (item.precio ?? 0) * (item.cantidad ?? 0),
    0
  );

  const unidades = todosLosItems.reduce(
    (acumulado, item) => acumulado + (item.cantidad ?? 0),
    0
  );

  return {
    pedido: orden.pedido,
    nombre: orden.nombre,
    estado: orden.estado,
    direccion: orden.direccion,
    para_llevar: orden.para_llevar,
    items: todosLosItems,
    total,
    createdAt: orden.createdAt,
    updatedAt: orden.updatedAt,
    _id: orden._id,
    usuario: orden.id_usuario,
    unidades,
    mesa: orden.para_llevar ? null : orden.mesa,
    telefono: orden.telefono,
    comentarios: orden.comentarios,
  };
};
