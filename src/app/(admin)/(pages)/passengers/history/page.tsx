import PassengerRideHistory from '@/components/pages/passengers/RideHistory'

export const metadata = {
  title: 'Historique des Courses Passagers | Sumo Admin',
}

export default function PassengerHistoryPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Historique des Courses</h1>
        <p className="text-gray-600 mt-2">
          Consultez l'historique des courses de tous les passagers
        </p>
      </div>
      <PassengerRideHistory />
    </div>
  )
}