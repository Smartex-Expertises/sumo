"use client";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Star } from "lucide-react";
import { api } from "@/lib/api";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Driver {
  id: string;
  user: { firstName: string; lastName: string };
  rating: number | null;
  totalRides: number | null;
  totalEarnings: number | null;
}

function Skeleton() {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-1">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
      <div className="space-y-1 text-right">
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default function PerformanceChauffeurs() {
  const [drivers, setDrivers] = useState<Driver[] | null>(null);

  useEffect(() => {
    api.get<Driver[]>("/admin/dashboard/top-drivers?limit=5")
      .then(res => setDrivers(Array.isArray(res) ? res : []))
      .catch(() => setDrivers([]));
  }, []);

  const avgRating = drivers && drivers.length > 0
    ? drivers.reduce((s, d) => s + (d.rating ?? 0), 0) / drivers.length
    : 0;

  const satisfactionPct = Math.round((avgRating / 5) * 100);

  const series = [satisfactionPct || 78];
  const options: ApexOptions = {
    colors: ["#10b981"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 200,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: "70%" },
        track: { background: "#E4E7EC", strokeWidth: "100%", margin: 5 },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "28px",
            fontWeight: "600",
            offsetY: -30,
            color: "#1D2939",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    fill: { type: "solid", colors: ["#10b981"] },
    stroke: { lineCap: "round" },
    labels: ["Satisfaction"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Performance des chauffeurs
          </h3>
          <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
            Top 5 des meilleurs chauffeurs
          </p>
        </div>

        <div className="space-y-4">
          {drivers === null
            ? [...Array(5)].map((_, i) => <Skeleton key={i} />)
            : drivers.length === 0
            ? <p className="text-center text-gray-400 py-6">Aucun chauffeur</p>
            : drivers.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full dark:bg-gray-800 font-semibold text-gray-800 dark:text-white">
                    {d.user.firstName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {d.user.firstName} {d.user.lastName}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {d.rating != null ? d.rating.toFixed(1) : "—"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {d.totalRides ?? 0} courses
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {d.totalEarnings != null ? Number(d.totalEarnings).toLocaleString() : "0"} FCFA
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-8">
          <div className="max-h-[200px]">
            <ReactApexChart options={options} series={series} type="radialBar" height={200} />
          </div>
          <p className="mt-4 text-center text-sm text-gray-500 pb-6">
            Taux de satisfaction global des passagers
          </p>
        </div>
      </div>
    </div>
  );
}
