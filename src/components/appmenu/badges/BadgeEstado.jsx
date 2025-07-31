const BadgeEstado = ({ estado }) => {
  const getBadgeStyles = () => {
    switch (estado) {
      case "pendiente":
        return "border-amber-400 bg-amber-400 text-white";
      case "terminado":
        // return "border-green-500 bg-green-200 text-green-500";
        return "bg-green-600 text-white border-green-600";
      case "cancelado":
        return "border-red-600 bg-red-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <span
      className={`text-xs font-semibold px-4 py-1 rounded-full border-[1px] select-none ${getBadgeStyles()}`}
    >
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </span>
  );
};

export default BadgeEstado;
