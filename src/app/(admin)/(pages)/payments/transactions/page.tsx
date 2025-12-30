import Transactions from "@/components/pages/payments/Transactions"

export const metadata = {
  title: 'Transactions | Sumo Admin',
}

export default function TransactionsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Transactions</h1>
        <p className="text-gray-600 mt-2">
          Gérez et surveillez toutes les transactions financières
        </p>
      </div>
      <Transactions />
    </div>
  )
}