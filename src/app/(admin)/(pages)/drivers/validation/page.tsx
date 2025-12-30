import DocumentValidation from '@/components/pages/drivers/DocumentValidation'

export const metadata = {
  title: 'Validation des Documents | Sumo Admin',
}

export default function DocumentValidationPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Validation des Documents</h1>
        <p className="text-gray-600 mt-2">
          Vérifiez et validez les documents des chauffeurs
        </p>
      </div>
      <DocumentValidation />
    </div>
  )
}