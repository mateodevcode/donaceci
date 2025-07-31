import { connectMongoDB } from "@/lib/db";
import Producto from "@/models/producto";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const productos = await Producto.find({});
    return NextResponse.json(productos);
  } catch (error) {
    console.error("Error fetching productos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectMongoDB();

  try {
    const {
      nombre,
      precio,
      image,
      publicId,
      categoria,
      descripcion,
      ingredientes,
    } = await request.json();

    // Crear la orden y obtener el objeto creado
    const nuevoProducto = await Producto.create({
      nombre,
      precio,
      image,
      publicId,
      categoria,
      descripcion,
      ingredientes,
    });

    // Devolver la nueva orden + mensaje
    return NextResponse.json(
      { message: "producto creado", producto: nuevoProducto },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
