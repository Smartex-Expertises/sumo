'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Navigation,
  User,
  Star,
  ExternalLink,
  Download,
  BarChart3
} from 'lucide-react'
import { DriverActivityStatus, DriverStatus, Ride, RideStatus, UserRole } from '../../../../type'

const PassengerRideHistory = () => {
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<RideStatus | 'ALL'>('ALL')
  const [passengerFilter, setPassengerFilter] = useState('')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })

  useEffect(() => {
    fetchRides()
  }, [])

  const fetchRides = async () => {
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
          distanceKm: 14.2,
          durationMinutes: 32,
          baseFare: 2800,
          totalFare: 3200,
          driverEarnings: 2560,
          platformFee: 640,
          passengerCount: 1,
          status: RideStatus.COMPLETED,
          requestedAt: new Date('2024-01-15T08:30:00'),
          acceptedAt: new Date('2024-01-15T08:32:00'),
          startedAt: new Date('2024-01-15T08:35:00'),
          completedAt: new Date('2024-01-15T09:07:00'),
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
          pickupAddress: 'Yopougon, Marché',
          destinationAddress: 'Abobo, Gare',
          distanceKm: 8.5,
          durationMinutes: 18,
          baseFare: 1500,
          totalFare: 1800,
          passengerCount: 2,
          status: RideStatus.CANCELED,
          canceledAt: new Date('2024-01-14T14:20:00'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      setRides(mockRides)
    } catch (error) {
      console.error('Error fetching rides:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRides = rides.filter(ride => {
    const matchesSearch = 
      ride.client?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.client?.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.pickupAddress?.toLowerCase().includes(search.toLowerCase()) ||
      ride.destinationAddress?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || ride.status === statusFilter
    
    const matchesPassenger = !passengerFilter || 
      ride.client?.user?.id === passengerFilter
    
    const matchesDate = (!dateRange.start || !ride.requestedAt || 
      new Date(ride.requestedAt) >= new Date(dateRange.start)) &&
      (!dateRange.end || !ride.requestedAt || 
      new Date(ride.requestedAt) <= new Date(dateRange.end))

    return matchesSearch && matchesStatus && matchesPassenger && matchesDate
  })

  const getStatusConfig = (status: RideStatus) => {
    const config = {
      [RideStatus.REQUESTED]: { 
        color: 'bg-blue-100 text-blue-800', 
        label: 'Demandée'
      },
      [RideStatus.ACCEPTED]: { 
        color: 'bg-purple-100 text-purple-800', 
        label: 'Acceptée'
      },
      [RideStatus.IN_PROGRESS]: { 
        color: 'bg-yellow-100 text-yellow-800', 
        label: 'En cours'
      },
      [RideStatus.COMPLETED]: { 
        color: 'bg-green-100 text-green-800', 
        label: 'Terminée'
      },
      [RideStatus.CANCELED]: { 
        color: 'bg-red-100 text-red-800', 
        label: 'Annulée'
      }
    }
    return config[status]
  }

  const calculateStats = () => {
    const completedRides = rides.filter(r => r.status === RideStatus.COMPLETED)
    const canceledRides = rides.filter(r => r.status === RideStatus.CANCELED)
    const totalRevenue = completedRides.reduce((sum, ride) => sum + (ride.totalFare || 0), 0)
    
    return {
      totalRides: rides.length,
      completedRides: completedRides.length,
      canceledRides: canceledRides.length,
      totalRevenue,
      avgRating: 4.7,
      avgDistance: 12.8 // km
    }
  }

  const stats = calculateStats()
  const uniquePassengers = Array.from(new Set(rides.map(r => r.client?.user?.id))).length

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total courses</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalRides}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Terminées</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.completedRides}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Annulées</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.canceledRides}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenus total</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {stats.totalRevenue.toLocaleString()} XOF
              </p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Passagers uniques</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{uniquePassengers}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <User className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
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
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[180px]"
                value={passengerFilter}
                onChange={(e) => setPassengerFilter(e.target.value)}
              >
                <option value="">Tous les passagers</option>
                {Array.from(new Set(rides.map(r => r.client?.user?.id))).map(id => {
                  const passenger = rides.find(r => r.client?.user?.id === id)?.client?.user
                  return passenger ? (
                    <option key={id} value={id}>
                      {passenger.firstName} {passenger.lastName}
                    </option>
                  ) : null
                })}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
              <span className="text-gray-500">à</span>
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as RideStatus | 'ALL')}
              >
                <option value="ALL">Tous les statuts</option>
                <option value={RideStatus.COMPLETED}>Terminées</option>
                <option value={RideStatus.CANCELED}>Annulées</option>
                <option value={RideStatus.IN_PROGRESS}>En cours</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>

        {/* Table des courses */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passager
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trajet
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Détails
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRides.map((ride) => {
                const statusConfig = getStatusConfig(ride.status)
                
                return (
                  <tr key={ride.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-mono text-sm text-gray-500 mb-1">
                        #{ride.id.substring(0, 8)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {ride.requestedAt ? new Date(ride.requestedAt).toLocaleDateString() : 'N/A'}
                      </div>
                      {ride.completedAt && (
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(ride.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {ride.client?.user?.firstName?.[0]}{ride.client?.user?.lastName?.[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {ride.client?.user?.firstName} {ride.client?.user?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {ride.client?.user?.phone}
                          </div>
                          {ride.client?.vipStatus && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              VIP
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                          <span className="text-sm">{ride.pickupAddress}</span>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                          <span className="text-sm">{ride.destinationAddress}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {ride.driver && (
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="truncate">{ride.driver.user?.firstName} {ride.driver.user?.lastName}</span>
                          </div>
                        )}
                        <div className="flex items-center text-sm">
                          <Navigation className="h-4 w-4 mr-2 text-gray-400" />
                          {ride.distanceKm?.toFixed(1)} km
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {ride.durationMinutes} min
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          {ride.passengerCount} passager(s)
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">
                          {ride.totalFare?.toLocaleString()} XOF
                        </div>
                        {ride.platformFee && (
                          <div className="text-sm text-gray-500">
                            Frais: {ride.platformFee?.toLocaleString()} XOF
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                      {ride.canceledAt && (
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(ride.canceledAt).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <ExternalLink className="h-4 w-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredRides.length === 0 && (
          <div className="text-center py-12">
            <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune course trouvée</h3>
            <p className="text-gray-600">Aucune course ne correspond à vos critères de recherche.</p>
          </div>
        )}

        {/* Graphiques */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Courses par statut</h3>
            <div className="space-y-3">
              {Object.entries(RideStatus).map(([key, status]) => {
                const count = rides.filter(r => r.status === status).length
                const percentage = rides.length > 0 ? (count / rides.length) * 100 : 0
                
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{key}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Courses par heure</h3>
            <div className="h-48 flex items-end space-x-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-6 bg-gradient-to-t from-green-500 to-green-600 rounded-t-lg"
                    style={{ height: `${Math.random() * 80 + 20}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {i + 6}h
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

export default PassengerRideHistory