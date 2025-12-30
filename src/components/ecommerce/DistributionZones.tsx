"use client";
import { useState } from "react";
import { Dot, MapPin } from "lucide-react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

interface Zone {
  id: number;
  nom: string;
  courses: number;
  pourcentage: number;
  croissance: number;
}

export default function DistributionZones() {
  const zones: Zone[] = [
    { id: 1, nom: "Centre-ville", courses: 856, pourcentage: 35, croissance: 12 },
    { id: 2, nom: "Aéroport", courses: 624, pourcentage: 25, croissance: 8 },
    { id: 3, nom: "Quartier d'affaires", courses: 498, pourcentage: 20, croissance: 15 },
    { id: 4, nom: "Périphérie", courses: 372, pourcentage: 15, croissance: 5 },
    { id: 5, nom: "Zone résidentielle", courses: 250, pourcentage: 10, croissance: -2 },
  ];

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Distribution par zones
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Répartition géographique des courses
          </p>
        </div>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <Dot className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Voir le détail
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Exporter
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {zones.map((zone) => (
          <div key={zone.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-800 dark:text-white">{zone.nom}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-gray-800 dark:text-white">{zone.courses}</span>
                <span className="ml-2 text-sm text-gray-500">courses</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-1 h-2 bg-gray-200 rounded-full dark:bg-gray-800">
                <div 
                  className="absolute left-0 top-0 h-full rounded-full bg-brand-500"
                  style={{ width: `${zone.pourcentage}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {zone.pourcentage}%
                </span>
                <span className={`text-xs ${zone.croissance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {zone.croissance >= 0 ? '+' : ''}{zone.croissance}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white">Heure de pointe</p>
            <p className="text-sm text-gray-500">17h - 19h</p>
          </div>
          <div className="px-3 py-1 bg-yellow-100 rounded-full dark:bg-yellow-900/30">
            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
              +40% de courses
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}