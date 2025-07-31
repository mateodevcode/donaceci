import Image from "next/image";
import { BsCreditCard } from "react-icons/bs";
import { FaRegMoneyBill1 } from "react-icons/fa6";

export const metodos_de_pago = [
  {
    id: "efectivo",
    nombre: "Efectivo",
    icono: <FaRegMoneyBill1 className="text-3xl" />,
    descripcion: "Pago en efectivo al momento de la entrega",
  },
  {
    id: "nequi",
    nombre: "Nequi",
    icono: (
      <Image
        src="/metodos-pago/nequi.png"
        alt="Nequi"
        width={200}
        height={200}
        className="w-10 h-10"
      />
    ),
    descripcion: "Pago a través de la aplicación Nequi",
  },
  {
    id: "tarjeta_debito",
    nombre: "Tarjeta débito",
    icono: <BsCreditCard className="text-3xl" />,
    descripcion: "Pago con tarjeta de débito al momento de la entrega",
  },
  {
    id: "tarjeta_credito",
    nombre: "Tarjeta crédito",
    icono: <BsCreditCard className="text-3xl" />,
    descripcion: "Pago con tarjeta de credito al momento de la entrega",
  },
];
