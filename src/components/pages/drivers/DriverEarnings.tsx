'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Users,
  Award
} from 'lucide-react'
import { DriverActivityStatus, DriverProfile, DriverStatus, PaymentMethod, UserRole  } from '../../../../type'

const DriverEarnings = () => {
  const [drivers, setDrivers] = useState<DriverProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState('month')
  const [sortBy, setSortBy] = useState('earnings')

  useEffect(() => {
    fetchDriverEarnings()
  }, [])

  const fetchDriverEarnings = async () => {
    try {
      // Simulation d'API
      const mockDrivers: DriverProfile[] = [
        {
          id: '1',
          userId: 'user1',
          user: {
            id: 'user1',
            firstName: 'Jean',
            lastName: 'Dupont',
            phone: '+225 07 00 00 00',
            email: 'jean@example.com',
            passwordHash: '',
            role: 'DRIVER' as UserRole,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          status: 'APPROVED' as DriverStatus,
          totalRides: 156,
          totalEarnings: 1250000,
          activityStatus: 'ONLINE' as DriverActivityStatus,
          rating: 4.8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Ajouter plus de chauffeurs...
      ]
      setDrivers(mockDrivers)
    } catch (error) {
      console.error('Error fetching driver earnings:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDrivers = drivers.filter(driver =>
    driver.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    driver.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    driver.user?.phone?.includes(search)
  )

  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    switch (sortBy) {
      case 'earnings':
        return b.totalEarnings - a.totalEarnings
      case 'rides':
        return b.totalRides - a.totalRides
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      case 'name':
        return a.user?.lastName?.localeCompare(b.user?.lastName || '')
      default:
        return 0
    }
  })

  const calculateStats = () => {
    const totalEarnings = drivers.reduce((sum, driver) => sum + driver.totalEarnings, 0)
    const avgEarnings = drivers.length > 0 ? totalEarnings / drivers.length : 0
    const totalRides = drivers.reduce((sum, driver) => sum + driver.totalRides, 0)
    const topDriver = drivers.length > 0 
      ? drivers.reduce((max, driver) => driver.totalEarnings > max.totalEarnings ? driver : max)
      : null

    return {
      totalEarnings,
      avgEarnings,
      totalRides,
      topDriver,
      driversCount: drivers.length,
      avgRating: 4.5
    }
  }

  const stats = calculateStats()

  const paymentMethodsData = [
    { method: PaymentMethod.CASH, percentage: 45, amount: 562500, color: 'bg-green-500' },
    { method: PaymentMethod.MOBILE_MONEY, percentage: 35, amount: 437500, color: 'bg-blue-500' },
    { method: PaymentMethod.CREDIT_CARD, percentage: 15, amount: 187500, color: 'bg-purple-500' },
    { method: PaymentMethod.WALLET, percentage: 5, amount: 62500, color: 'bg-yellow-500' }
  ]

  const getPeriodLabel = (period: string) => {
    const periods: Record<string, string> = {
      'day': 'Aujourd\'hui',
      'week': 'Cette semaine',
      'month': 'Ce mois',
      'quarter': 'Ce trimestre',
      'year': 'Cette année'
    }
    return periods[period] || period
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
      {/* Stats principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenus totaux</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {stats.totalEarnings.toLocaleString()} XOF
              </p>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12.5% vs mois dernier</span>
              </div>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenu moyen/chauffeur</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {Math.round(stats.avgEarnings).toLocaleString()} XOF
              </p>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8.3%</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Courses totales</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.totalRides}</p>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+15.2%</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Top chauffeur</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {stats.topDriver?.user?.firstName?.charAt(0)}.{stats.topDriver?.user?.lastName}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {stats.topDriver?.totalEarnings?.toLocaleString()} XOF
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles et filtres */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un chauffeur..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="day">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="quarter">Ce trimestre</option>
                <option value="year">Cette année</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="earnings">Par revenus</option>
                <option value="rides">Par nombre de courses</option>
                <option value="rating">Par note</option>
                <option value="name">Par nom</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Graphique des revenus */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800">Évolution des revenus</h3>
              <span className="text-sm text-gray-600">{getPeriodLabel(period)}</span>
            </div>
            <div className="h-64 flex items-end space-x-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-6 bg-gradient-to-t from-emerald-500 to-emerald-600 rounded-t-lg"
                    style={{ height: `${Math.random() * 150 + 50}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Graphique des méthodes de paiement */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-6">Méthodes de paiement</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                {paymentMethodsData.map((item, index, array) => {
                  const previousPercentage = array.slice(0, index).reduce((sum, i) => sum + i.percentage, 0)
                  const rotation = (previousPercentage / 100) * 360
                  
                  return (
                    <div
                      key={item.method}
                      className="absolute top-0 left-0 w-full h-full rounded-full"
                      style={{
                        background: `conic-gradient(
                          ${item.color.replace('bg-', '')} 0% ${item.percentage}%,
                          transparent ${item.percentage}% 100%
                        )`,
                        transform: `rotate(${rotation}deg)`
                      }}
                    />
                  )
                })}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {paymentMethodsData.map((item) => (
                <div key={item.method} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${item.color} mr-3`} />
                    <span className="text-sm text-gray-700">
                      {item.method === PaymentMethod.CASH && 'Espèces'}
                      {item.method === PaymentMethod.MOBILE_MONEY && 'Mobile Money'}
                      {item.method === PaymentMethod.CREDIT_CARD && 'Carte bancaire'}
                      {item.method === PaymentMethod.WALLET && 'Portefeuille'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.percentage}%</div>
                    <div className="text-sm text-gray-600">
                      {item.amount.toLocaleString()} XOF
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table des revenus */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chauffeur
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenus totaux
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenus (30j)
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedDrivers.map((driver) => {
                const monthlyEarnings = Math.round(driver.totalEarnings * 0.3) // Simulation
                
                return (
                  <tr key={driver.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {driver.user?.firstName?.[0]}{driver.user?.lastName?.[0]}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {driver.user?.firstName} {driver.user?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {driver.user?.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        driver.activityStatus === 'ONLINE' 
                          ? 'bg-green-100 text-green-800'
                          : driver.activityStatus === 'ON_RIDE'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {driver.activityStatus === 'ONLINE' && 'En ligne'}
                        {driver.activityStatus === 'ON_RIDE' && 'En course'}
                        {driver.activityStatus === 'OFFLINE' && 'Hors ligne'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{driver.totalRides}</div>
                      <div className="text-sm text-gray-500">courses</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Math.floor(driver.rating || 0)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {driver.rating?.toFixed(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-emerald-600">
                        {driver.totalEarnings.toLocaleString()} XOF
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">
                          {monthlyEarnings.toLocaleString()} XOF
                        </div>
                        <div className="flex items-center text-sm">
                          {monthlyEarnings > 100000 ? (
                            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span className={monthlyEarnings > 100000 ? 'text-green-600' : 'text-red-600'}>
                            {monthlyEarnings > 100000 ? '+15%' : '-5%'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                        Détails
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {sortedDrivers.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun chauffeur trouvé</h3>
            <p className="text-gray-600">Aucun chauffeur ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DriverEarnings