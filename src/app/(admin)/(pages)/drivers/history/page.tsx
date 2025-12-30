import RideHistory from "@/components/pages/drivers/RideHistory"

export const metadata = {
  title: 'Historique des Courses | Sumo Admin',
}

export default function DriverHistoryPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Historique des Courses</h1>
        <p className="text-gray-600 mt-2">
          Consultez l'historique complet des courses avec détails et statistiques
        </p>
      </div>
      <RideHistory />
    </div>
  )
}