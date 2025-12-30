import Withdrawals from "@/components/pages/payments/Withdrawals"

export const metadata = {
  title: 'Retraits | Sumo Admin',
}

export default function WithdrawalsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Retraits</h1>
        <p className="text-gray-600 mt-2">
          Gérez les demandes de retrait des chauffeurs
        </p>
      </div>
      <Withdrawals />
    </div>
  )
}