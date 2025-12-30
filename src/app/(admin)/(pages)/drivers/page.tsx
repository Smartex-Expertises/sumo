import DriverContent from "@/components/pages/drivers/DriverContent";

export default function DriverPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Tableau de bord Chauffeurs
      </h1>
      <DriverContent />
    </div>
  )
}