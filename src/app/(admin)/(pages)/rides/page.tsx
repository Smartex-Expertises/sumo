import RidesContent from "@/components/pages/rides/RidesContent"

export const metadata = {
  title: 'Courses | Taxi App Admin',
  description: 'Gestion des courses et analyse des performances',
}

export default function RidesPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Tableau de bord Courses
      </h1>
      <RidesContent />
    </div>
  )
}