'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Navigation, 
  MapPin,
  Clock,
  User,
  Phone,
  Car,
  Users,
  DollarSign,
  Eye,
  MessageSquare,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  TrendingUp,
  Activity,
  Shield,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { DriverActivityStatus, DriverStatus, Ride, RideStatus, UserRole, VehicleStatus } from '../../../../type'

const ActiveRides = () => {
  const [activeRides, setActiveRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'IN_PROGRESS' | 'ACCEPTED' | 'REQUESTED'>('ALL')
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    fetchActiveRides()
    
    if (autoRefresh) {
      const interval = setInterval(fetchActiveRides, 30000) // Refresh toutes les 30 secondes
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const fetchActiveRides = async () => {
    try {
      // Simulation d'API
      const mockRides: Ride[] = [
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
            status: 'APPROVED' as DriverStatus,
            totalRides: 245,
            totalEarnings: 1950000,
            activityStatus: 'ON_RIDE' as DriverActivityStatus,
            rating: 4.9,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          vehicleId: 'vehicle1',
          vehicle: {
            id: 'vehicle1',
            driverId: 'driver1',
            driver: {} as any,
            plateNumber: 'AB-123-CD',
            brand: 'Toyota',
            model: 'Corolla',
            color: 'Blanc',
            year: 2022,
            capacity: 4,
            status: "IN_USE" as VehicleStatus,
            verified: true,
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
          updatedAt: new Date(),
          trackingPoints: [
            {
              id: 'tp1',
              rideId: '1',
              ride: {} as any,
              latitude: 5.321,
              longitude: -4.015,
              speed: 45,
              heading: 120,
              accuracy: 10,
              timestamp: new Date('2024-01-15T14:40:00')
            }
          ]
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
        },
        {
          id: '3',
          clientId: 'client3',
          client: {
            id: 'client3',
            userId: 'user3',
            user: {
              id: 'user3',
              firstName: 'Thomas',
              lastName: 'Petit',
              phone: '+225 07 66 77 88',
              email: 'thomas@example.com',
              passwordHash: '',
              role: 'CLIENT' as UserRole,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            loyaltyPoints: 85,
            vipStatus: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          pickupAddress: 'Marcory, Zone 4',
          destinationAddress: 'Treichville, Gare',
          distanceKm: 6.3,
          totalFare: 1500,
          passengerCount: 1,
          status: RideStatus.REQUESTED,
          requestedAt: new Date('2024-01-15T14:50:00'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      setActiveRides(mockRides)
    } catch (error) {
      console.error('Error fetching active rides:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRides = activeRides.filter(ride => {
    const matchesSearch = 
      ride.client?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.client?.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.driver?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.driver?.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.pickupAddress?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = filterStatus === 'ALL' || ride.status === filterStatus

    return matchesSearch && matchesStatus
  })

const getStatusConfig = (status: RideStatus) => {
  const config: Record<RideStatus, {
    color: string;
    bgColor: string;
    icon: React.ReactNode;
    label: string;
    description: string;
  }> = {
    [RideStatus.REQUESTED]: { 
      color: 'bg-blue-100 text-blue-800',
      bgColor: 'bg-blue-50',
      icon: <Clock className="h-5 w-5" />,
      label: 'En attente',
      description: 'En attente d\'un chauffeur'
    },
    [RideStatus.ACCEPTED]: { 
      color: 'bg-purple-100 text-purple-800',
      bgColor: 'bg-purple-50',
      icon: <User className="h-5 w-5" />,
      label: 'Acceptée',
      description: 'Chauffeur en route'
    },
    [RideStatus.IN_PROGRESS]: { 
      color: 'bg-green-100 text-green-800',
      bgColor: 'bg-green-50',
      icon: <Navigation className="h-5 w-5" />,
      label: 'En cours',
      description: 'Trajet en cours'
    },
    [RideStatus.COMPLETED]: { 
      color: 'bg-emerald-100 text-emerald-800',
      bgColor: 'bg-emerald-50',
      icon: <CheckCircle className="h-5 w-5" />,
      label: 'Terminée',
      description: 'Course terminée'
    },
    [RideStatus.CANCELED]: { 
      color: 'bg-red-100 text-red-800',
      bgColor: 'bg-red-50',
      icon: <XCircle className="h-5 w-5" />,
      label: 'Annulée',
      description: 'Course annulée'
    }
  }
  
  return config[status]
}

  const calculateStats = () => {
    const inProgress = activeRides.filter(r => r.status === RideStatus.IN_PROGRESS).length
    const accepted = activeRides.filter(r => r.status === RideStatus.ACCEPTED).length
    const requested = activeRides.filter(r => r.status === RideStatus.REQUESTED).length
    const waitingTime = requested * 5 // Simulation en minutes
    
    return {
      total: activeRides.length,
      inProgress,
      accepted,
      requested,
      waitingTime
    }
  }

  const stats = calculateStats()

  const handleRefresh = () => {
    setLoading(true)
    fetchActiveRides()
  }

  const handleContactPassenger = (rideId: string) => {
    const ride = activeRides.find(r => r.id === rideId)
    if (ride?.client?.user?.phone) {
      window.open(`tel:${ride.client.user.phone}`, '_blank')
    }
  }

  const handleContactDriver = (rideId: string) => {
    const ride = activeRides.find(r => r.id === rideId)
    if (ride?.driver?.user?.phone) {
      window.open(`tel:${ride.driver.user.phone}`, '_blank')
    }
  }

  const handleViewMap = (rideId: string) => {
    const ride = activeRides.find(r => r.id === rideId)
    if (ride?.pickupLatitude && ride?.pickupLongitude) {
      const url = `https://www.google.com/maps?q=${ride.pickupLatitude},${ride.pickupLongitude}`
      window.open(url, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats et contrôles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Courses actives</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.inProgress}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Navigation className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Acceptées</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.accepted}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <User className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.requested}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Temps attente moy.</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{stats.waitingTime} min</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, adresse..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="ALL">Tous les statuts</option>
                <option value={RideStatus.IN_PROGRESS}>En cours</option>
                <option value={RideStatus.ACCEPTED}>Acceptées</option>
                <option value={RideStatus.REQUESTED}>En attente</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRefresh}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Rafraîchir"
              >
                <RefreshCw className="h-5 w-5 text-gray-500" />
              </button>
              
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-2 rounded-lg ${autoRefresh ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                title={autoRefresh ? 'Auto-rafraîchissement activé' : 'Auto-rafraîchissement désactivé'}
              >
                {autoRefresh ? (
                  <PlayCircle className="h-5 w-5" />
                ) : (
                  <PauseCircle className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Cartes des courses actives */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRides.map((ride) => {
            const statusConfig = getStatusConfig(ride.status)
            const elapsedTime = ride.startedAt 
              ? Math.floor((new Date().getTime() - new Date(ride.startedAt).getTime()) / 60000)
              : 0
            
            return (
              <div key={ride.id} className={`border rounded-xl p-5 ${statusConfig.bgColor} hover:shadow-lg transition-shadow`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${statusConfig.color}`}>
                      {statusConfig.icon}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-800">Course #{ride.id.substring(0, 8)}</h3>
                      <p className="text-sm text-gray-600">{statusConfig.description}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>

                {/* Détails passager */}
                <div className="mb-4 p-3 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {ride.client?.user?.firstName?.[0]}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-800">
                          {ride.client?.user?.firstName} {ride.client?.user?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{ride.client?.user?.phone}</div>
                      </div>
                    </div>
                    {ride.client?.vipStatus && (
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        VIP
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                      <span className="text-sm">{ride.pickupAddress}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                      <span className="text-sm">{ride.destinationAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Détails chauffeur */}
                {ride.driver && (
                  <div className="mb-4 p-3 bg-white rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {ride.driver.user?.firstName?.[0]}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-800">
                            {ride.driver.user?.firstName} {ride.driver.user?.lastName}
                          </div>
                          <div className="text-xs text-gray-500">{ride.driver.user?.phone}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        Note: {ride.driver.rating?.toFixed(1)}
                      </div>
                    </div>
                    
                    {ride.vehicle && (
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <Car className="h-4 w-4 mr-2" />
                        <span>{ride.vehicle.brand} {ride.vehicle.model} - {ride.vehicle.plateNumber}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Métriques */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-sm font-medium text-gray-800">
                      {ride.distanceKm?.toFixed(1)} km
                    </div>
                    <div className="text-xs text-gray-600">Distance</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-sm font-medium text-gray-800">
                      {ride.passengerCount}
                    </div>
                    <div className="text-xs text-gray-600">Passagers</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-sm font-medium text-gray-800">
                      {ride.totalFare?.toLocaleString()} XOF
                    </div>
                    <div className="text-xs text-gray-600">Montant</div>
                  </div>
                </div>

                {/* Timer et progression */}
                {ride.status === RideStatus.IN_PROGRESS && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progression</span>
                      <span>{elapsedTime} min</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${Math.min(elapsedTime * 3, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewMap(ride.id)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Carte
                  </button>
                  
                  <button
                    onClick={() => handleContactPassenger(ride.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Contacter passager"
                  >
                    <Phone className="h-4 w-4 text-blue-600" />
                  </button>
                  
                  {ride.driver && (
                    <button
                      onClick={() => handleContactDriver(ride.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Contacter chauffeur"
                    >
                      <Phone className="h-4 w-4 text-green-600" />
                    </button>
                  )}
                  
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredRides.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune course active</h3>
            <p className="text-gray-600">Aucune course ne correspond à vos critères de recherche.</p>
          </div>
        )}

        {/* Carte en temps réel (simplifiée) */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Carte en temps réel</h3>
            <span className="text-sm text-green-600 flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              {activeRides.filter(r => r.status === RideStatus.IN_PROGRESS).length} courses en cours
            </span>
          </div>
          
          <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200 flex items-center justify-center relative overflow-hidden">
            {/* Points sur la carte */}
            {activeRides
              .filter(r => r.status === RideStatus.IN_PROGRESS && r.pickupLatitude)
              .map((ride, index) => (
                <div
                  key={ride.id}
                  className="absolute h-4 w-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"
                  style={{
                    left: `${30 + (index * 20)}%`,
                    top: `${40 + (index * 10)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-white px-2 py-1 rounded shadow-sm">
                    #{ride.id.substring(0, 6)}
                  </div>
                </div>
              ))}
            
            <div className="text-center">
              <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Visualisation des courses en temps réel</p>
              <p className="text-sm text-gray-500 mt-2">
                {activeRides.filter(r => r.status === RideStatus.IN_PROGRESS).length} véhicules en mouvement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveRides