import { connectMongoDB } from "@/lib/db";
import Orden from "@/models/orden";
import { NextResponse } from "next/server";
import { protectApi } from "@/lib/protecApi";

export async function GET(req) {
  const token = await protectApi(req);
  if (token instanceof NextResponse) return token; // <- si hubo error, responder

  try {
    await connectMongoDB();
    const ordenes = await Orden.find({});
    return NextResponse.json(ordenes);
  } catch (error) {
    console.error("Error fetching pedidos:", error);
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
      pedido,
      nombre,
      direccion,
      mesa,
      total,
      estado,
      listaPedidos,
      para_llevar,
      id_usuario,
      cuenta_solicitada,
      telefono,
      comentarios,
      metodo_de_pago, // Asegurarse de que el campo exista
    } = await request.json();

    // Crear la orden y obtener el objeto creado
    const nuevaOrden = await Orden.create({
      pedido,
      nombre,
      direccion,
      mesa,
      total,
      estado,
      listaPedidos,
      para_llevar,
      id_usuario,
      cuenta_solicitada, // Asegurarse de que el campo exista
      telefono,
      comentarios, // Asegurarse de que el campo exista
      metodo_de_pago, // Asegurarse de que el campo exista
    });

    // Devolver la nueva orden + mensaje
    return NextResponse.json(
      { message: "Pedido creado", orden: nuevaOrden },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
