import { connectMongoDB } from "@/lib/db";
import Inventario from "@/models/inventario";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    connectMongoDB();
    const productoInventario = await Inventario.findById(id);
    if (!productoInventario)
      return NextResponse.json(
        {
          message: "Producto no encontrado en el inventario",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(productoInventario);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 404,
    });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    await connectMongoDB();
    const productoInventario = await Inventario.findById(id);
    if (!productoInventario) {
      return NextResponse.json(
        { message: "El producto no exite en el inventario" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const productoInventarioActualizado = await Inventario.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
    return NextResponse.json(productoInventarioActualizado);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    connectMongoDB();
    const productoInventario = await Inventario.findByIdAndDelete(id);
    if (!productoInventario)
      return NextResponse.json(
        {
          message: "Producto no encontrado en el inventario",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(
      { message: "Producto eliminado del inventario" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 404,
    });
  }
}
