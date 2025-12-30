import PaymentsContent from "@/components/pages/payments/PaymentsContent"

export const metadata = {
  title: 'Paiements | Sumo Admin',
  description: 'Gestion des transactions et finances',
}

export default function PaymentsPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Tableau de bord Paiements
      </h1>
      <PaymentsContent />
    </div>
  )
}