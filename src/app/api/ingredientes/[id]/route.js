import { connectMongoDB } from "@/lib/db";
import Ingrediente from "@/models/ingrediente";
import Producto from "@/models/producto";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    connectMongoDB();
    const ingredienteEncontrado = await Ingrediente.findById(id);
    if (!ingredienteEncontrado)
      return NextResponse.json(
        {
          message: "Ingreidente no encontrado",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(ingredienteEncontrado);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 404,
    });
  }
}

// export async function PUT(request, { params }) {
//   const { id } = await params;
//   try {
//     await connectMongoDB();
//     const ingrediente = await Ingrediente.findById(id);
//     if (ingrediente.estado === "terminado") {
//       return NextResponse.json(
//         { message: "La orden ya está terminada" },
//         { status: 400 }
//       );
//     }

//     const data = await request.json();
//     const ordenActualizada = await Orden.findByIdAndUpdate(id, data, {
//       new: true,
//     });
//     return NextResponse.json(ordenActualizada);
//   } catch (error) {
//     return NextResponse.json(error.message, {
//       status: 400,
//     });
//   }
// }

export async function DELETE(request) {
  await connectMongoDB();

  const { ingredienteId, productoId } = await request.json();

  if (!ingredienteId || !productoId) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  try {
    const ingrediente = await Ingrediente.findById(ingredienteId);

    if (!ingrediente) {
      return NextResponse.json(
        { error: "Ingrediente no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar imagen de ImageKit
    if (ingrediente.publicId) {
      try {
        await imagekit.deleteFile(ingrediente.publicId);
      } catch (e) {
        console.warn("No se pudo eliminar la imagen:", e.message);
      }
    }

    // Eliminar el ingrediente de la base de datos
    await Ingrediente.findByIdAndDelete(ingredienteId);

    // Eliminar referencia del ingrediente en el producto
    await Producto.findByIdAndUpdate(productoId, {
      $pull: { ingredientes: ingredienteId },
    });

    return NextResponse.json(
      { message: "Ingrediente eliminado correctamente" },
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
