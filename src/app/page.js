import BannerPublicitario from "@/components/home/banner/BannerPublicitario";
import BotonWhatsapp from "@/components/botonFlotante/BotonWhatsapp";
import FlayerPublicitario from "@/components/flayer-publicitario/FlayerPublicitario";
import Footer from "@/components/home/footer/Footer";
import Restaurante from "@/components/home/restaurante/Restaurante";
import TiposDeEmpanadas from "@/components/home/tipos-empanadas/TiposDeEmpanadas";
import Principal from "@/components/home/principal/Principal";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full text-black">
      <Principal />
      <Restaurante />
      <BannerPublicitario />
      <TiposDeEmpanadas />
      <Footer />
      <BotonWhatsapp />
      {/* <FlayerPublicitario /> */}
    </div>
  );
}
