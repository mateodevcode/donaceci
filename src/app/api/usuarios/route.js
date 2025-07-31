import { connectMongoDB } from "@/lib/db";
import Usuario from "@/models/usuario";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongoDB();

  const usuarios = await Usuario.find({});
  return NextResponse.json(usuarios);
}

export async function POST(request) {
  await connectMongoDB();

  try {
    const {
      name,
      email,
      password,
      imageUrl,
      direccion,
      telefono,
      publicId,
      estado,
      intentosFallidos,
      bloqueado,
      codigoVerificacion,
      dateCodigoVerificacion,
      id_ordenes_almacenadas,
      rol,
      cargo,
    } = await request.json();

    // Crear la orden y obtener el objeto creado
    const nuevoUsuario = await Usuario.create({
      name,
      email,
      password,
      imageUrl,
      direccion,
      telefono,
      publicId,
      estado,
      intentosFallidos,
      bloqueado,
      codigoVerificacion,
      dateCodigoVerificacion,
      id_ordenes_almacenadas,
      rol,
      cargo,
    });

    // Devolver la nueva orden + mensaje
    return NextResponse.json(
      { message: "Usuario creado", usuario: nuevoUsuario },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
