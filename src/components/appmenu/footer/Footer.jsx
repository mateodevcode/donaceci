import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-32 shadow-lg flex flex-col items-center justify-end bg-amber-50 dark:bg-slate-950 pb-2">
      <p className="text-gray-600 dark:text-gray-300 text-xs">
        © 2025 Doña Ceci.
      </p>
      <span className="text-xs mt-2 text-zinc-800 dark:text-zinc-200">
        Desarrollado por <strong>seventwo</strong>
      </span>
    </div>
  );
};

export default Footer;
