// models/arqueoInventario.js
import mongoose, { Schema, models } from "mongoose";

const detalleArqueoSchema = new Schema(
  {
    productoId: { type: String, required: true },
    nombre: { type: String, required: true },
    stockSistema: { type: Number, required: true },
    stockFisico: { type: Number, required: true },
    diferencia: { type: Number, required: true },
    observacion: { type: String },
  },
  { _id: false }
);

const arqueoInventarioSchema = new Schema(
  {
    usuario: { type: String, required: true }, // nombre o ID del usuario
    detalles: [detalleArqueoSchema],
  },
  {
    timestamps: true, // createdAt y updatedAt
  }
);

const ArqueoInventario =
  models.ArqueoInventario ||
  mongoose.model("ArqueoInventario", arqueoInventarioSchema);

export default ArqueoInventario;
