"use client";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { api } from "@/lib/api";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

interface ChartPoint { period: string; completed: number; canceled: number }

export default function CoursesChart() {
  const [data, setData] = useState<ChartPoint[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const year = new Date().getFullYear();
    api.get<ChartPoint[]>(
      `/admin/dashboard/rides-chart?period=month&dateFrom=${year}-01-01&dateTo=${year}-12-31`
    )
      .then(res => setData(Array.isArray(res) ? res : []))
      .catch(() => setData([]));
  }, []);

  const categories = data
    ? data.map(d => MONTHS[parseInt(d.period.split("-")[1], 10) - 1] ?? d.period)
    : MONTHS;

  const completed = data ? data.map(d => d.completed) : Array(12).fill(0);
  const canceled = data ? data.map(d => d.canceled) : Array(12).fill(0);

  const options: ApexOptions = {
    colors: ["#465fff", "#10b981"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
      animations: { enabled: data !== null },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: { show: true, position: "top", horizontalAlign: "left", fontFamily: "Outfit" },
    yaxis: { title: { text: "Nombre de courses" } },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `${val} courses` },
    },
  };

  const series = [
    { name: "Courses complétées", data: completed },
    { name: "Courses annulées", data: canceled },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Évolution des courses
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Nombre de courses par mois — {new Date().getFullYear()}
          </p>
        </div>
        <div className="relative inline-block">
          <button onClick={() => setIsOpen(!isOpen)} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-40 p-2">
            <DropdownItem
              onItemClick={() => setIsOpen(false)}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Exporter les données
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          {data === null ? (
            <div className="h-[180px] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <ReactApexChart options={options} series={series} type="bar" height={180} />
          )}
        </div>
      </div>
    </div>
  );
}
