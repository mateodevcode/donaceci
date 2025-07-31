import { connectMongoDB } from "@/lib/db";
import Asiento from "@/models/asiento";
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
    const { asiento } = await request.json();

    const nuevoAsiento = await Asiento.create(asiento);

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
