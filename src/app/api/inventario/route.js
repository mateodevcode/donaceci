import { connectMongoDB } from "@/lib/db";
import Inventario from "@/models/inventario";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const inventario = await Inventario.find({});
    return NextResponse.json(inventario);
  } catch (error) {
    console.error("Error fetching Inventario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectMongoDB();

  try {
    const { _id, stockActual, stockMinimo, ultimoArqueo, ultimoMovimiento } =
      await request.json();

    // Crear la orden y obtener el objeto creado
    const nuevoProductoInventario = await Inventario.create({
      _id,
      stockActual,
      stockMinimo,
      ultimoArqueo,
      ultimoMovimiento,
    });

    // Devolver la nueva orden + mensaje
    return NextResponse.json(
      {
        message: "Se ha añadido al inventario",
        inventario: nuevoProductoInventario,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al añadir al inventario", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
