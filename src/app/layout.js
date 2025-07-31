import {
  Ephesis,
  Geist,
  Geist_Mono,
  Hurricane,
  Pinyon_Script,
  Roboto_Mono,
} from "next/font/google";
import { Delius_Swash_Caps, Spicy_Rice } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { MainfudProvider } from "@/context/MainfudContext";
import { AuthProvider } from "./Providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});
// Nuevas fuentes
const deliusSwashCaps = Delius_Swash_Caps({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delius-swash-caps",
});

const spicyRice = Spicy_Rice({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-spicy-rice",
});

const hurricane = Hurricane({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hurricane",
});

const ephesis = Ephesis({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ephesis",
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon-script",
  display: "swap",
});

export const metadata = {
  title: "Doña Ceci - Comida Gourmet y Empanadas Artesanales",
  description:
    "Doña Ceci es un restaurante ubicado en Sabanalarga, Atlántico, especializado en comida gourmet y empanadas artesanales hechas con ingredientes frescos y sabores auténticos. Vive una experiencia culinaria única y tradicional.",
  keywords:
    "Doña Ceci, restaurante, comida gourmet, empanadas artesanales, Sabanalarga, Atlántico, gastronomía, cocina colombiana, empanadas, sabores tradicionales, comida artesanal, cocina gourmet, restaurante en Sabanalarga, comida típica, empanadas caseras",
  authors: [
    {
      name: "Seventwo Technologies",
      url: "https://seventwo.tech",
    },
  ],
  creator: "Seventwo Technologies",
  publisher: "Seventwo Technologies",
  robots: "index, follow",
  icons: {
    icon: "/logo/favicon.ico",
    shortcut: "/logo/favicon.ico",
  },
  metadataBase: new URL("https://doñaaceci.com"), // cámbialo por tu dominio real
  openGraph: {
    title: "Doña Ceci - Comida Gourmet y Empanadas Artesanales",
    description:
      "Sabores auténticos de la región en cada bocado. Descubre Doña Ceci en Sabanalarga, Atlántico.",
    url: "https://doñaceci.com", // cámbialo por tu dominio real
    siteName: "Doña Ceci",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Doña Ceci Restaurante",
      },
    ],
    locale: "es-ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doña Ceci - Restaurante de Comida Gourmet",
    description:
      "Restaurante de comida gourmet y empanadas artesanales en Sabanalarga, Atlántico.",
    images: ["https://doñaceci.com/og-image.png"], // cámbialo por tu dominio real
    creator: "@donaceci", // si tienes una cuenta de Twitter para el restaurante
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Google Maps JS API con Web Components */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=maps,marker&v=beta&loading=async`}
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${roboto_mono.variable}
        ${deliusSwashCaps.variable}
        ${spicyRice.variable}
        ${hurricane.variable}
        ${ephesis.variable}
        ${pinyonScript.variable}
        
      `}
      >
        <AuthProvider>
          <MainfudProvider>
            {children}

            <Toaster />
          </MainfudProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
