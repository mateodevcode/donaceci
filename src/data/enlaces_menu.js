import { BsFillPersonFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { LuQrCode, LuSettings2 } from "react-icons/lu";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { RiFileList3Line, RiFileListLine } from "react-icons/ri";

export const enalces = [
  {
    icon: <MdOutlineRestaurantMenu />,
    text: "Menú",
  },
  {
    icon: <BsFillPersonFill />,
    text: "Perfil",
  },
  {
    icon: <RiFileList3Line />,
    text: "Pedido",
  },
  {
    icon: <RiFileListLine />,
    text: "Historial de Pedidos",
  },
  {
    icon: <IoWalletOutline />,
    text: "Pagos",
  },
  {
    icon: <LuSettings2 />,
    text: "Configuración",
  },
  // {
  //   icon: <LuQrCode />,
  //   text: "Escanear QR",
  // },
  {
    icon: <FaCommentDots />,
    text: "Soporte",
  },
];
