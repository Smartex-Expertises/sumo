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
  TrendingUp
} from 'lucide-react'
import { Ride, RideStatus, UserRole } from '../../../../type'

const RideHistory = () => {
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<RideStatus | 'ALL'>('ALL')
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
              firstName: 'Marie',
              lastName: 'Dubois',
              phone: '+225 07 11 22 33',
              email: 'marie@example.com',
              passwordHash: '',
              role: 'CLIENT' as UserRole,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            loyaltyPoints: 0,
            vipStatus: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          pickupAddress: 'Plateau, Abidjan',
          destinationAddress: 'Cocody, Abidjan',
          pickupLatitude: 5.320357,
          pickupLongitude: -4.016107,
          destinationLatitude: 5.360146,
          destinationLongitude: -3.950837,
          distanceKm: 12.5,
          durationMinutes: 25,
          baseFare: 2500,
          totalFare: 3000,
          driverEarnings: 2400,
          platformFee: 600,
          passengerCount: 1,
          status: RideStatus.COMPLETED,
          requestedAt: new Date('2024-01-15T08:30:00'),
          acceptedAt: new Date('2024-01-15T08:32:00'),
          startedAt: new Date('2024-01-15T08:35:00'),
          completedAt: new Date('2024-01-15T09:00:00'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Ajouter plus de courses...
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
    const totalRevenue = completedRides.reduce((sum, ride) => sum + (ride.totalFare || 0), 0)
    const avgRating = 4.7 // À calculer à partir des données réelles
    
    return {
      totalRides: rides.length,
      completedRides: completedRides.length,
      totalRevenue,
      avgRating,
      avgDuration: 28, // minutes
      avgDistance: 14.2 // km
    }
  }

  const stats = calculateStats()

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total courses</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalRides}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
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
              <p className="text-sm text-gray-600">Note moyenne</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.avgRating}/5</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-purple-600" />
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
              placeholder="Rechercher par client, adresse..."
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
              </select>
            </div>
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
                  Client
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
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {ride.client?.user?.firstName} {ride.client?.user?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {ride.client?.user?.phone}
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
                        <div className="text-sm text-gray-500">
                          Gain: {ride.driverEarnings?.toLocaleString()} XOF
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
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

        {/* Graphiques (simplifiés) */}
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
            <h3 className="font-semibold text-gray-800 mb-4">Évolution quotidienne</h3>
            <div className="h-48 flex items-end space-x-2">
              {/* Graphique simplifié */}
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-8 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                    style={{ height: `${Math.random() * 80 + 20}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i]}
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

// Composant Star pour les notes
const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default RideHistory