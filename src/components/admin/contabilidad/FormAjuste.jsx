"use client";

import React, { useState } from "react";
import SelectCuentaForm from "./SelectCuentaForm";
import { cuentasContables } from "@/data/cuentas_contables";
import { toast } from "sonner";

export default function FormAsientoManual({ onAgregarAjuste }) {
  const [form, setForm] = useState({
    motivo: "",
    cuentaDebe: "",
    cuentaHaber: "",
    monto: 0,
    fecha: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { motivo, cuentaDebe, cuentaHaber, monto, fecha } = form;

    if (!motivo || !cuentaDebe || !cuentaHaber || monto <= 0) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    const cuentaDebeObj = findCuenta(cuentaDebe);
    const cuentaHaberObj = findCuenta(cuentaHaber);

    // Construcción del asiento contable
    const asiento = {
      fecha,
      detalle: motivo,
      movimientos: [
        {
          cuenta: cuentaDebe,
          nombre: cuentaDebeObj?.nombre || "Cuenta debe",
          debe: Number(monto),
          haber: 0,
        },
        {
          cuenta: cuentaHaber,
          nombre: cuentaHaberObj?.nombre || "Cuenta haber",
          debe: 0,
          haber: Number(monto),
        },
      ],
    };

    try {
      // Envío del asiento al backend
      const res = await fetch("/api/registrar-asiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ asiento }),
      });

      if (!res.ok) throw new Error("Error al guardar el asiento.");

      toast.success("✅ Asiento registrado exitosamente!");

      // 🔄 Agregar el asiento como ajuste en el estado superior
      onAgregarAjuste({
        cuenta: cuentaDebe,
        nombre: cuentaDebeObj?.nombre || "Cuenta debe",
        debe: Number(monto),
        haber: 0,
      });

      onAgregarAjuste({
        cuenta: cuentaHaber,
        nombre: cuentaHaberObj?.nombre || "Cuenta haber",
        debe: 0,
        haber: Number(monto),
      });

      // Reiniciar formulario
      setForm({
        motivo: "",
        cuentaDebe: "",
        cuentaHaber: "",
        monto: 0,
        fecha: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Error al registrar el asiento. Inténtalo de nuevo.");
    }
  };

  // Buscar cuenta por código
  const findCuenta = (codigo) => {
    for (const grupo of Object.values(cuentasContables)) {
      const cuenta = grupo.find((c) => c.cuenta === codigo);
      if (cuenta) return cuenta;
    }
    return null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-12 border rounded-lg w-full md:w-1/2 mx-auto bg-white shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Registrar Asiento Manual</h2>

      {/* Motivo o Detalle del asiento contable */}
      <div className="grid gap-1">
        <span className="font-semibold">Motivo o Detalle:</span>
        <div className="w-full border border-gray-300 rounded-full px-4 py-3 text-left text-sm bg-white text-gray-700 relative shadow-sm">
          <input
            type="text"
            name="motivo"
            value={form.motivo}
            placeholder="Ejemplo: Ajuste de inventario, faltante, error en sistema"
            onChange={handleChange}
            className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-blue-600 text-sm"
            required
          />
        </div>
      </div>

      {/* Selección de Cuenta Debe */}
      <SelectCuentaForm
        label="Cuenta Debe"
        value={form.cuentaDebe}
        onChange={(val) => setForm((prev) => ({ ...prev, cuentaDebe: val }))}
        cuentas={Object.values(cuentasContables).flat()}
      />

      {/* Selección de Cuenta Haber */}
      <SelectCuentaForm
        label="Cuenta Haber"
        value={form.cuentaHaber}
        onChange={(val) => setForm((prev) => ({ ...prev, cuentaHaber: val }))}
        cuentas={Object.values(cuentasContables).flat()}
      />

      {/* Monto del ajuste */}
      <div className="grid gap-1">
        <span className="font-semibold">Monto:</span>
        <div className="w-full border border-gray-300 rounded-full px-4 py-3 text-left text-sm bg-white text-gray-700 relative shadow-sm">
          <input
            type="number"
            name="monto"
            value={form.monto}
            placeholder="Ejemplo: 100"
            onChange={handleChange}
            className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-blue-600 text-sm"
            required
          />
        </div>
      </div>

      {/* Fecha del asiento */}
      <div className="grid gap-1">
        <span className="font-semibold">Fecha:</span>
        <div className="w-full border border-gray-300 rounded-full px-4 py-3 text-left text-sm bg-white text-gray-700 relative shadow-sm">
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full bg-transparent text-black placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-blue-600 text-sm"
            required
          />
        </div>
      </div>

      {/* Botón para enviar el formulario */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 w-full transition-colors duration-200 active:scale-95"
      >
        Registrar Asiento
      </button>
    </form>
  );
}
