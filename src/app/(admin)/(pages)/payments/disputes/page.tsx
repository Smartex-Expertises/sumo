import Disputes from "@/components/pages/payments/Disputes"

export const metadata = {
  title: 'Litiges | Sumo Admin',
}

export default function DisputesPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Litiges</h1>
        <p className="text-gray-600 mt-2">
          Gérez les litiges et réclamations de paiement
        </p>
      </div>
      <Disputes />
    </div>
  )
}