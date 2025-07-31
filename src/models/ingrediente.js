import mongoose, { models, Schema } from "mongoose";

const ingredienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    cantidad: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ingrediente =
  models.Ingrediente || mongoose.model("Ingrediente", ingredienteSchema);
export default Ingrediente;
