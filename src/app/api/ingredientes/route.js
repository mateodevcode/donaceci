import { connectMongoDB } from "@/lib/db";
import Ingrediente from "@/models/ingrediente";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const ingredientes = await Ingrediente.find({});
    return NextResponse.json(ingredientes);
  } catch (error) {
    console.error("Error fetching ingredientes:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectMongoDB();

  try {
    const { nombre, cantidad, imagen, publicId } = await request.json();

    // Crear la orden y obtener el objeto creado
    const nuevoIngrediente = await Ingrediente.create({
      nombre,
      cantidad,
      imagen,
      publicId,
    });

    return NextResponse.json(
      { message: "Ingrediente creado", producto: nuevoIngrediente },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear el ingrediente:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
