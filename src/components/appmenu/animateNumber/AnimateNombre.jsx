"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const AnimateNombre = ({ defaultName, hoverName }) => {
  const [hovered, setHovered] = useState(false);
  const currentName = hovered ? hoverName : defaultName;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-10 w-[120px] overflow-hidden z-10"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentName}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute w-full text-center text-black bg-[#eec802] px-4 py-1 rounded-full font-semibold"
        >
          {currentName}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
