"use client";

import { MainfudContext } from "@/context/MainfudContext";
import { useContext } from "react";

const BotonMenuHamburguesa = () => {
  const {
    openModalMenuHamburguesaPrincipal,
    setOpenModalMenuHamburguesaPrincipal,
  } = useContext(MainfudContext);
  return (
    <button
      className="hamburger-button flex md:hidden"
      onClick={() =>
        setOpenModalMenuHamburguesaPrincipal(!openModalMenuHamburguesaPrincipal)
      }
      aria-label="Toggle menu"
    >
      <svg
        width="40"
        height="24"
        viewBox="0 0 40 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=""
      >
        {/* Línea superior */}
        <rect
          className={`line top ${
            openModalMenuHamburguesaPrincipal ? "active" : ""
          }`}
          x="4"
          y="6"
          width="30"
          height="2"
          rx="1"
        />

        {/* Línea inferior */}
        <rect
          className={`line bottom ${
            openModalMenuHamburguesaPrincipal ? "active" : ""
          }`}
          x="4"
          y="16"
          width="30"
          height="2"
          rx="1"
        />
      </svg>
    </button>
  );
};

export default BotonMenuHamburguesa;
