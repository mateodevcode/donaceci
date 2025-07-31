import Link from "next/link";

const DescubreLaCarta = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mb- md:mb-0">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 flex flex-col items-center justify-center my-20">
        <span className="text-3xl md:text-5xl text-center text-white my-4 px-10 font-hurricane">
          Restaurante de comida gourmet y artesanal!
        </span>
        <h2 className="text-8xl md:text-9xl text-center mb-8 font-divertida text-white">
          Doña Ceci
        </h2>
        <Link
          href="/menu"
          className="bg-[#eec802] hover:bg-[#eec802]/50 text-amber-900 font-medium px-4 py-2 my-4 cursor-pointer select-none active:scale-95 transition-colors duration-300 animate-bounce 2xl:mb-20 mb-0"
        >
          Descubre nuestro menú
        </Link>
      </div>
    </div>
  );
};

export default DescubreLaCarta;
