"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Clock, RefreshCw, User } from "lucide-react";
import { api } from "@/lib/api";

interface Ride {
  id: string;
  status: string;
  pickupAddress: string | null;
  destinationAddress: string | null;
  totalFare: number | null;
  createdAt: string;
  clientName: string;
  driverName: string;
}

function statusColor(s: string): "info" | "success" | "error" | "warning" {
  if (s === "IN_PROGRESS" || s === "ACCEPTED") return "info";
  if (s === "COMPLETED") return "success";
  if (s === "CANCELED") return "error";
  return "warning";
}

function statusLabel(s: string) {
  const map: Record<string, string> = {
    IN_PROGRESS: "en cours",
    ACCEPTED: "acceptée",
    COMPLETED: "terminée",
    CANCELED: "annulée",
    PENDING: "en attente",
  };
  return map[s] ?? s.toLowerCase();
}

function SkeletonRow() {
  return (
    <TableRow>
      {[...Array(5)].map((_, i) => (
        <TableCell key={i} className="py-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24" />
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function CoursesEnCours() {
  const [rides, setRides] = useState<Ride[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await api.get<Ride[]>("/admin/dashboard/recent-rides?limit=8");
      setRides(Array.isArray(res) ? res : []);
    } catch {
      setRides([]);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Courses récentes
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Dernières courses de la plateforme
          </p>
        </div>
        <button
          onClick={load}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Actualiser
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              {["Course", "Client", "Trajet", "Tarif (FCFA)", "Statut"].map(h => (
                <TableCell key={h} isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs">
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {rides === null
              ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              : rides.length === 0
              ? (
                <TableRow>
                  <TableCell className="py-8 text-center text-gray-400">
                    <span className="col-span-5">Aucune course trouvée</span>
                  </TableCell>
                </TableRow>
              )
              : rides.map((ride) => (
                <TableRow key={ride.id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
                        <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          #{ride.id.slice(-6).toUpperCase()}
                        </p>
                        <span className="flex items-center gap-1 text-gray-500 text-theme-xs">
                          <Clock className="w-3 h-3" />
                          {new Date(ride.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{ride.clientName}</p>
                    <span className="text-gray-500 text-theme-xs">{ride.driverName}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                        <span className="text-sm text-gray-600 truncate max-w-[160px]">{ride.pickupAddress || "—"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                        <span className="text-sm text-gray-600 truncate max-w-[160px]">{ride.destinationAddress || "—"}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                    {ride.totalFare != null ? Number(ride.totalFare).toLocaleString() : "—"}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge size="sm" color={statusColor(ride.status)}>
                      {statusLabel(ride.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
