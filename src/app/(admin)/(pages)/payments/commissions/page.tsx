import Commissions from "@/components/pages/payments/Commissions"

export const metadata = {
  title: 'Commissions | Sumo Admin',
}

export default function CommissionsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Commissions</h1>
        <p className="text-gray-600 mt-2">
          Gérez les commissions et revenus de la plateforme
        </p>
      </div>
      <Commissions />
    </div>
  )
}