import ActiveRides from '@/components/pages/rides/ActiveRides'

export const metadata = {
  title: 'Courses en Cours | Sumo Admin',
}

export default function ActiveRidesPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Courses en Cours</h1>
        <p className="text-gray-600 mt-2">
          Surveillez les trajets en temps réel et gérez les courses actives
        </p>
      </div>
      <ActiveRides />
    </div>
  )
}