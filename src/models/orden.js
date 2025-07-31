import { Schema, model, models } from "mongoose";

const itemSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    default: "",
  },
  descripcion: {
    type: String,
    default: "",
  },
  insumos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Productos",
    },
  ],
});

const pedidoSchema = new Schema({
  pedido: {
    type: String,
    required: true,
  },
  items: [itemSchema],
  total: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    default: "pendiente",
    enum: ["pendiente", "enviado", "entregado", "cancelado"],
  },
});

const ordenSchema = new Schema(
  {
    pedido: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      default: "",
    },
    direccion: {
      type: String,
      default: "",
    },
    mesa: {
      type: String,
      default: "",
    },
    total: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      default: "pendiente",
      enum: ["pendiente", "cancelado", "terminado"],
    },
    listaPedidos: [pedidoSchema],
    para_llevar: {
      type: Boolean,
      default: false,
    },
    id_usuario: {
      type: String,
      default: "",
    },
    cuenta_solicitada: {
      type: Boolean,
      default: false,
    },
    detalles_cobro: {
      type: Object,
      default: {},
    },
    telefono: {
      type: String,
      default: "",
    },
    comentarios: {
      type: String,
      default: "",
    },
    metodo_de_pago: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Orden = models.Orden || model("Orden", ordenSchema);
export default Orden;
