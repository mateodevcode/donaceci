import { MasterProvider } from "@/context/MasterContext";

export const metadata = {
  title: "Máster de ordenes | Doña Ceci.",
  description: "Máster de ordenes de Doña Ceci.",
};

export default function RootLayout({ children }) {
  return <MasterProvider>{children}</MasterProvider>;
}
