import type { Metadata } from "next";
import CoursesChart from "@/components/ecommerce/CoursesChart";
import RevenueChart from "@/components/ecommerce/ RevenueChart";
import PerformanceChauffeurs from "@/components/ecommerce/PerformanceChauffeurs";
import DistributionZones from "@/components/ecommerce/DistributionZones";
import CoursesEnCours from "@/components/ecommerce/CoursesEnCours";
import { DashboardMetrics } from "@/components/ecommerce/DashboardMetrics";

export const metadata: Metadata = {
  title: "Dashboard Admin VTC | Plateforme de gestion",
  description: "Tableau de bord d'administration pour plateforme VTC",
};

export default function VtcDashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Métriques principales */}
      <div className="col-span-12">
        <DashboardMetrics />
      </div>

      {/* Graphique des courses et performance */}
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <CoursesChart />
        <RevenueChart />
      </div>

      {/* Performance et distribution */}
      <div className="col-span-12 xl:col-span-5 space-y-6">
        <PerformanceChauffeurs />
        <DistributionZones />
      </div>

      {/* Courses en temps réel */}
      <div className="col-span-12">
        <CoursesEnCours />
      </div>
    </div>
  );
}