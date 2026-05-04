"use client";
import { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, Car, Users, CreditCard, Star } from "lucide-react";
import { api } from "@/lib/api";

interface Stats {
  users: { total: number; active: number };
  drivers: { total: number; approved: number; approvalRate: string };
  rides: { total: number; completed: number; completionRate: string };
  revenue: { total: number; avgRating: number };
}

function Skeleton() {
  return <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2" />;
}

export const DashboardMetrics = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get<Stats>("/admin/dashboard/overview")
      .then(res => setStats(res))
      .catch(() => {});
  }, []);

  const cards = [
    {
      label: "Courses totales",
      value: stats ? stats.rides.total.toLocaleString() : null,
      sub: stats ? `${stats.rides.completed} terminées (${stats.rides.completionRate}%)` : null,
      icon: <Car className="text-brand-600 size-6 dark:text-brand-400" />,
      bg: "bg-brand-50 dark:bg-brand-500/10",
      badge: stats ? (
        <Badge color="success"><ArrowUpIcon className="size-3" />{stats.rides.completionRate}%</Badge>
      ) : null,
    },
    {
      label: "Revenus (FCFA)",
      value: stats ? Number(stats.revenue.total).toLocaleString() : null,
      sub: `Note moyenne ★ ${stats?.revenue.avgRating ?? "—"}/5`,
      icon: <CreditCard className="text-green-600 size-6 dark:text-green-400" />,
      bg: "bg-green-50 dark:bg-green-500/10",
      badge: stats ? (
        <Badge color="success"><Star className="size-3" />{stats.revenue.avgRating}</Badge>
      ) : null,
    },
    {
      label: "Chauffeurs approuvés",
      value: stats ? stats.drivers.approved.toLocaleString() : null,
      sub: stats ? `Sur ${stats.drivers.total} inscrits (${stats.drivers.approvalRate}%)` : null,
      icon: <Users className="text-blue-600 size-6 dark:text-blue-400" />,
      bg: "bg-blue-50 dark:bg-blue-500/10",
      badge: stats ? (
        <Badge color="success"><ArrowUpIcon className="size-3" />{stats.drivers.approvalRate}%</Badge>
      ) : null,
    },
    {
      label: "Utilisateurs actifs",
      value: stats ? stats.users.active.toLocaleString() : null,
      sub: stats ? `Sur ${stats.users.total} inscrits` : null,
      icon: <Users className="text-purple-600 size-6 dark:text-purple-400" />,
      bg: "bg-purple-50 dark:bg-purple-500/10",
      badge: stats ? (
        <Badge color={stats.users.active > stats.users.total / 2 ? "success" : "warning"}>
          <ArrowUpIcon className="size-3" />
          {stats.users.total > 0 ? ((stats.users.active / stats.users.total) * 100).toFixed(0) : 0}%
        </Badge>
      ) : null,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.bg}`}>
            {card.icon}
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{card.label}</span>
              {card.value !== null
                ? <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{card.value}</h4>
                : <Skeleton />}
              <p className="mt-1 text-xs text-gray-500">{card.sub ?? " "}</p>
            </div>
            {card.badge}
          </div>
        </div>
      ))}
    </div>
  );
};
