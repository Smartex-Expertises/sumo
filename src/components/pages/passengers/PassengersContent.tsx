'use client'

import React, { useState, useEffect } from 'react'
import { 
  Users, 
  History, 
  Star, 
  MessageSquare,
  UserPlus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import { User, UserRole } from '../../../../type'

interface PassengerStats {
  total: number
  active: number
  newToday: number
  vip: number
  averageRating: number
  supportTickets: number
}

const PassengersContent = () => {
  const [stats, setStats] = useState<PassengerStats>({
    total: 0,
    active: 0,
    newToday: 0,
    vip: 0,
    averageRating: 0,
    supportTickets: 0
  })

  const [recentPassengers, setRecentPassengers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPassengerData()
  }, [])

  const fetchPassengerData = async () => {
    try {
      // Simulation d'API
      setStats({
        total: 1245,
        active: 893,
        newToday: 23,
        vip: 156,
        averageRating: 4.7,
        supportTickets: 12
      })

      // Simulation de passagers récents
      const mockPassengers: User[] = [
        {
          id: '1',
          firstName: 'Jean',
          lastName: 'Dubois',
          phone: '+225 07 00 11 22',
          email: 'jean@example.com',
          passwordHash: '',
          role: UserRole.CLIENT,
          isActive: true,
          country: 'Côte d\'Ivoire',
          city: 'Abidjan',
          region: 'Plateau',
          lastLoginAt: new Date('2024-01-15T08:30:00'),
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date()
        },
        {
          id: '2',
          firstName: 'Marie',
          lastName: 'Leroy',
          phone: '+225 07 33 44 55',
          email: 'marie@example.com',
          passwordHash: '',
          role: UserRole.CLIENT,
          isActive: true,
          country: 'Côte d\'Ivoire',
          city: 'Abidjan',
          region: 'Cocody',
          lastLoginAt: new Date('2024-01-15T09:15:00'),
          createdAt: new Date('2024-01-12'),
          updatedAt: new Date()
        },
        {
          id: '3',
          firstName: 'Paul',
          lastName: 'Martin',
          phone: '+225 07 66 77 88',
          email: 'paul@example.com',
          passwordHash: '',
          role: UserRole.CLIENT,
          isActive: true,
          country: 'Côte d\'Ivoire',
          city: 'Abidjan',
          region: 'Yopougon',
          lastLoginAt: new Date('2024-01-14T14:20:00'),
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date()
        },
        {
          id: '4',
          firstName: 'Sophie',
          lastName: 'Bernard',
          phone: '+225 07 99 00 11',
          email: 'sophie@example.com',
          passwordHash: '',
          role: UserRole.CLIENT,
          isActive: false,
          country: 'Côte d\'Ivoire',
          city: 'Abidjan',
          region: 'Marcory',
          lastLoginAt: new Date('2024-01-10T11:45:00'),
          createdAt: new Date('2023-12-20'),
          updatedAt: new Date()
        }
      ]
      setRecentPassengers(mockPassengers)
    } catch (error) {
      console.error('Error fetching passenger data:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: "Liste des passagers",
      description: "Voir et gérer tous les passagers",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      href: "/passengers/list",
      color: "bg-blue-50 hover:bg-blue-100 border border-blue-100"
    },
    {
      title: "Historique des courses",
      description: "Consulter les courses des passagers",
      icon: <History className="h-8 w-8 text-green-600" />,
      href: "/passengers/history",
      color: "bg-green-50 hover:bg-green-100 border border-green-100"
    },
    {
      title: "Notes et avis",
      description: "Lire les évaluations des passagers",
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      href: "/passengers/reviews",
      color: "bg-yellow-50 hover:bg-yellow-100 border border-yellow-100"
    },
    {
      title: "Support client",
      description: "Gérer les demandes d'assistance",
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      href: "/passengers/support",
      color: "bg-purple-50 hover:bg-purple-100 border border-purple-100"
    }
  ]

  const recentActivities = [
    { id: 1, passenger: "Jean Dubois", action: "Nouvelle course", time: "2 min", status: "success" },
    { id: 2, passenger: "Marie Leroy", action: "Ticket support créé", time: "15 min", status: "warning" },
    { id: 3, passenger: "Paul Martin", action: "Avis posté", time: "30 min", status: "info" },
    { id: 4, passenger: "Sophie Bernard", action: "Compte activé", time: "1h", status: "success" },
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total passagers"
          value={stats.total}
          icon={<Users className="h-5 w-5" />}
          color="bg-blue-500"
          trend="+5.2%"
        />
        <StatCard
          title="Actifs"
          value={stats.active}
          icon={<CheckCircle className="h-5 w-5" />}
          color="bg-green-500"
          percentage={Math.round((stats.active / stats.total) * 100)}
        />
        <StatCard
          title="Nouveaux aujourd'hui"
          value={stats.newToday}
          icon={<UserPlus className="h-5 w-5" />}
          color="bg-purple-500"
        />
        <StatCard
          title="VIP"
          value={stats.vip}
          icon={<Star className="h-5 w-5" />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Note moyenne"
          value={stats.averageRating}
          icon={<Star className="h-5 w-5" />}
          color="bg-orange-500"
          isRating={true}
        />
        <StatCard
          title="Tickets support"
          value={stats.supportTickets}
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
              <div className={`${action.color} rounded-xl p-5 transition-all duration-300 cursor-pointer hover:shadow-md`}>
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-white mb-4 shadow-sm">
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <span>Accéder</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Deux colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Passagers récents */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Passagers récents</h2>
            <Link href="/passengers/list" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              Voir tout
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentPassengers.map((passenger) => (
              <div key={passenger.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className={`h-12 w-12 flex-shrink-0 rounded-full flex items-center justify-center text-white font-semibold ${
                    passenger.isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}>
                    {passenger.firstName[0]}{passenger.lastName[0]}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium text-gray-800">
                        {passenger.firstName} {passenger.lastName}
                      </p>
                      {!passenger.isActive && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                          Inactif
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1 space-x-3">
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {passenger.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {passenger.city}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    Inscrit le {new Date(passenger.createdAt).toLocaleDateString()}
                  </div>
                  {passenger.lastLoginAt && (
                    <div className="text-xs text-gray-400 mt-1">
                      Dernière connexion: {new Date(passenger.lastLoginAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activité récente */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Activité récente</h2>
            <Link href="/passengers/history" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              Voir tout
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-100 text-green-600' :
                    activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.status === 'success' ? <CheckCircle className="h-4 w-4" /> :
                     activity.status === 'warning' ? <AlertCircle className="h-4 w-4" /> :
                     <Clock className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.passenger}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>

          {/* Graphique simple */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold text-gray-800 mb-4">Nouveaux passagers (7 jours)</h3>
            <div className="h-32 flex items-end space-x-2">
              {[45, 32, 28, 41, 38, 52, 23].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-8 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                    style={{ height: `${(value / 60) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant StatCard
interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  trend?: string
  percentage?: number
  isRating?: boolean
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  trend,
  percentage,
  isRating = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {isRating ? value.toFixed(1) : value.toLocaleString()}
            {isRating && <span className="text-sm text-gray-500 ml-1">/5</span>}
          </p>
          <div className="flex items-center space-x-2 mt-1">
            {trend && (
              <span className="text-xs font-medium text-green-600">
                {trend}
              </span>
            )}
            {percentage !== undefined && (
              <span className="text-xs text-gray-500">
                ({percentage}%)
              </span>
            )}
          </div>
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassengersContent