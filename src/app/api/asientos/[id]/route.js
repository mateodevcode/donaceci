import { connectMongoDB } from "@/lib/db";
import Asiento from "@/models/asiento";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    connectMongoDB();
    const asientoEncontrado = await Asiento.findById(id);
    if (!asientoEncontrado)
      return NextResponse.json(
        {
          message: "Asiento no encontrado",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(asientoEncontrado);
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
//     const asiento = await Asiento.findById(id);
//     if (asiento.estado === "terminado") {
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

// export async function DELETE(request, { params }) {
//   await connectMongoDB();
//   try {
//     const PeliculaEliminada = await Pelicula.findByIdAndDelete(params.id);
//     if (!PeliculaEliminada) {
//       return NextResponse.json({ message: "Pelicula no encontrada" }, { status: 404 });
//     }
//     return NextResponse.json({ message: "La Pelicula se ha eliminado con éxito" });
//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
