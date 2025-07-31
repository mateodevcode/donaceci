"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GaleriaImg = () => {
  const images = [
    "/productos/entrda-doña-ceci.jpeg",
    "/productos/local-doña-ceci-1.png",
    "/productos/local-doña-ceci-2.jpg",

    "/productos/crepes-section-1.png",
    "/productos/carne-doña-ceci.jpg",
    "/productos/pechuga-doña-ceci.jpg",
    "/productos/crepes-nosotros.png",

    "/productos/crema-doña-ceci.jpg",
  ];

  const [openModalImagen, setOpenModalImagen] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  return (
    <>
      {/* Galería de imágenes */}
      <div className="bg-white w-full flex flex-col items-center justify-start select-none">
        <div className="w-10/12 md:w-9/12 lg:w-8/12 p-4 mt-20">
          <h2 className="text-5xl md:text-7xl font-divertida text-[#965511]">
            Restaurante Doña Ceci
          </h2>
          <p className="text-lg text-black mt-10 font-roboto">
            {/* En el corazón del sabor colombiano, Doña Ceci ofrece las empanadas
            más tradicionales y sabrosas que puedas imaginar. Hechas con amor,
            recetas caseras y una sazón inconfundible, cada bocado es un viaje a
            nuestras raíces. Ya sea para disfrutar en el restaurante o llevarlas
            congeladas a casa, las empanadas de Doña Ceci son perfectas para
            compartir, sorprender o simplemente consentirte.{" "}
            <strong className="text-xl">
              ¡Ven y déjate conquistar por el auténtico sabor de Colombia!
            </strong> */}
            Quiénes Somos: Tradición que se Sirve con Amor Doña Ceci Congelados
            S.A.S. nace con el propósito de ofrecer más que comida: compartir
            historias y momentos que conectan. Combinamos recetas tradicionales
            con innovación para crear experiencias gastronómicas únicas.
            Ofrecemos productos de panadería, pastelería y platos servidos,
            ideales para empresas, eventos y ocasiones especiales. Trabajamos
            con ingredientes de alta calidad, bajo buenas prácticas de
            manufactura, priorizando la seguridad alimentaria, la sostenibilidad
            y el servicio personalizado. Cada experiencia con Doña Ceci busca
            superar expectativas, generar confianza y evocar memorias
            entrañables. Estamos listos para llevar a tu mesa sabor auténtico y
            calidez familiar.
          </p>

          <Image
            src={"/productos/frente-doña-ceci.png"}
            alt="Imagen frente doña ceci"
            width={800}
            height={800}
            className="mt-20 w-full h-auto object-cover rounded-md shadow-lg"
          />

          <p className="text-lg text-black mt-16 font-roboto">
            {/* En el corazón del sabor colombiano, Doña Ceci ofrece las empanadas
            más tradicionales y sabrosas que puedas imaginar. Hechas con amor,
            recetas caseras y una sazón inconfundible, cada bocado es un viaje a
            nuestras raíces. Ya sea para disfrutar en el restaurante o llevarlas
            congeladas a casa, las empanadas de Doña Ceci son perfectas para
            compartir, sorprender o simplemente consentirte.{" "}
            <strong className="text-xl">
              ¡Ven y déjate conquistar por el auténtico sabor de Colombia!
            </strong> */}
            En Doña Ceci, cada plato cuenta una historia. Nuestro nombre es un
            homenaje a dos mujeres extraordinarias: una madre y una abuela cuya
            sazón, cariño y sabiduría siguen presentes en cada receta que
            servimos. Aunque ya no están con nosotros en este plano, su legado
            vive a través del sabor que marcó generaciones y que hoy compartimos
            con orgullo. Nuestra cocina no solo alimenta: también despierta
            recuerdos. En cada bocado, buscamos que quien pruebe nuestros
            productos sienta ese calor de hogar, ese aroma que recuerda a las
            personas que más se aman, esos sabores que transportan a momentos
            felices alrededor de una mesa. Así como nosotros evocamos a nuestras
            Doñas Ceci, queremos que nuestros clientes recuerden a esas personas
            importantes con las que compartieron un plato inolvidable. Doña Ceci
            es más que un restaurante: es una experiencia que honra la
            tradición, el sabor casero y la calidez familiar. Al elegirnos, no
            solo estás contratando un servicio gastronómico: estás invitando a
            tu mesa una historia viva, una cocina de raíces, elaborada con
            ingredientes frescos y con ese toque especial que solo se logra
            cuando se cocina con el corazón.
          </p>
        </div>

        <div className="w-10/12 md:w-8/12 lg:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 my-16">
          {images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Imagen ${i + 1}`}
              className="w-full h-full object-cover cursor-pointer bg-zinc-200"
              width={300}
              height={300}
              onClick={() => {
                setOpenModalImagen(true);
                setImagenSeleccionada(src);
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal Full Screen */}
      <AnimatePresence>
        {openModalImagen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModalImagen(false)}
          >
            <motion.div
              className="relative w-[600px] h-[600px] flex items-center justify-center rounded-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer click en la imagen
            >
              <Image
                src={imagenSeleccionada}
                alt="Vista previa"
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-screen"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GaleriaImg;
