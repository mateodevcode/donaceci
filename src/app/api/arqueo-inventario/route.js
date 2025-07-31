import { connectMongoDB } from "@/lib/db";
import ArqueoInventario from "@/models/arqueoInventario";
import Inventario from "@/models/inventario";
import movimientoInventario from "@/models/movimientos_inventario";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const arqueo = await ArqueoInventario.find({});
    return NextResponse.json(arqueo);
  } catch (error) {
    console.error("Error fetching Inventario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectMongoDB();

  try {
    const { usuario, detalles } = await request.json();

    const arqueo = ArqueoInventario.create({
      usuario,
      detalles,
    });

    for (const item of detalles) {
      const { productoId, stockFisico, stockSistema, observacion } = item;

      // Si hay diferencia, actualizamos el stock y registramos movimiento
      if (stockFisico !== stockSistema) {
        const diferencia = stockFisico - stockSistema;

        // Actualiza inventario
        await Inventario.findByIdAndUpdate(productoId, {
          stockActual: stockFisico,
          ultimoArqueo: new Date(),
        });

        // Crea movimiento de ajuste
        await movimientoInventario.create({
          productoId,
          tipo: "ajuste",
          cantidad: Math.abs(diferencia),
          motivo: `Ajuste por arqueo (${observacion || "sin observación"})`,
          usuario,
        });
      } else {
        await Inventario.findByIdAndUpdate(productoId, {
          ultimoArqueo: new Date(),
        });
      }
    }

    // Devolver la nueva orden + mensaje
    return NextResponse.json(
      {
        message: "Arqueo de inventario registrado correctamente",
        arqueo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al registrar el arqueo", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
