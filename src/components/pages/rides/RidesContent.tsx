'use client'

import React, { useState, useEffect } from 'react'
import { 
  Car, 
  List, 
  Clock, 
  TrendingUp,
  XCircle,
  MapPin,
  DollarSign,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Navigation,
  Calendar,
  BarChart3,
  Activity
} from 'lucide-react'
import { DriverActivityStatus, DriverStatus, Ride, RideStatus, UserRole } from '../../../../type'
import Link from 'next/link'

interface RideStats {
  total: number
  active: number
  completed: number
  canceled: number
  revenue: number
  averageRating: number
  averageDistance: number
}

const RidesContent = () => {
  const [stats, setStats] = useState<RideStats>({
    total: 0,
    active: 0,
    completed: 0,
    canceled: 0,
    revenue: 0,
    averageRating: 0,
    averageDistance: 0
  })

  const [activeRides, setActiveRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRidesData()
  }, [])

  const fetchRidesData = async () => {
    try {
      // Simulation d'API
      setStats({
        total: 12456,
        active: 18,
        completed: 9850,
        canceled: 2588,
        revenue: 45268000,
        averageRating: 4.7,
        averageDistance: 12.3
      })

      // Simulation de courses actives
      const mockActiveRides: Ride[] = [
        {
          id: '1',
          clientId: 'client1',
          client: {
            id: 'client1',
            userId: 'user1',
            user: {
              id: 'user1',
              firstName: 'Jean',
              lastName: 'Dubois',
              phone: '+225 07 00 11 22',
              email: 'jean@example.com',
              passwordHash: '',
              role: 'CLIENT' as UserRole,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            loyaltyPoints: 150,
            vipStatus: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          driverId: 'driver1',
          driver: {
            id: 'driver1',
            userId: 'driverUser1',
            user: {
              id: 'driverUser1',
              firstName: 'Paul',
              lastName: 'Martin',
              phone: '+225 07 88 99 00',
              email: 'paul@example.com',
              passwordHash: '',
              role: 'DRIVER' as UserRole,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            status: 'APPROVED' as DriverStatus ,
            totalRides: 245,
            totalEarnings: 1950000,
            activityStatus: 'ONLINE' as DriverActivityStatus,
            rating: 4.9,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          pickupAddress: 'Plateau, Tour B',
          destinationAddress: 'Cocody, Riviera',
          pickupLatitude: 5.320357,
          pickupLongitude: -4.016107,
          destinationLatitude: 5.360146,
          destinationLongitude: -3.950837,
          distanceKm: 8.2,
          durationMinutes: 15,
          baseFare: 1800,
          totalFare: 2000,
          driverEarnings: 1600,
          platformFee: 400,
          passengerCount: 1,
          status: RideStatus.IN_PROGRESS,
          requestedAt: new Date('2024-01-15T14:30:00'),
          acceptedAt: new Date('2024-01-15T14:32:00'),
          startedAt: new Date('2024-01-15T14:35:00'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          clientId: 'client2',
          client: {
            id: 'client2',
            userId: 'user2',
            user: {
              id: 'user2',
              firstName: 'Marie',
              lastName: 'Leroy',
              phone: '+225 07 33 44 55',
              email: 'marie@example.com',
              passwordHash: '',
              role: 'CLIENT' as UserRole,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            loyaltyPoints: 320,
            vipStatus: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          driverId: 'driver2',
          driver: {
            id: 'driver2',
            userId: 'driverUser2',
            user: {
              id: 'driverUser2',
              firstName: 'Sophie',
              lastName: 'Bernard',
              phone: '+225 07 22 33 44',
              email: 'sophie@example.com',
              passwordHash: '',
              role: 'DRIVER' as UserRole,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            status: 'APPROVED' as DriverStatus,
            totalRides: 189,
            totalEarnings: 1520000,
            activityStatus: 'ONLINE' as DriverActivityStatus,
            rating: 4.8,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          pickupAddress: 'Yopougon, Marché',
          destinationAddress: 'Abobo, Gare',
          distanceKm: 12.5,
          durationMinutes: 28,
          totalFare: 2800,
          passengerCount: 2,
          status: RideStatus.ACCEPTED,
          requestedAt: new Date('2024-01-15T14:45:00'),
          acceptedAt: new Date('2024-01-15T14:47:00'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      setActiveRides(mockActiveRides)
    } catch (error) {
      console.error('Error fetching rides data:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: "Liste des courses",
      description: "Voir toutes les courses historiques",
      icon: <List className="h-8 w-8 text-blue-600" />,
      href: "/rides/list",
      color: "bg-blue-50 hover:bg-blue-100 border border-blue-100"
    },
    {
      title: "Courses en cours",
      description: "Surveiller les trajets actifs",
      icon: <Activity className="h-8 w-8 text-green-600" />,
      href: "/rides/active",
      color: "bg-green-50 hover:bg-green-100 border border-green-100"
    },
    {
      title: "Gestion annulations",
      description: "Analyser les annulations",
      icon: <XCircle className="h-8 w-8 text-red-600" />,
      href: "/rides/cancellations",
      color: "bg-red-50 hover:bg-red-100 border border-red-100"
    },
    {
      title: "Statistiques",
      description: "Analyser les performances",
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      href: "/rides/analytics",
      color: "bg-purple-50 hover:bg-purple-100 border border-purple-100"
    }
  ]

  const recentActivities = [
    { id: 1, ride: "TRIP789", action: "Course complétée", time: "2 min", status: "success" },
    { id: 2, ride: "TRIP790", action: "Course acceptée", time: "5 min", status: "info" },
    { id: 3, ride: "TRIP791", action: "Course annulée", time: "10 min", status: "warning" },
    { id: 4, ride: "TRIP792", action: "Nouvelle demande", time: "15 min", status: "info" },
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <StatCard
          title="Total courses"
          value={stats.total}
          icon={<Car className="h-5 w-5" />}
          color="bg-blue-500"
          trend="+12.5%"
        />
        <StatCard
          title="En cours"
          value={stats.active}
          icon={<Activity className="h-5 w-5" />}
          color="bg-green-500"
        />
        <StatCard
          title="Terminées"
          value={stats.completed}
          icon={<CheckCircle className="h-5 w-5" />}
          color="bg-emerald-500"
          percentage={Math.round((stats.completed / stats.total) * 100)}
        />
        <StatCard
          title="Annulées"
          value={stats.canceled}
          icon={<XCircle className="h-5 w-5" />}
          color="bg-red-500"
        />
        <StatCard
          title="Revenus total"
          value={stats.revenue}
          icon={<DollarSign className="h-5 w-5" />}
          color="bg-yellow-500"
          isCurrency={true}
        />
        <StatCard
          title="Note moyenne"
          value={stats.averageRating}
          icon={<StarIcon className="h-5 w-5" />}
          color="bg-orange-500"
          isRating={true}
        />
        <StatCard
          title="Distance moy."
          value={stats.averageDistance}
          icon={<Navigation className="h-5 w-5" />}
          color="bg-purple-500"
          isDistance={true}
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
        {/* Courses en cours */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Courses en cours</h2>
            <Link href="/rides/active" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              Voir tout
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {activeRides.map((ride) => (
              <div key={ride.id} className="p-4 hover:bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Car className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-800">Course #{ride.id.substring(0, 8)}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {ride.requestedAt && new Date(ride.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    ride.status === RideStatus.IN_PROGRESS ? 'bg-green-100 text-green-800' :
                    ride.status === RideStatus.ACCEPTED ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ride.status === RideStatus.IN_PROGRESS ? 'En cours' :
                     ride.status === RideStatus.ACCEPTED ? 'Acceptée' :
                     'En attente'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span className="text-sm">{ride.pickupAddress}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                    <span className="text-sm">{ride.destinationAddress}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-800">
                      {ride.passengerCount}
                    </div>
                    <div className="text-xs text-gray-600">Passagers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-800">
                      {ride.distanceKm?.toFixed(1)} km
                    </div>
                    <div className="text-xs text-gray-600">Distance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-800">
                      {ride.totalFare?.toLocaleString()} XOF
                    </div>
                    <div className="text-xs text-gray-600">Montant</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activité récente et graphique */}
        <div className="space-y-6">
          {/* Activité récente */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Activité récente</h2>
              <Link href="/rides/list" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
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
                      <p className="font-medium text-gray-800">{activity.ride}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Graphique courses par heure */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Courses par heure (Aujourd'hui)</h3>
            <div className="h-48 flex items-end space-x-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-6 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                    style={{ height: `${Math.random() * 80 + 20}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {i + 6}h
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Pic d'activité: 17h-18h</div>
                <div className="text-blue-600 font-medium">+18% vs hier</div>
              </div>
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
  isCurrency?: boolean
  isRating?: boolean
  isDistance?: boolean
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  trend,
  percentage,
  isCurrency = false,
  isRating = false,
  isDistance = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {isCurrency ? `${(value / 1000000).toFixed(1)}M` :
             isRating ? value.toFixed(1) :
             isDistance ? `${value.toFixed(1)} km` :
             value.toLocaleString()}
            {isCurrency && <span className="text-sm text-gray-500 ml-1">XOF</span>}
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

// Composant Star
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default RidesContent