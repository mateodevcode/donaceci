import Image from "next/image";
import Link from "next/link";

const BannerPublicitario = () => {
  return (
    <div className="w-full relative">
      <div className="absolute -top-1 flex items-center justify-center rotate-180 w-full z-10">
        <Image
          src={"/divisor/divisor.png"}
          alt={"divisor"}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full">
        <Image
          src={"/banner/BannerLocal2.jpg"}
          alt={"Banner Publicitario"}
          width={1920}
          height={1080}
          className="w-full h-[450px] md:h-[600px] lg:h-[800px] object-cover"
        />
        <div className="bg-black/50 absolute inset-0 w-full h-full">
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-lg md:text-2xl text-[#eec802]/80 font-roboto">
              Deliciosos Platillos
            </span>
            <h2 className="text-4xl md:text-6xl text-white font-extrabold mb-4 w-full md:w-[50%] text-center mt-2">
              ¡Disfruta de nuestra comida gourmet y artesanal!
            </h2>
            <p className="text-base md:text-lg text-white mb-6 font-roboto text-center w-10/12 mt-2">
              Sabores únicos y frescos, hechos con amor.
            </p>
            <Link
              href="/menu"
              className="bg-[#eec802] hover:bg-[#eec802]/50 text-amber-900 font-medium px-6 py-3 cursor-pointer select-none active:scale-95 transition-colors duration-300"
            >
              ¡Ordena ahora!
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center w-full z-10">
        <Image
          src={"/divisor/divisor.png"}
          alt={"divisor"}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default BannerPublicitario;
