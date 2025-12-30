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
  BarChart3,
  Eye,
  MessageSquare,
  MoreVertical,
  Car
} from 'lucide-react'
import { DriverActivityStatus, DriverStatus, Ride, RideStatus, UserRole } from '../../../../type'

const RidesList = () => {
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<RideStatus | 'ALL'>('ALL')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const ridesPerPage = 10

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
          distanceKm: 8.5,
          durationMinutes: 18,
          baseFare: 1500,
          totalFare: 1800,
          passengerCount: 2,
          status: RideStatus.CANCELED,
          canceledAt: new Date('2024-01-14T14:20:00'),
          canceledBy: 'CLIENT',
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
      ride.driver?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.driver?.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.pickupAddress?.toLowerCase().includes(search.toLowerCase()) ||
      ride.destinationAddress?.toLowerCase().includes(search.toLowerCase()) ||
      ride.id.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || ride.status === statusFilter
    
    const matchesDate = (!dateRange.start || !ride.requestedAt || 
      new Date(ride.requestedAt) >= new Date(dateRange.start)) &&
      (!dateRange.end || !ride.requestedAt || 
      new Date(ride.requestedAt) <= new Date(dateRange.end))

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusConfig = (status: RideStatus) => {
    const config = {
      [RideStatus.REQUESTED]: { 
        color: 'bg-blue-100 text-blue-800', 
        icon: <Clock className="h-4 w-4" />,
        label: 'Demandée'
      },
      [RideStatus.ACCEPTED]: { 
        color: 'bg-purple-100 text-purple-800', 
        icon: <CheckCircle className="h-4 w-4" />,
        label: 'Acceptée'
      },
      [RideStatus.IN_PROGRESS]: { 
        color: 'bg-yellow-100 text-yellow-800', 
        icon: <Navigation className="h-4 w-4" />,
        label: 'En cours'
      },
      [RideStatus.COMPLETED]: { 
        color: 'bg-green-100 text-green-800', 
        icon: <CheckCircle className="h-4 w-4" />,
        label: 'Terminée'
      },
      [RideStatus.CANCELED]: { 
        color: 'bg-red-100 text-red-800', 
        icon: <XCircle className="h-4 w-4" />,
        label: 'Annulée'
      }
    }
    return config[status]
  }

  const totalPages = Math.ceil(filteredRides.length / ridesPerPage)
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * ridesPerPage,
    currentPage * ridesPerPage
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header avec filtres */}
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, adresse, ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
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
                <option value={RideStatus.ACCEPTED}>Acceptées</option>
                <option value={RideStatus.REQUESTED}>Demandées</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
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
                Chauffeur
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
            {paginatedRides.map((ride) => {
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
                      <div className="h-10 w-10 shrink-0 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
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
                    {ride.driver ? (
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 shrink-0 bg-linear-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {ride.driver.user?.firstName?.[0]}{ride.driver.user?.lastName?.[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {ride.driver.user?.firstName} {ride.driver.user?.lastName}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            {ride.driver.rating?.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Non assigné</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                        <span className="text-sm truncate max-w-[150px]">{ride.pickupAddress}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                        <span className="text-sm truncate max-w-[150px]">{ride.destinationAddress}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
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
                      {statusConfig.icon}
                      <span className="ml-1.5">{statusConfig.label}</span>
                    </span>
                    {ride.canceledAt && ride.canceledBy && (
                      <div className="text-xs text-gray-500 mt-1">
                        Par: {ride.canceledBy}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filteredRides.length === 0 && (
        <div className="text-center py-12">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune course trouvée</h3>
          <p className="text-gray-600">Aucune course ne correspond à vos critères de recherche.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Affichage de {(currentPage - 1) * ridesPerPage + 1} à {Math.min(currentPage * ridesPerPage, filteredRides.length)} sur {filteredRides.length} courses
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Précédent
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="p-6 border-t bg-gray-50">
        <h3 className="font-semibold text-gray-800 mb-4">Statistiques du filtre</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-600">Courses totales</div>
            <div className="text-2xl font-bold text-gray-800">{filteredRides.length}</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-600">Montant total</div>
            <div className="text-2xl font-bold text-emerald-600">
              {filteredRides.reduce((sum, ride) => sum + (ride.totalFare || 0), 0).toLocaleString()} XOF
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-600">Distance moyenne</div>
            <div className="text-2xl font-bold text-blue-600">
              {(filteredRides.reduce((sum, ride) => sum + (ride.distanceKm || 0), 0) / filteredRides.length || 0).toFixed(1)} km
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-600">Taux annulation</div>
            <div className="text-2xl font-bold text-red-600">
              {Math.round((filteredRides.filter(r => r.status === RideStatus.CANCELED).length / filteredRides.length || 0) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RidesList