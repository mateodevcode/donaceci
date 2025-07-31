import { connectMongoDB } from "@/lib/db";
import Asiento from "@/models/asiento";
import Orden from "@/models/orden";
import { convertirPedidoAAsiento } from "@/utils/contabilidad/convertirPedidosAsiento";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const asientos = await Asiento.find({});
    return NextResponse.json(asientos);
  } catch (error) {
    console.error("Error fetching Asientos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectMongoDB();

  try {
    const { orden } = await request.json();

    // 1. Buscar el pedido
    const pedido = await Orden.findById(orden._id);
    if (!pedido) {
      return NextResponse.json(
        { error: "Pedido no encontrado" },
        { status: 404 }
      );
    }

    // 2. Convertir pedido en asiento contable y obtener detalles de cobro
    const asiento = convertirPedidoAAsiento(pedido); // Usa la función que ya hiciste

    // 3. Guardar los detalles de cobro en el pedido
    await Orden.findByIdAndUpdate(orden._id, {
      detalles_cobro: asiento.detalles_cobro, // ← Usa los valores ya calculados
    });

    // 4. Crear el asiento en la colección "asientos"
    const nuevoAsiento = await Asiento.create({
      fecha: asiento.fecha,
      detalle: asiento.detalle,
      movimientos: asiento.movimientos,
    });

    return NextResponse.json(
      {
        message: "Asiento creado y pedido actualizado",
        asiento: nuevoAsiento,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear asiento y actualizar pedido:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
