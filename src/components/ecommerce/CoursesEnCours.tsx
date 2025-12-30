import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Clock, MapPin, User } from "lucide-react";

interface Course {
  id: number;
  chauffeur: string;
  passager: string;
  depart: string;
  arrivee: string;
  prix: string;
  statut: "en cours" | "terminée" | "annulée";
  heure: string;
}

const coursesData: Course[] = [
  {
    id: 1,
    chauffeur: "Martin Dubois",
    passager: "Sophie Martin",
    depart: "Gare Montparnasse",
    arrivee: "Tour Eiffel",
    prix: "€18.50",
    statut: "en cours",
    heure: "14:30"
  },
  {
    id: 2,
    chauffeur: "Thomas Leroy",
    passager: "David Petit",
    depart: "Champs-Élysées",
    arrivee: "Aéroport CDG",
    prix: "€42.00",
    statut: "en cours",
    heure: "14:45"
  },
  {
    id: 3,
    chauffeur: "Julie Lambert",
    passager: "Marie Dupont",
    depart: "Opéra Garnier",
    arrivee: "Notre-Dame",
    prix: "€12.80",
    statut: "terminée",
    heure: "14:15"
  },
  {
    id: 4,
    chauffeur: "Pierre Moreau",
    passager: "Jean Bernard",
    depart: "Saint-Germain",
    arrivee: "Bastille",
    prix: "€15.20",
    statut: "annulée",
    heure: "14:00"
  },
  {
    id: 5,
    chauffeur: "Lucie Simon",
    passager: "Paul Richard",
    depart: "La Défense",
    arrivee: "Gare du Nord",
    prix: "€25.40",
    statut: "en cours",
    heure: "15:00"
  },
];

export default function CoursesEnCours() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Courses en temps réel
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Suivi des courses actives
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <Clock className="w-4 h-4" />
            Actualiser
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-brand-500 bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
            Voir toutes
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs">
                Course
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs">
                Chauffeur
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs">
                Trajet
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs">
                Prix
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs">
                Statut
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {coursesData.map((course) => (
              <TableRow key={course.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
                      <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        #{course.id.toString().padStart(4, '0')}
                      </p>
                      <span className="flex items-center gap-1 text-gray-500 text-theme-xs">
                        <Clock className="w-3 h-3" />
                        {course.heure}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {course.chauffeur}
                  </p>
                  <span className="text-gray-500 text-theme-xs">
                    {course.passager}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-600">{course.depart}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-600">{course.arrivee}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  {course.prix}
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={
                      course.statut === "en cours"
                        ? "info"
                        : course.statut === "terminée"
                        ? "success"
                        : "error"
                    }
                  >
                    {course.statut}
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