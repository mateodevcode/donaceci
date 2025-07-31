// components/GoogleMap.tsx
"use client";

import React from "react";

const Ubicacion = () => {
  const html = `
    <gmp-map center="10.627777099609375,-74.92241668701172" zoom="15" map-id="DEMO_MAP_ID">
      <gmp-advanced-marker position="10.627777099609375,-74.92241668701172" title="Doña ceci"></gmp-advanced-marker>
    </gmp-map>
  `;

  return (
    <div
      className="w-full h-[300px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Ubicacion;
