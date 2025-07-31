"use client";

import { formatoDinero } from "@/utils/formatoDinero";
import Image from "next/image";
import { useState } from "react";

export default function Pedidos({ ordenCompleta }) {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="w-full">
      {ordenCompleta?.listaPedidos.map((item, index) => (
        <div key={index} className={`border-b-[1px] border-zinc-100`}>
          <button
            onClick={() => toggleItem(item._id)}
            className="w-full px-2 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <svg
                className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 transition-transform duration-200 ${
                  openItem === item._id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span className="text-sm md:text-base font-semibold">
                {item.pedido}
              </span>
            </div>
            <span className="font-semibold text-sm md:text-base">
              {formatoDinero(item.total)}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openItem === item._id
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-4 text-black text-sm leading-relaxed space-y-1">
              {/* {item.content} */}
              {item?.items.map((pedido, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-1 text-sm w-full md:px-4 py-2 pr-2 select-none`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={pedido.image || "/productos/empanada.png"}
                      alt={pedido.nombre || "Empanada"}
                      width={50}
                      height={50}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="text-xs bg-[#eec802] text-black p-1 flex items-center gap-1 -ml-5 rounded-full">
                      <span>x</span>{" "}
                      <span className="font-semibold">{pedido.cantidad}</span>
                    </div>
                    <span className="text-xs md:text-sm font-roboto">
                      {pedido.nombre}
                    </span>
                  </div>
                  <span className="text-black font-semibold text-xs md:text-sm">
                    {formatoDinero(pedido.precio)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
