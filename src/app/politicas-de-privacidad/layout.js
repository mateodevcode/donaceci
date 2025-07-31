import Footer from "@/components/home/footer/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Política de Privacidad | Doña Ceci.",
  description: "Política de privacidad de Doña Ceci.",
};

export default function RootLayout({ children }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
