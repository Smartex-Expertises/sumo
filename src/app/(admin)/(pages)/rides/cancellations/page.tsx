import Cancellations from '@/components/pages/rides/Cancellations'

export const metadata = {
  title: 'Gestion Annulations | Sumo Admin',
}

export default function CancellationsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestion des Annulations</h1>
        <p className="text-gray-600 mt-2">
          Analysez les annulations et identifiez les opportunités d'amélioration
        </p>
      </div>
      <Cancellations />
    </div>
  )
}