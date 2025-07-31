export const cuentasContables = {
  activos: [
    { cuenta: "1105", nombre: "Caja general" }, // Dinero en efectivo disponible en el local
    { cuenta: "1110", nombre: "Bancos" }, // Dinero disponible en cuentas corrientes
    { cuenta: "1115", nombre: "Cuentas de ahorro" }, // Ahorros que tiene la empresa
    { cuenta: "1120", nombre: "Tarjetas por cobrar (POS)" }, // Ventas pagadas con tarjeta, aún no abonadas por el banco
    { cuenta: "1305", nombre: "Clientes" }, // Clientes que deben dinero (fiado, empresas, eventos)
    { cuenta: "1355", nombre: "Anticipos y avances entregados" }, // Pagos adelantados a proveedores o empleados
    { cuenta: "1435", nombre: "Inventario de alimentos" }, // Valor de los alimentos disponibles para la venta
    { cuenta: "1450", nombre: "Inventario de bebidas" }, // Valor de las bebidas disponibles para la venta
    { cuenta: "1490", nombre: "Otros inventarios" }, // Otros productos como servilletas, empaques, etc.
  ],
  pasivos: [
    { cuenta: "2205", nombre: "Proveedores" }, // Deudas con proveedores de alimentos, bebidas, etc.
    { cuenta: "2365", nombre: "Obligaciones laborales" }, // Salarios y prestaciones por pagar
    { cuenta: "2380", nombre: "Retenciones en la fuente por pagar" }, // Impuestos retenidos a terceros aún no pagados
    { cuenta: "2408", nombre: "IVA por pagar" }, // IVA cobrado en ventas que se debe pagar a la DIAN
    { cuenta: "2424", nombre: "Propinas por pagar" }, // Propinas que se deben entregar a los empleados
    { cuenta: "2505", nombre: "Acreedores varios" }, // Otras deudas menores con terceros
  ],
  ingresos: [
    { cuenta: "4135", nombre: "Venta de alimentos" }, // Ingreso por platos de comida vendidos
    { cuenta: "4145", nombre: "Venta de bebidas" }, // Ingreso por gaseosas, cervezas, jugos, etc.
    { cuenta: "4155", nombre: "Venta de combos o promociones" }, // Combos de alimentos y bebidas a precio especial
    { cuenta: "4205", nombre: "Otros ingresos operacionales" }, // Ingresos por domiciliarios, alquiler de espacios, etc.
    { cuenta: "4210", nombre: "Ingresos extraordinarios" }, // Ingresos no frecuentes como venta de un equipo
    { cuenta: "4215", nombre: "Propinas recibidas" }, // Propinas pagadas por los clientes
    { cuenta: "4175", nombre: "Ingresos por sobrante en caja" }, // Dinero extra encontrado al cerrar caja
  ],
  egresos: [
    { cuenta: "5105", nombre: "Gastos de personal" }, // Sueldos, prestaciones, seguridad social
    { cuenta: "5120", nombre: "Gastos de arriendo" }, // Arriendo del local
    { cuenta: "5130", nombre: "Servicios públicos" }, // Luz, agua, gas, internet
    { cuenta: "5140", nombre: "Gastos de aseo y cafetería" }, // Jabones, traperos, café para el personal
    { cuenta: "5150", nombre: "Compras de alimentos" }, // Compra de carne, arroz, verduras, etc.
    { cuenta: "5160", nombre: "Compras de bebidas" }, // Compra de cervezas, gaseosas, jugos, etc.
    { cuenta: "5170", nombre: "Mantenimiento de equipos" }, // Reparaciones de neveras, hornos, POS, etc.
    { cuenta: "5180", nombre: "Publicidad y mercadeo" }, // Facebook Ads, volantes, diseño gráfico
    { cuenta: "5190", nombre: "Papelería y útiles" }, // Facturas, libretas, marcadores, etc.
    { cuenta: "5195", nombre: "Gastos varios" }, // Pequeños gastos no clasificados en otras cuentas
    { cuenta: "5210", nombre: "Pago de propinas" }, // Pago de propinas recibidas a los empleados
    { cuenta: "5220", nombre: "Comisiones bancarias" }, // Cargos por uso de datáfono o transacciones
    { cuenta: "5235", nombre: "Transporte y domicilio" }, // Mototaxistas o domiciliarios externos
    { cuenta: "5790", nombre: "Pérdida por faltante en caja" }, // Dinero faltante en caja al cierre
  ],
  patrimonio: [
    { cuenta: "3105", nombre: "Capital social" }, // Dinero aportado por los socios
    { cuenta: "3115", nombre: "Reservas" }, // Ganancias guardadas para emergencias
    { cuenta: "3305", nombre: "Resultado del ejercicio" }, // Ganancia o pérdida neta del periodo
  ],
};
