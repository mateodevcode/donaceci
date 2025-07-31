"use client";
import { datosDonaCeci } from "@/data/donaceci";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";

const sections = [
  { id: "intro", label: "Sobre Doña Ceci" },
  { id: "section-1", label: "¿Qué información recopilamos?" },
  { id: "section-2", label: "¿Cómo usamos tu información?" },
  { id: "section-3", label: "Uso de Cookies" },
  { id: "section-4", label: "Enlaces a otros sitios" },
  { id: "section-5", label: "Tu información, tu control" },
  { id: "section-6", label: "Seguridad y almacenamiento" },
  { id: "section-7", label: "Tus derechos" },
  { id: "section-8", label: "Cambios a esta política" },
  { id: "section-9", label: "Aceptación" },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("");
  const observerRefs = useRef([]);
  const sectionRefs = useRef({});
  const router = useRouter();

  useEffect(() => {
    observerRefs.current.forEach((observer) => observer.disconnect());
    observerRefs.current = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        sectionRefs.current[section.id] = element;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(section.id);
              }
            });
          },
          {
            rootMargin: "-10% 0px -80% 0px",
          }
        );

        observer.observe(element);
        observerRefs.current.push(observer);
      }
    });

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black md:pb-60 pb-10 pt-20 relative">
      <Link
        href="/"
        className="absolute top-10 left-10 lg:left-20 w-10 h-10 lg:w-20 lg:h-20 bg-[#eec802] flex items-center justify-center rounded-md cursor-pointer hover:bg-[#d4b600] transition-colors duration-200 z-50 active:scale-95"
      >
        <IoArrowUndoOutline className="text-2xl lg:text-4xl" />
      </Link>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Header */}
        <div className="col-span-full border-b border-white py-12">
          <h1 className="text-4xl font-bold text-center ">
            Política de Privacidad de Doña Ceci
          </h1>
        </div>

        {/* Last updated */}
        <div className="col-span-full border-b border-white py-6">
          <p className="text-center ">
            Última actualización: 13 de junio, 2025
          </p>
        </div>

        {/* Main content */}
        <div className="col-span-3 py-8 px-4 ">
          <div className="prose max-w-none">
            <div id="intro">
              <p className="">
                En Doña Ceci nos tomamos muy en serio tu privacidad. Esta
                Política de Privacidad explica cómo recopilamos, usamos,
                almacenamos y protegemos tu información cuando interactúas con
                nosotros a través de nuestras redes sociales, página web o
                canales de contacto. Te invitamos a leerla con atención y
                consultarla cada cierto tiempo, ya que puede actualizarse.
              </p>
            </div>

            <div id="section-1">
              <h2 className="text-2xl font-semibold mt-8 mb-4 ">
                1. ¿Qué información recopilamos?
              </h2>
              <p className="">
                Recopilamos información que tú mismo nos proporcionas de manera
                voluntaria, como:
              </p>
              <ul className="list-disc pl-6">
                <li>Nombre y apellidos</li>
                <li>Número de contacto o correo electrónico</li>
                <li>Dirección de entrega (si aplica)</li>
                <li>Detalles de tus pedidos o preferencias</li>
                <li>
                  Información técnica al visitar nuestra web o redes: IP, tipo
                  de navegador, tiempo de visita, etc.
                </li>
              </ul>
            </div>

            <div id="section-2">
              <h2 className="text-2xl font-semibold mt-8 mb-4 ">
                2. ¿Cómo usamos tu información?
              </h2>
              <p className="">Usamos tu información para:</p>
              <ul className="list-disc pl-6">
                <li>Procesar tus pedidos y coordinar entregas</li>
                <li>Atender consultas o solicitudes que nos hagas</li>
                <li>
                  Enviarte promociones, novedades o contenido útil (solo si tú
                  lo aceptas)
                </li>
                <li>
                  Mejorar nuestra atención y el funcionamiento de nuestra página
                  o redes
                </li>
                <li>Cumplir con requisitos legales cuando sea necesario</li>
              </ul>
              <p className="">
                No te enviaremos mensajes promocionales sin tu consentimiento y
                siempre podrás darte de baja si cambias de opinión.
              </p>
            </div>

            <div id="section-3">
              <h2 className="text-2xl font-semibold mt-8 mb-4 ">
                3. Uso de Cookies
              </h2>
              <p className="">
                Si visitas nuestro sitio web, es posible que utilicemos cookies
                para mejorar tu experiencia. Estas cookies nos ayudan a:
              </p>
              <ul className="list-disc pl-6">
                <li>Conocer qué secciones visitas más</li>
                <li>Recordar tus preferencias para futuras visitas</li>
                <li>Mejorar la navegación en general.</li>
              </ul>
              <p className="">
                Puedes desactivarlas desde tu navegador, aunque algunas
                funciones podrían dejar de estar disponibles.
              </p>
            </div>

            <div id="section-4">
              <h2 className="text-2xl font-semibold mt-8 mb-4 ">
                4. Enlaces a otros sitios
              </h2>
              <p className="">
                En nuestras redes o página web puede que encuentres enlaces a
                servicios de terceros (como Instagram, WhatsApp, Google Maps,
                etc.). Una vez hagas clic y salgas de nuestros canales,{" "}
                <strong>Doña Ceci</strong> no tiene control sobre cómo esos
                sitios manejan tu información. Te recomendamos leer sus
                políticas de privacidad.
              </p>
            </div>

            <div id="section-5">
              <h2 className="text-2xl font-semibold mt-8 mb-4 ">
                5. Tu información, tu control
              </h2>
              <p className="">Tienes total libertad para:</p>
              <ul className="list-disc pl-6">
                <li>Solicitar la modificación o eliminación de tus datos</li>
                <li>Pedir que no te enviemos más mensajes</li>
                <li>Limitar el uso de tus datos personales</li>
              </ul>
              <p className="">
                Para cualquiera de estos casos, puedes escribirnos directamente
                por mensaje en Instagram o al correo{" "}
                <strong>{datosDonaCeci.email}</strong>.
              </p>
              <p>
                <strong>Doña Ceci</strong>
                no venderá ni compartirá tu información personal con terceros,
                salvo que sea exigido por la ley.
              </p>
            </div>

            <div id="section-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4 ">
                6. Seguridad y almacenamiento
              </h2>
              <p className="">
                Tu información es almacenada de forma segura, y usamos medidas
                razonables para evitar accesos no autorizados. Aunque ningún
                sistema es 100% infalible, trabajamos para proteger tus datos lo
                mejor posible.
              </p>
            </div>

            <div id="section-7">
              <h2 className="text-2xl font-semibold mt-8 mb-4 ">
                7. Tus derechos
              </h2>
              <p className="">Como usuario, tienes derecho a:</p>
              <ul className="list-disc pl-6">
                <li>Conocer qué datos tuyos tenemos</li>
                <li>Rectificarlos o eliminarlos</li>
                <li>Retirar tu consentimiento para su uso</li>
                <li>
                  Presentar reclamos ante autoridades si consideras que no hemos
                  cumplido
                </li>
              </ul>
              <p className="">
                Puedes ejercer estos derechos escribiéndonos al correo o por
                mensaje directo.
              </p>
            </div>

            <div id="section-8">
              <h2 className="text-2xl font-semibold mt-8 mb-4 ">
                8. Cambios a esta política
              </h2>
              <p className="">
                Podemos actualizar esta Política en cualquier momento. Cualquier
                cambio se publicará con una nueva fecha de actualización. Te
                recomendamos revisarla periódicamente.
              </p>
            </div>

            <div id="section-9">
              <h2 className="text-2xl font-semibold mt-8 mb-4 ">
                9. Aceptación
              </h2>
              <p className="">
                Al comunicarte con nosotros, hacer un pedido o navegar por
                nuestros canales, aceptas esta Política de Privacidad. Si no
                estás de acuerdo, por favor evita enviar tus datos personales.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar navigation */}
        <div className="md:col-span-1 py-8 px-4">
          <div className="sticky top-24">
            <h3 className="text-lg font-semibold mb-4">En esta página</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`${
                    activeSection === section.id
                      ? "text-black font-medium border-l-2 border-black pl-3 -ml-[1px]"
                      : "text-black hover:font-semibold pl-3"
                  } transition-colors duration-200`}
                >
                  <button
                    onClick={() => {
                      scrollToSection(section.id);
                      router.push(`#${section.id}`);
                    }}
                    className="block py-1 text-left w-full"
                  >
                    {section.label}
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-3 md:-bottom-5 lg:-bottom-8 xl:-bottom-10 rotate-180 flex items-center justify-center w-full z-20">
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
}
