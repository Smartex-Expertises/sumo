'use client';


export default function SettingsLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Paramètres</h1>
          <p className="text-gray-600 mt-2">
            Configuration de la plateforme et paramètres système
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        

        {/* Main Content Area */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}