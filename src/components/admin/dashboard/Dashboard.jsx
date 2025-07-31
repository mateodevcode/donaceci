import React from "react";
import CuadroResumen from "./CuadroResumen";
import Graficas from "./Graficas";
import TablaOrdenes from "./tablaOrdenes/TablaOrdenes";

const Dashboard = ({ ordenes }) => {
  return (
    <>
      <CuadroResumen ordenes={ordenes} />
      {/* Chart */}
      <Graficas ordenes={ordenes} />
      {/* resumen de pedidos */}
      <TablaOrdenes ordenes={ordenes} />
    </>
  );
};

export default Dashboard;
