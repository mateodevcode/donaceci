"use client";

import { BiSolidPhoneCall } from "react-icons/bi";
import { TbMailFilled } from "react-icons/tb";
import Logo from "../logo/Logo";
import { datosDonaCeci } from "@/data/donaceci";
import BotonMenuHamburguesa from "./BotonMenuHamburguesa";

const Header = () => {
  const phoneNumber = "+573225248703";
  const email = "congeladosdonaceci@gmail.com";
  const subject = "Información sobre Dona Ceci";
  const body = "Hola, me gustaría obtener más información.";

  const handleEmail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <div className="flex justify-between items-center pt-6 w-11/12 md:w-10/12 lg:w-8/12 font-roboto">
        <div
          className="hidden md:flex items-center gap-2 text-white w-80 justify-start cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75"
          onClick={handleCall}
        >
          <div className="w-8 h-8 bg-[#eec802] rounded-full flex items-center justify-center">
            <BiSolidPhoneCall className="w-4 h-4 text-amber-800" />
          </div>
          <div>
            <span className="text-sm">Teléfono:</span>
            <div className="font-medium">{datosDonaCeci.telefono}</div>
          </div>
        </div>

        <div className="items-center gap-2 text-white justify-between md:justify-center md:w-60 w-full flex md:hidden lg:flex">
          <BotonMenuHamburguesa />
          <Logo />
        </div>

        <div
          className="hidden md:flex items-center gap-2 text-white w-80 justify-end cursor-pointer hover:text-[#eec802] transition-colors active:scale-95 duration-75"
          onClick={handleEmail}
        >
          <div className="text-right">
            <span className="text-sm">Email:</span>
            <div className="font-medium">{datosDonaCeci.email}</div>
          </div>
          <div className="w-8 h-8 bg-[#eec802] rounded-full flex items-center justify-center">
            <TbMailFilled className="w-4 h-4 text-amber-800" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
