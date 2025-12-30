'use client';

import { useRouter, usePathname } from 'next/navigation';



export default function AnalyticsLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
;


  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
       
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Analytiques</h1>
          <p className="text-gray-600 mt-2">
            Analyses, statistiques et rapports de performance
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