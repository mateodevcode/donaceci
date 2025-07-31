import Link from "next/link";

const AvisoFooter = () => {
  return (
    <div className="bg-black py-4 z-30 w-full">
      <div className="w-full">
        <div className="flex justify-center items-center gap-6 text-white text-xs md:text-sm">
          <Link
            href="/politicas-de-privacidad"
            className="hover:text-[#eec802] transition-colors"
          >
            Política de Privacidad
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            href="/politicas-de-privacidad#section-3"
            className="hover:text-[#eec802] transition-colors"
          >
            Política de Cookies
          </Link>
          <span className="text-gray-500 hidden md:flex">|</span>
          <Link
            href="/politicas-de-privacidad"
            className="hover:text-[#eec802] transition-colors hidden md:flex"
          >
            Aviso Legal
          </Link>
          {/* <span className="text-gray-500">|</span>
          <Link href="#" className="hover:text-[#eec802] transition-colors">
            Declaración de accesibilidad
          </Link>
          <span className="text-gray-500">|</span>
          <Link href="#" className="hover:text-[#eec802] transition-colors">
            Mapa del sitio
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default AvisoFooter;
