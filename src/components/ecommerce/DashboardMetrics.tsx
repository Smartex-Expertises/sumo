"use client";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, Car, Users, CreditCard, Calendar } from "lucide-react";

export const DashboardMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
      {/* Courses par jour */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-brand-50 rounded-xl dark:bg-brand-500/10">
          <Car className="text-brand-600 size-6 dark:text-brand-400" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Courses aujourd'hui
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              342
            </h4>
            <p className="mt-1 text-xs text-gray-500">+15 vs hier</p>
          </div>
          <Badge color="success">
            <ArrowUpIcon className="size-3" />
            4.5%
          </Badge>
        </div>
      </div>

      {/* Chiffre d'affaires */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl dark:bg-green-500/10">
          <CreditCard className="text-green-600 size-6 dark:text-green-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Chiffre d'affaires
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              €8,542
            </h4>
            <p className="mt-1 text-xs text-gray-500">Mois en cours</p>
          </div>
          <Badge color="success">
            <ArrowUpIcon className="size-3" />
            12.3%
          </Badge>
        </div>
      </div>

      {/* Chauffeurs actifs */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl dark:bg-blue-500/10">
          <Users className="text-blue-600 size-6 dark:text-blue-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Chauffeurs actifs
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              127
            </h4>
            <p className="mt-1 text-xs text-gray-500">Sur 156 inscrits</p>
          </div>
          <Badge color="success">
            <ArrowUpIcon className="size-3" />
            5.2%
          </Badge>
        </div>
      </div>

      {/* Passagers actifs */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-50 rounded-xl dark:bg-purple-500/10">
          <Users className="text-purple-600 size-6 dark:text-purple-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Passagers actifs
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              2,843
            </h4>
            <p className="mt-1 text-xs text-gray-500">+42 cette semaine</p>
          </div>
          <Badge color="warning">
            <ArrowDownIcon className="size-3" />
            1.8%
          </Badge>
        </div>
      </div>
    </div>
  );
};