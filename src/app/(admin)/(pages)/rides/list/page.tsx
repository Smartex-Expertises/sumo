import RidesList from "@/components/pages/rides/RidesList"

export const metadata = {
  title: 'Liste des Courses | Sumo Admin',
}

export default function RidesListPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Liste des Courses</h1>
        <p className="text-gray-600 mt-2">
          Consultez et gérez toutes les courses historiques
        </p>
      </div>
      <RidesList />
    </div>
  )
}