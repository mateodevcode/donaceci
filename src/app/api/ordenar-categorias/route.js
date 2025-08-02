import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import Categoria from "@/models/categoria";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    await connectMongoDB();

    const categorias = await req.json();

    const collection = mongoose.connection.collection("categorias");

    const operations = categorias.map((cat) => ({
      updateOne: {
        filter: { _id: new ObjectId(cat._id) },
        update: { $set: { position: cat.position } },
      },
    }));

    await collection.bulkWrite(operations);

    const updatedCategorias = await Categoria.find();

    return NextResponse.json(
      {
        message: "Categorías reordenadas correctamente.",
        categorias: updatedCategorias,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reordenando categorías:", error);
    return NextResponse.json(
      { error: "Error al reordenar categorías" },
      { status: 500 }
    );
  }
}
