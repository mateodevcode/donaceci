import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const Section2 = ({ setAbrirVideo }) => {
  const tipos_empanadas = [
    "Crepe Carbonara",
    "Pastas con Camarones",
    "Lengua en Salsa",
    "Pechuga con Champiñones",
    "Lomo a la pimienta",

  ];

  return (
    <div className="w-full lg:w-5/12 h-auto flex flex-col md:mb-16 2xl:mb-32 md:mt-1">
      <span className="text-4xl font-roboto">
        Diversos tipos de platos{" "}
        <span className="text-[#965511]">gourmet.</span>
        <br />
        <span className="text-2xl font-semibold text-[#965511]">
          ¡ven a probarlos!
        </span>
      </span>
      <p className="mt-5 font-roboto">
        El lugar ideal para disfrutar de unos deliciosos platillos gourmet,
        con una variedad de sabores que te harán sentir una explosión de sabores.
      </p>
      {/* <ul className="mt-5 font-roboto">
        {tipos_empanadas.map((empanada, index) => (
          <li key={index} className="flex items-center gap-2">
            <Image
              src={"/icon/empanada.png"}
              alt="empanada"
              width={50}
              height={50}
              className="w-8"
            />
            <span className="font-semibold text-[#965511]">{empanada}</span>
          </li>
        ))}
      </ul> */}
      <Link
        href="/nosotros"
        className="bg-[#eec802] hover:bg-[#eec802]/50 text-amber-900 font-medium px-4 py-2 my-4 cursor-pointer select-none w-32 active:scale-95 transition-colors duration-300 text-center"
      >
        Saber Más
      </Link>
      <div
        className="relative"
        onClick={(e) => {
          e.stopPropagation();
          setAbrirVideo(true);
        }}
      >
        <Image
          src="/section/section2-dona-ceci.png"
          alt="Empanadas"
          width={500}
          height={500}
          className="w-full object-cover mt-5"
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black bg-[#eec802]/50  p-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#eec802] transition-colors active:scale-95 duration-300"
          onClick={() => setAbrirVideo(true)}
        >
          <FaPlay className="text-5xl pl-2" />
        </div>
      </div>
    </div>
  );
};

export default Section2;
