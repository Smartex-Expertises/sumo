import PassengersContent from '@/components/pages/passengers/PassengersContent'

export const metadata = {
  title: 'Passagers | Sumo Admin',
  description: 'Gestion des passagers et support client',
}

export default function PassengersPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Tableau de bord Passagers
      </h1>
      <PassengersContent />
    </div>
  )
}