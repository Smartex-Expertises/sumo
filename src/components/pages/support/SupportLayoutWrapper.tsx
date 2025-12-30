'use client';

import { HelpCircle, AlertTriangle, Flag, MessageSquare } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const menuItems = [
  {
    id: 'complaints',
    name: 'Réclamations',
    icon: <AlertTriangle size={20} />,
    path: '/support/complaints',
  },
  {
    id: 'reports',
    name: 'Signalements',
    icon: <Flag size={20} />,
    path: '/support/reports',
  },
  {
    id: 'tickets',
    name: 'Tickets',
    icon: <MessageSquare size={20} />,
    path: '/support/tickets',
  },
];

export default function SupportLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();
 

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Support</h1>
          <p className="text-gray-600 mt-2">
            Gérez les réclamations, signalements et tickets de support
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