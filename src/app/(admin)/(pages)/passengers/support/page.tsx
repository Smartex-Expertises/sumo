import Support from '@/components/pages/passengers/Support'

export const metadata = {
  title: 'Support Client | Sumo Admin',
}

export default function SupportPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Support Client</h1>
        <p className="text-gray-600 mt-2">
          Gérez les demandes d'assistance et tickets support
        </p>
      </div>
      <Support />
    </div>
  )
}