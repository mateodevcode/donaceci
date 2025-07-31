import { connectMongoDB } from "@/lib/db";
import Producto from "@/models/producto";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import Ingrediente from "@/models/ingrediente";
import Categoria from "@/models/categoria";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    connectMongoDB();
    const categoriaEncontrada = await Categoria.findById(id);
    if (!categoriaEncontrada)
      return NextResponse.json(
        {
          message: "Categoria no encontrada",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(categoriaEncontrada);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 404,
    });
  }
}

// export async function PUT(request, { params }) {
//   const { id } = await params;
//   try {
//     // validar orden no ete terminada
//     await connectMongoDB();
//     const orden = await Orden.findById(id);
//     if (orden.estado === "terminado") {
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
// Asegúrate que esté bien configurado

export async function DELETE(request) {
  await connectMongoDB();

  const { categoriaId } = await request.json();

  if (!categoriaId) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  try {
    // 1. Buscar la categoría
    const categoria = await Categoria.findById(categoriaId);

    if (!categoria) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    const nombreFormateado = categoria.nombreFormateado;

    // 2. Buscar todos los productos que tienen esa categoría
    const productos = await Producto.find({
      categoria: nombreFormateado,
    }).populate("ingredientes");

    // 3. Eliminar ingredientes e imágenes de cada producto
    for (const producto of productos) {
      // Eliminar ingredientes
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

      // Eliminar imagen del producto
      if (producto.publicId) {
        try {
          await imagekit.deleteFile(producto.publicId);
        } catch (e) {
          console.warn(
            `No se pudo eliminar la imagen del producto ${producto._id}:`,
            e.message
          );
        }
      }

      // Eliminar el producto
      await Producto.findByIdAndDelete(producto._id);
    }

    // 4. Eliminar imagen de la categoría
    if (categoria.publicId) {
      try {
        await imagekit.deleteFile(categoria.publicId);
      } catch (e) {
        console.warn(
          `No se pudo eliminar la imagen de la categoría ${categoria._id}:`,
          e.message
        );
      }
    }

    // 5. Eliminar la categoría
    await Categoria.findByIdAndDelete(categoriaId);

    const ingredientes = await Ingrediente.find({});
    const productosActualizados = await Producto.find({});
    const categorias = await Categoria.find({});

    return NextResponse.json(
      {
        message: "Categoría, productos e ingredientes eliminados correctamente",
        ingredientes,
        productos: productosActualizados,
        categorias,
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
