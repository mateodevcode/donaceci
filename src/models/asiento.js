import mongoose, { models, Schema } from "mongoose";

const MovimientoSchema = new Schema(
  {
    cuenta: String,
    nombre: String,
    debe: Number,
    haber: Number,
  },
  { _id: false }
);

const AsientoSchema = new Schema(
  {
    fecha: String,
    detalle: String,
    movimientos: [MovimientoSchema],
  },
  {
    timestamps: true,
  }
);

const Asiento = models.Asiento || mongoose.model("Asiento", AsientoSchema);
export default Asiento;
