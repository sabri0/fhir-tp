import { UsersIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState("patients");

  const handleSelect = (view) => {
    setActive(view);
    onSelect(view);
  };

  return (
    <div className="bg-gray-900 text-gray-100 w-64 min-h-screen flex flex-col">
      <div className="p-4 text-2xl font-semibold border-b border-gray-700">
        🩺 FHIR Dashboard
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => handleSelect("patients1")}
          className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg ${
            active === "patients1"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <UsersIcon className="w-5 h-5" />
          <span>Patients</span>
        </button>

        <button
          onClick={() => handleSelect("analytics")}
          className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg ${
            active === "analytics"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <ChartBarIcon className="w-5 h-5" />
          <span>Analytics</span>
        </button>
      </nav>

      <div className="p-4 text-xs text-gray-400 border-t border-gray-700">
        Powered by HAPI FHIR
      </div>
    </div>
  );
}
