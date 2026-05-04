"use client";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { TrendingUp } from "lucide-react";
import { api } from "@/lib/api";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

interface ChartPoint { period: string; revenue: number; total: number }

export default function RevenueChart() {
  const [data, setData] = useState<ChartPoint[] | null>(null);

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

  const revenues = data ? data.map(d => d.revenue) : Array(12).fill(0);
  const totals = data ? data.map(d => d.total) : Array(12).fill(0);

  const totalRevenue = revenues.reduce((a, b) => a + b, 0);

  const options: ApexOptions = {
    legend: { show: false },
    colors: ["#465FFF", "#10b981"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: { show: false },
      animations: { enabled: data !== null },
    },
    stroke: { curve: "smooth", width: [2, 2] },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.2, opacityTo: 0 },
    },
    markers: { size: 0, strokeColors: "#fff", strokeWidth: 2, hover: { size: 6 } },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: { enabled: true },
    xaxis: {
      type: "category",
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        formatter: (v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`,
        style: { fontSize: "12px", colors: ["#6B7280"] },
      },
      title: { text: "Revenus (FCFA)", style: { fontSize: "12px" } },
    },
  };

  const series = [
    { name: "Revenus (FCFA)", data: revenues },
    { name: "Nb courses", data: totals },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Revenus de la plateforme
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Évolution mensuelle — {new Date().getFullYear()}
          </p>
        </div>
        {data && totalRevenue > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-500/10 shrink-0">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
              {totalRevenue.toLocaleString()} FCFA
            </span>
          </div>
        )}
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          {data === null ? (
            <div className="h-[310px] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <ReactApexChart options={options} series={series} type="area" height={310} />
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#465FFF]" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Revenus (FCFA)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10b981]" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Nombre de courses</span>
        </div>
      </div>
    </div>
  );
}
