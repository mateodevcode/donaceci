import { connectMongoDB } from "@/lib/db";
import Orden from "@/models/orden";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    connectMongoDB();
    const OrdenEncontrada = await Orden.findById(id);
    if (!OrdenEncontrada)
      return NextResponse.json(
        {
          message: "Orden no encontrada",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(OrdenEncontrada);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 404,
    });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    // validar orden no ete terminada
    await connectMongoDB();
    const orden = await Orden.findById(id);
    if (orden.estado === "terminado") {
      return NextResponse.json(
        { message: "La orden ya está terminada" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const ordenActualizada = await Orden.findByIdAndUpdate(id, data, {
      new: true,
    });
    return NextResponse.json(ordenActualizada);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
