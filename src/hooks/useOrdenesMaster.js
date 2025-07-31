// hooks/useOrdeneMaster.js
import { MasterContext } from "@/context/MasterContext";
import { actualizar_orden } from "@/lib/socket/orden_socket";
import { useContext } from "react";
import { toast } from "sonner";

const useOrdenesMaster = () => {
  const { setOpenModalPedidoSeleccionado, setPedidoSeleccionadoMaster } =
    useContext(MasterContext);

  const handleCancelOrder = (orden) => {
    try {
      actualizar_orden(orden._id, { estado: "cancelado" });
      toast.success("Pedido cancelado", {
        position: "top-center",
        style: {
          background: "#DCFCE7",
          color: "#1D723D",
          borderColor: "#1D723D",
        },
      });
    } catch (error) {
      toast.error("Error al cancelar el pedido", {
        position: "top-center",
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          borderColor: "#B91C1C",
        },
      });
    }
  };

  const handleTerminarOrder = (orden) => {
    try {
      actualizar_orden(orden._id, { estado: "terminado" });
      toast.success("Orden terminada", {
        position: "top-center",
        style: {
          backgroundColor: "#34d777",
          color: "#000",
          borderColor: "#000",
        },
      });
      setOpenModalPedidoSeleccionado(false);
      setPedidoSeleccionadoMaster(null);
    } catch (error) {
      toast.error("Error al terminar el pedido", {
        position: "top-center",
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          borderColor: "#B91C1C",
        },
      });
    }
  };
  return {
    handleCancelOrder,
    handleTerminarOrder,
  };
};

export default useOrdenesMaster;
