import Footer from "@/components/home/footer/Footer";
import Principal from "@/components/home/principal/Principal";
import GaleriaImg from "@/components/nosotros/GaleriaImg";

const page = () => {
  return (
    <div>
      <Principal fondo={"/principal/fondo-5.png"} />
      <GaleriaImg />
      <Footer />
    </div>
  );
};

export default page;
