'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  XCircle, 
  Calendar,
  User,
  Clock,
  AlertTriangle,
  TrendingDown,
  BarChart3,
  Download,
  RefreshCw,
  Eye,
  MessageSquare,
  Users,
  DollarSign,
  MapPin,
  ChevronDown,
  ChevronUp,
  PieChart
} from 'lucide-react'
import { DriverActivityStatus, DriverStatus, Ride, RideStatus, UserRole } from '../../../../type'

interface CancellationAnalysis {
  totalCancellations: number
  todayCancellations: number
  cancellationRate: number
  averageCancellationTime: number // en minutes
  revenueLoss: number
  mostCommonReason: string
  peakCancellationHour: string
}

const Cancellations = () => {
  const [cancelledRides, setCancelledRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })
  const [cancelledByFilter, setCancelledByFilter] = useState<'ALL' | 'CLIENT' | 'DRIVER'>('ALL')
  const [analysis, setAnalysis] = useState<CancellationAnalysis>({
    totalCancellations: 0,
    todayCancellations: 0,
    cancellationRate: 0,
    averageCancellationTime: 0,
    revenueLoss: 0,
    mostCommonReason: '',
    peakCancellationHour: ''
  })
  const [expandedRide, setExpandedRide] = useState<string | null>(null)

  useEffect(() => {
    fetchCancellations()
  }, [])

  const fetchCancellations = async () => {
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
          distanceKm: 14.2,
          durationMinutes: 0,
          baseFare: 2800,
          totalFare: 3200,
          passengerCount: 1,
          status: RideStatus.CANCELED,
          requestedAt: new Date('2024-01-15T08:30:00'),
          acceptedAt: new Date('2024-01-15T08:32:00'),
          canceledAt: new Date('2024-01-15T08:35:00'),
          canceledBy: 'CLIENT',
          cancellationCause: {
            id: '1',
            label: 'Changement de plans',
            description: 'Le client a changé d\'avis',
            active: true,
            category: 'CLIENT'
          },
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
          durationMinutes: 0,
          baseFare: 1500,
          totalFare: 1800,
          passengerCount: 2,
          status: RideStatus.CANCELED,
          requestedAt: new Date('2024-01-15T14:20:00'),
          acceptedAt: new Date('2024-01-15T14:22:00'),
          canceledAt: new Date('2024-01-15T14:25:00'),
          canceledBy: 'DRIVER',
          cancellationCause: {
            id: '2',
            label: 'Problème véhicule',
            description: 'Problème technique avec le véhicule',
            active: true,
            category: 'DRIVER'
          },
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
          status: RideStatus.CANCELED,
          requestedAt: new Date('2024-01-15T18:45:00'),
          canceledAt: new Date('2024-01-15T18:50:00'),
          canceledBy: 'CLIENT',
          cancellationCause: {
            id: '3',
            label: 'Temps d\'attente trop long',
            description: 'Le client a trouvé l\'attente trop longue',
            active: true,
            category: 'SYSTEM'
          },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      setCancelledRides(mockRides)

      // Simulation d'analyse
      setAnalysis({
        totalCancellations: 2588,
        todayCancellations: 23,
        cancellationRate: 15.3,
        averageCancellationTime: 8.5,
        revenueLoss: 4568000,
        mostCommonReason: 'Changement de plans',
        peakCancellationHour: '18h-19h'
      })
    } catch (error) {
      console.error('Error fetching cancellations:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRides = cancelledRides.filter(ride => {
    const matchesSearch = 
      ride.client?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.client?.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.driver?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.driver?.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      ride.pickupAddress?.toLowerCase().includes(search.toLowerCase()) ||
      ride.cancellationCause?.label?.toLowerCase().includes(search.toLowerCase())

    const matchesDate = (!dateRange.start || !ride.canceledAt || 
      new Date(ride.canceledAt) >= new Date(dateRange.start)) &&
      (!dateRange.end || !ride.canceledAt || 
      new Date(ride.canceledAt) <= new Date(dateRange.end))
    
    const matchesCancelledBy = cancelledByFilter === 'ALL' || ride.canceledBy === cancelledByFilter

    return matchesSearch && matchesDate && matchesCancelledBy
  })

  const getTimeDifference = (requestedAt: Date, canceledAt: Date) => {
    const diff = new Date(canceledAt).getTime() - new Date(requestedAt).getTime()
    return Math.floor(diff / 60000) // en minutes
  }

  const cancellationReasons = [
    { reason: 'Changement de plans', count: 45, color: 'bg-blue-500' },
    { reason: 'Temps d\'attente', count: 32, color: 'bg-yellow-500' },
    { reason: 'Problème véhicule', count: 18, color: 'bg-red-500' },
    { reason: 'Chauffeur en retard', count: 12, color: 'bg-orange-500' },
    { reason: 'Autre', count: 23, color: 'bg-gray-500' }
  ]

  const cancellationByHour = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: Math.floor(Math.random() * 20) + 5
  }))

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total annulations</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{analysis.totalCancellations}</p>
              <div className="flex items-center text-sm text-red-600 mt-1">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>-2.3% vs mois dernier</span>
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aujourd'hui</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{analysis.todayCancellations}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux annulation</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{analysis.cancellationRate}%</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Temps moyen</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{analysis.averageCancellationTime} min</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Perte revenue</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {(analysis.revenueLoss / 1000000).toFixed(1)}M XOF
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Raison principale</p>
              <p className="text-lg font-bold text-gray-800 mt-1 truncate">{analysis.mostCommonReason}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Heure de pic</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{analysis.peakCancellationHour}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-emerald-600" />
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
              placeholder="Rechercher par nom, adresse, raison..."
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
              <Users className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={cancelledByFilter}
                onChange={(e) => setCancelledByFilter(e.target.value as any)}
              >
                <option value="ALL">Annulé par</option>
                <option value="CLIENT">Client</option>
                <option value="DRIVER">Chauffeur</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </button>
            
            <button 
              onClick={fetchCancellations}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </button>
          </div>
        </div>

        {/* Liste des annulations */}
        <div className="space-y-4">
          {filteredRides.map((ride) => {
            const timeToCancel = ride.requestedAt && ride.canceledAt 
              ? getTimeDifference(ride.requestedAt, ride.canceledAt)
              : 0
            
            return (
              <div key={ride.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <div 
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setExpandedRide(expandedRide === ride.id ? null : ride.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 flex-shrink-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <XCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Course #{ride.id.substring(0, 8)}</div>
                        <div className="text-sm text-gray-600 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          Annulée le {ride.canceledAt ? new Date(ride.canceledAt).toLocaleString() : 'N/A'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ride.canceledBy === 'CLIENT' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        Par {ride.canceledBy === 'CLIENT' ? 'Client' : 'Chauffeur'}
                      </span>
                      
                      {expandedRide === ride.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Détails expandés */}
                {expandedRide === ride.id && (
                  <div className="border-t p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Colonne gauche */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Informations passager</h4>
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {ride.client?.user?.firstName?.[0]}{ride.client?.user?.lastName?.[0]}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">
                                {ride.client?.user?.firstName} {ride.client?.user?.lastName}
                              </div>
                              <div className="text-sm text-gray-600">{ride.client?.user?.phone}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Trajet</h4>
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
                        </div>
                        
                        {ride.driver && (
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Chauffeur</h4>
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {ride.driver.user?.firstName?.[0]}{ride.driver.user?.lastName?.[0]}
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">
                                  {ride.driver.user?.firstName} {ride.driver.user?.lastName}
                                </div>
                                <div className="text-sm text-gray-600">{ride.driver.user?.phone}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Colonne droite */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Détails annulation</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Raison:</span>
                              <span className="font-medium">{ride.cancellationCause?.label}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Temps avant annulation:</span>
                              <span className="font-medium">{timeToCancel} minutes</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Montant perdu:</span>
                              <span className="font-medium text-red-600">{ride.totalFare?.toLocaleString()} XOF</span>
                            </div>
                            {ride.cancellationCause?.description && (
                              <div className="mt-2 p-3 bg-white rounded-lg border">
                                <p className="text-sm text-gray-700">{ride.cancellationCause.description}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Actions</h4>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center">
                              <Eye className="h-4 w-4 mr-2" />
                              Détails
                            </button>
                            <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contacter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filteredRides.length === 0 && (
          <div className="text-center py-12">
            <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune annulation trouvée</h3>
            <p className="text-gray-600">Aucune annulation ne correspond à vos critères de recherche.</p>
          </div>
        )}

        {/* Analyses */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graphique des raisons */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Répartition par raison</h3>
            <div className="space-y-3">
              {cancellationReasons.map((item) => {
                const total = cancellationReasons.reduce((sum, r) => sum + r.count, 0)
                const percentage = (item.count / total) * 100
                
                return (
                  <div key={item.reason} className="flex items-center">
                    <div className="w-40">
                      <span className="text-sm text-gray-700">{item.reason}</span>
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right">
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                      <span className="text-xs text-gray-500 ml-1">({percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Graphique par heure */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Annulations par heure</h3>
            <div className="h-64 flex items-end space-x-1">
              {cancellationByHour.map((item) => (
                <div key={item.hour} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-4 bg-gradient-to-t from-red-500 to-red-600 rounded-t-lg"
                    style={{ height: `${(item.count / 25) * 150}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {item.hour}h
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Pic d'annulation: 18h-19h</div>
                <div className="text-red-600 font-medium">+25% vs hier</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cancellations