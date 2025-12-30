"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Dot, Star } from "lucide-react";
import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChauffeurPerformance {
  id: number;
  name: string;
  note: number;
  courses: number;
  revenu: number;
  statut: 'actif' | 'inactif';
}

export default function PerformanceChauffeurs() {
  const chauffeurs: ChauffeurPerformance[] = [
    { id: 1, name: "Martin Dubois", note: 4.9, courses: 147, revenu: 3250, statut: 'actif' },
    { id: 2, name: "Sophie Lambert", note: 4.8, courses: 132, revenu: 2980, statut: 'actif' },
    { id: 3, name: "Thomas Leroy", note: 4.7, courses: 118, revenu: 2650, statut: 'actif' },
    { id: 4, name: "Julie Martin", note: 4.6, courses: 95, revenu: 2140, statut: 'inactif' },
    { id: 5, name: "David Petit", note: 4.5, courses: 87, revenu: 1950, statut: 'actif' },
  ];

  const series = [78];
  const options: ApexOptions = {
    colors: ["#10b981"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 200,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "70%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "28px",
            fontWeight: "600",
            offsetY: -30,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#10b981"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Taux de satisfaction"],
  };

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Performance des chauffeurs
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Top 5 des chauffeurs du mois
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
                Voir tous
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
        
        {/* Liste des chauffeurs */}
        <div className="mt-6 space-y-4">
          {chauffeurs.map((chauffeur) => (
            <div key={chauffeur.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full dark:bg-gray-800">
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {chauffeur.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{chauffeur.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{chauffeur.note}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800 dark:text-white">{chauffeur.courses} courses</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">€{chauffeur.revenu}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Graphique de satisfaction */}
        <div className="mt-8">
          <div className="relative">
            <div className="max-h-[200px]">
              <ReactApexChart
                options={options}
                series={series}
                type="radialBar"
                height={200}
              />
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            Taux de satisfaction global des passagers
          </p>
        </div>
      </div>
    </div>
  );
}