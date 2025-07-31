import { AiOutlineProduct } from "react-icons/ai";
import { LiaHomeSolid } from "react-icons/lia";
import { MdDeliveryDining, MdOutlineEventAvailable } from "react-icons/md";
import { PiPicnicTable } from "react-icons/pi";
import { RiFileList3Line } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";

export const rutas_master = [
  // {
  //   nombre: "Máster Ordenes",
  //   icono: <LiaHomeSolid className="text-xl" />,
  //   ruta: "inicio",
  // },
  // {
  //   nombre: "Lista de ordenes",
  //   icono: <RiFileList3Line className="text-xl" />,
  //   ruta: "ordenes",
  // },
  // {
  //   nombre: "Delivery",
  //   icono: <MdDeliveryDining className="text-xl" />,
  //   ruta: "delivery",
  // },
  // {
  //   nombre: "Mesas",
  //   icono: <PiPicnicTable className="text-xl" />,
  //   ruta: "mesas",
  // },
  {
    nombre: "Disponibilidad",
    icono: <MdOutlineEventAvailable className="text-xl" />,
    ruta: "disponibilidad",
  },
  {
    nombre: "Productos",
    icono: <AiOutlineProduct className="text-xl" />,
    ruta: "productos",
  },
  {
    nombre: "Ordenar Categorías",
    icono: <TfiReload className="text-xl" />,
    ruta: "reordenar_categorias",
  },
  // {
  //   nombre: "Mensajes",
  //   icono: <BsChatText className="text-xl" />,
  //   ruta: "mensajes",
  // },
  // {
  //   nombre: "Configuracion",
  //   icono: <IoSettingsOutline className="text-2xl" />,
  //   ruta: "configuracion",
  // },
];

export const rutas_master_end = [
  {
    nombre: "Pagina de inicio",
    icono: <LiaHomeSolid className="text-xl" />,
    ruta: "/",
  },
  {
    nombre: "Menú",
    icono: <RiFileList3Line className="text-xl" />,
    ruta: "/menu",
  },
  // {
  //   nombre: "administración",
  //   icono: <MdDeliveryDining className="text-xl" />,
  //   ruta: "/admin",
  // },
];
