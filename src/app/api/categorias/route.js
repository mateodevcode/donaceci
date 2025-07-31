import { connectMongoDB } from "@/lib/db";
import Categoria from "@/models/categoria";
import { formatearNombre } from "@/utils/formatearNombre";
import { formatearNombreMayus } from "@/utils/formatearNombreMayus";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const categorias = await Categoria.find({});
    return NextResponse.json(categorias);
  } catch (error) {
    console.error("Error al crear una categoria", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectMongoDB();

  try {
    const { nombre, imagen, publicId } = await request.json();
    const catt = await Categoria.find({});
    const lonCatt = catt.length;

    // Crear la orden y obtener el objeto creado
    const nuevaCategoria = await Categoria.create({
      nombre: formatearNombreMayus(nombre),
      publicId,
      imagen,
      nombreFormateado: formatearNombre(nombre),
      position: lonCatt + 1,
    });

    // Devolver la nueva orden + mensaje
    return NextResponse.json(
      { message: "Categoria creada", categoria: nuevaCategoria },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la categoria:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
