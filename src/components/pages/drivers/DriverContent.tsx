'use client'

import React, { useState, useEffect } from 'react'
import { 
  Users, 
  FileCheck, 
  History, 
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import DriverStatsCard from './DriverStatsCard'

interface DriverStats {
  total: number
  online: number
  onRide: number
  pending: number
  approved: number
  suspended: number
}

const DriverContent = () => {
  const [stats, setStats] = useState<DriverStats>({
    total: 0,
    online: 0,
    onRide: 0,
    pending: 0,
    approved: 0,
    suspended: 0
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDriverStats()
  }, [])

  const fetchDriverStats = async () => {
    try {
      // Simulation d'API
      setStats({
        total: 156,
        online: 42,
        onRide: 18,
        pending: 23,
        approved: 120,
        suspended: 5
      })
    } catch (error) {
      console.error('Error fetching driver stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: "Liste des chauffeurs",
      description: "Voir et gérer tous les chauffeurs",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      href: "/drivers/list",
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      title: "Validation documents",
      description: "Vérifier les documents en attente",
      icon: <FileCheck className="h-8 w-8 text-green-600" />,
      href: "/drivers/validation",
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      title: "Historique courses",
      description: "Consulter l'historique des courses",
      icon: <History className="h-8 w-8 text-purple-600" />,
      href: "/drivers/history",
      color: "bg-purple-50 hover:bg-purple-100"
    },
    {
      title: "Revenus par chauffeur",
      description: "Analyser les revenus et performances",
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      href: "/drivers/earnings",
      color: "bg-orange-50 hover:bg-orange-100"
    }
  ]

  const recentActivities = [
    { id: 1, driver: "Jean Dupont", action: "Document approuvé", time: "2 min", status: "success" },
    { id: 2, driver: "Marie Martin", action: "Nouvelle inscription", time: "15 min", status: "info" },
    { id: 3, driver: "Paul Bernard", action: "Course complétée", time: "30 min", status: "success" },
    { id: 4, driver: "Sophie Leroy", action: "Document expiré", time: "1h", status: "warning" },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <DriverStatsCard
          title="Total Chauffeurs"
          value={stats.total}
          icon={<Users className="h-5 w-5" />}
          color="bg-blue-500"
          trend="+12%"
        />
        <DriverStatsCard
          title="En ligne"
          value={stats.online}
          icon={<CheckCircle className="h-5 w-5" />}
          color="bg-green-500"
        />
        <DriverStatsCard
          title="En course"
          value={stats.onRide}
          icon={<Clock className="h-5 w-5" />}
          color="bg-yellow-500"
        />
        <DriverStatsCard
          title="En attente"
          value={stats.pending}
          icon={<AlertCircle className="h-5 w-5" />}
          color="bg-orange-500"
        />
        <DriverStatsCard
          title="Approuvés"
          value={stats.approved}
          icon={<Shield className="h-5 w-5" />}
          color="bg-emerald-500"
        />
        <DriverStatsCard
          title="Suspendus"
          value={stats.suspended}
          icon={<AlertCircle className="h-5 w-5" />}
          color="bg-red-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Accès rapide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <div className={`${action.color} rounded-xl p-5 transition-all duration-300 cursor-pointer transform hover:scale-105 border border-transparent hover:border-gray-200`}>
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-white">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{action.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Activité récente</h2>
          <Link href="/drivers/history" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Voir tout
          </Link>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${activity.status === 'success' ? 'bg-green-100 text-green-600' : activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                  {activity.status === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{activity.driver}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DriverContent