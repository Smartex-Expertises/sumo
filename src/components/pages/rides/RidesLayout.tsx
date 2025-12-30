'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function RidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Courses</h1>
              <p className="text-gray-600 mt-1">
                Gérez toutes les courses, surveillez les trajets en temps réel et analysez les performances
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                + Nouvelle course
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mt-4">
            <Link href="/" className="hover:text-blue-600">
              Tableau de bord
            </Link>
            <ChevronRight size={14} />
            <span className="text-blue-600 font-medium">Courses</span>
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-full">
          {children}
        </div>
      </div>
    </div>
  )
}