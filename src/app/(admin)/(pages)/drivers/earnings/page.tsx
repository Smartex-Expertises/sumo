import DriverEarnings from "@/components/pages/drivers/DriverEarnings"

export const metadata = {
  title: 'Revenus par Chauffeur | Sumo Admin',
}

export default function DriverEarningsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Revenus par Chauffeur</h1>
        <p className="text-gray-600 mt-2">
          Analyse des revenus et performances financières
        </p>
      </div>
      <DriverEarnings />
    </div>
  )
}