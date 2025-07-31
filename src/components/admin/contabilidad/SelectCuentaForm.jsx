import { Listbox } from "@headlessui/react";
import { ChevronDown, CircleDollarSign } from "lucide-react";

function SelectCuentaForm({ label, value, onChange, cuentas }) {
  const selectedCuenta = cuentas.find((c) => c.cuenta === value);

  return (
    <div className="w-full">
      <label className="block font-semibold mb-1">{label}</label>
      <div className="relative w-full">
        <Listbox value={value} onChange={onChange}>
          {({ open }) => (
            <div>
              <Listbox.Button className="w-full border border-gray-300 rounded-full px-4 py-3 text-left text-sm bg-white text-gray-700 relative shadow-sm">
                {selectedCuenta ? (
                  `${selectedCuenta.cuenta} - ${selectedCuenta.nombre}`
                ) : (
                  <span className="flex items-center gap-3 text-gray-400">
                    <CircleDollarSign className="w-5 h-5" />
                    Seleccione una cuenta
                  </span>
                )}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </span>
              </Listbox.Button>

              {open && (
                <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto text-sm">
                  {cuentas.map((cuenta, i) => (
                    <Listbox.Option
                      key={i}
                      value={cuenta.cuenta}
                      className={({ active, selected }) =>
                        `cursor-pointer px-4 py-2 ${
                          active ? "bg-blue-100" : ""
                        } ${selected ? "font-semibold text-blue-600" : ""}`
                      }
                    >
                      {cuenta.cuenta} - {cuenta.nombre}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              )}
            </div>
          )}
        </Listbox>
      </div>
    </div>
  );
}

export default SelectCuentaForm;
