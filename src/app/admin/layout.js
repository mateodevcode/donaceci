import { AdminProvider } from "@/context/AdminContext";

export const metadata = {
  title: "Panel de Administración | Doña Ceci.",
  description: "Panel de administración de Doña Ceci.",
};

export default function RootLayout({ children }) {
  return <AdminProvider>{children}</AdminProvider>;
}
