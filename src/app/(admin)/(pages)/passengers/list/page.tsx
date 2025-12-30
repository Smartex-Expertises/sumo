import PassengersList from "@/components/pages/passengers/PassengersList"

export const metadata = {
  title: 'Liste des Chauffeurs | Sumo Admin',
}

export default function DriverListPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Liste des Passagers</h1>
        <p className="text-gray-600 mt-2">
          Gérez tous les passagers inscrits sur la plateforme
        </p>
      </div>
      <PassengersList />
    </div>
  )
}