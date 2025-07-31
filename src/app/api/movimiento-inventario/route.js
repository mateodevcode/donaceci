import { connectMongoDB } from "@/lib/db";
import Inventario from "@/models/inventario";
import movimientoInventario from "@/models/movimientos_inventario";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const movimientos = await movimientoInventario.find({});
    return NextResponse.json(movimientos);
  } catch (error) {
    console.error("Error fetching Movimientos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectMongoDB();

  try {
    const { items, usuario } = await request.json();

    const movimientos = await Promise.all(
      items.map(async (item) => {
        // Si el producto tiene insumos, recorrerlos y descontarlos
        if (item.insumos && item.insumos.length > 0) {
          // Registrar movimiento de insumos
          const insumoMovs = await Promise.all(
            item.insumos.map(async (insumoId) => {
              const movimiento = await movimientoInventario.create({
                productoId: insumoId,
                cantidad: item.cantidad,
                usuario,
                tipo: "salida",
                fecha: new Date(),
                motivo: `Venta - Usado en ${
                  item.nombre || "producto compuesto"
                }`,
              });

              await Inventario.findByIdAndUpdate(
                insumoId,
                {
                  $inc: { stockActual: -item.cantidad },
                  ultimoMovimiento: new Date(),
                },
                { new: true }
              );

              return movimiento;
            })
          );

          return insumoMovs;
        } else {
          // Si no tiene insumos, se descuenta como producto final
          const movimiento = await movimientoInventario.create({
            productoId: item._id,
            cantidad: item.cantidad,
            usuario,
            tipo: "salida",
            fecha: new Date(),
            motivo: "Venta directa",
          });

          await Inventario.findByIdAndUpdate(
            item._id,
            {
              $inc: { stockActual: -item.cantidad },
              ultimoMovimiento: new Date(),
            },
            { new: true }
          );

          return movimiento;
        }
      })
    );

    return NextResponse.json(
      {
        message: "Movimientos registrados correctamente",
        movimientos: movimientos.flat(), // aplanamos si hay arrays internos
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al registrar movimientos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
