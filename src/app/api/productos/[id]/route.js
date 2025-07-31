import { connectMongoDB } from "@/lib/db";
import Producto from "@/models/producto";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import Ingrediente from "@/models/ingrediente";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    connectMongoDB();
    const productoEncontrado = await Producto.findById(id);
    if (!productoEncontrado)
      return NextResponse.json(
        {
          message: "Producto no encontrada",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(productoEncontrado);
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

    const data = await request.json();
    const productoActualizado = await Producto.findByIdAndUpdate(id, data, {
      new: true,
    });
    return NextResponse.json(productoActualizado);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request) {
  await connectMongoDB();

  const { productoId } = await request.json();

  if (!productoId) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  try {
    // Obtener el producto con ingredientes
    const producto = await Producto.findById(productoId).populate(
      "ingredientes"
    );

    if (!producto) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Recorrer y eliminar cada ingrediente (imagen + documento)
    for (const ingrediente of producto.ingredientes) {
      if (ingrediente.publicId) {
        try {
          await imagekit.deleteFile(ingrediente.publicId);
        } catch (e) {
          console.warn(
            `No se pudo eliminar la imagen del ingrediente ${ingrediente._id}:`,
            e.message
          );
        }
      }

      await Ingrediente.findByIdAndDelete(ingrediente._id);
    }

    // Eliminar imagen del producto si tiene
    if (producto.publicId) {
      try {
        await imagekit.deleteFile(producto.publicId);
      } catch (e) {
        console.warn("No se pudo eliminar la imagen del producto:", e.message);
      }
    }

    // Eliminar el producto de la base de datos
    await Producto.findByIdAndDelete(productoId);

    const productos = await Producto.find({});
    const ingredientes = await Ingrediente.find({});

    return NextResponse.json(
      {
        message: "Producto e ingredientes eliminados correctamente",
        productos,
        ingredientes,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error al eliminar", details: err.message },
      { status: 500 }
    );
  }
}
