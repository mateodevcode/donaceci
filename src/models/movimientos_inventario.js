import mongoose, { models, Schema } from "mongoose";

const movimientoInventarioSchema = new Schema(
  {
    productoId: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["entrada", "salida", "ajuste"],
    },
    cantidad: {
      type: Number,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    motivo: {
      type: String,
      required: true,
    },
    usuario: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // crea createdAt y updatedAt automáticamente
  }
);

const movimientoInventario =
  models.movimientoInventario ||
  mongoose.model("movimientoInventario", movimientoInventarioSchema);

export default movimientoInventario;
