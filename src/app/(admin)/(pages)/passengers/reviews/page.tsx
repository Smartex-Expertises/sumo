import Reviews from "@/components/pages/passengers/ Reviews"

export const metadata = {
  title: 'Notes et Avis | Taxi App Admin',
}

export default function ReviewsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Notes et Avis</h1>
        <p className="text-gray-600 mt-2">
          Gérez les évaluations et commentaires des passagers
        </p>
      </div>
      <Reviews />
    </div>
  )
}