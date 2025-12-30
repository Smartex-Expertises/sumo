import Analytics from '@/components/pages/rides/Analytics'

export const metadata = {
  title: 'Statistiques Courses | Taxi App Admin',
}

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Statistiques des Courses</h1>
        <p className="text-gray-600 mt-2">
          Analysez les performances et tendances de votre activité
        </p>
      </div>
      <Analytics />
    </div>
  )
}