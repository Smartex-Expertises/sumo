'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  DollarSign,
  Users,
  BarChart3,
  Download,
  Calendar,
  Eye,
  MoreVertical,
  TrendingDown,
  PieChart,
  Target,
  RefreshCw,
  CreditCard,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

interface Commission {
  id: string
  rideId: string
  driverId: string
  driverName: string
  amount: number
  platformFee: number
  commissionRate: number
  driverEarnings: number
  date: Date
  status: 'PAID' | 'PENDING' | 'CANCELLED'
}

const Commissions = () => {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'PENDING'>('ALL')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const commissionsPerPage = 10

  useEffect(() => {
    fetchCommissions()
  }, [])

  const fetchCommissions = async () => {
    try {
      // Simulation d'API
      const mockCommissions: Commission[] = [
        {
          id: '1',
          rideId: 'ride1',
          driverId: 'driver1',
          driverName: 'Paul Martin',
          amount: 3200,
          platformFee: 640,
          commissionRate: 20,
          driverEarnings: 2560,
          date: new Date('2024-01-15T09:07:00'),
          status: 'PAID'
        },
        {
          id: '2',
          rideId: 'ride2',
          driverId: 'driver2',
          driverName: 'Sophie Bernard',
          amount: 1800,
          platformFee: 360,
          commissionRate: 20,
          driverEarnings: 1440,
          date: new Date('2024-01-15T14:25:00'),
          status: 'PENDING'
        },
        {
          id: '3',
          rideId: 'ride3',
          driverId: 'driver3',
          driverName: 'Jacques Dupont',
          amount: 2800,
          platformFee: 560,
          commissionRate: 20,
          driverEarnings: 2240,
          date: new Date('2024-01-14T11:30:00'),
          status: 'PAID'
        },
        {
          id: '4',
          rideId: 'ride4',
          driverId: 'driver4',
          driverName: 'Marie Leroy',
          amount: 1500,
          platformFee: 300,
          commissionRate: 20,
          driverEarnings: 1200,
          date: new Date('2024-01-14T16:45:00'),
          status: 'PAID'
        },
        {
          id: '5',
          rideId: 'ride5',
          driverId: 'driver5',
          driverName: 'Thomas Petit',
          amount: 4200,
          platformFee: 840,
          commissionRate: 20,
          driverEarnings: 3360,
          date: new Date('2024-01-13T09:15:00'),
          status: 'PENDING'
        },
        {
          id: '6',
          rideId: 'ride6',
          driverId: 'driver6',
          driverName: 'Julie Moreau',
          amount: 2300,
          platformFee: 460,
          commissionRate: 20,
          driverEarnings: 1840,
          date: new Date('2024-01-13T14:30:00'),
          status: 'PAID'
        }
      ]
      setCommissions(mockCommissions)
    } catch (error) {
      console.error('Error fetching commissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCommissions = commissions.filter(commission => {
    const matchesSearch = 
      commission.driverName.toLowerCase().includes(search.toLowerCase()) ||
      commission.rideId.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || commission.status === statusFilter
    
    const matchesDate = (!dateRange.start || !commission.date || 
      new Date(commission.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || !commission.date || 
      new Date(commission.date) <= new Date(dateRange.end))

    return matchesSearch && matchesStatus && matchesDate
  })

  const totalPages = Math.ceil(filteredCommissions.length / commissionsPerPage)
  const paginatedCommissions = filteredCommissions.slice(
    (currentPage - 1) * commissionsPerPage,
    currentPage * commissionsPerPage
  )

  const calculateStats = () => {
    const totalCommissions = filteredCommissions.reduce((sum, c) => sum + c.platformFee, 0)
    const totalRevenue = filteredCommissions.reduce((sum, c) => sum + c.amount, 0)
    const totalDriverEarnings = filteredCommissions.reduce((sum, c) => sum + c.driverEarnings, 0)
    const paidCommissions = filteredCommissions.filter(c => c.status === 'PAID').length
    const pendingCommissions = filteredCommissions.filter(c => c.status === 'PENDING').length
    const averageCommissionRate = filteredCommissions.length > 0 
      ? filteredCommissions.reduce((sum, c) => sum + c.commissionRate, 0) / filteredCommissions.length
      : 0
    
    return {
      totalCommissions,
      totalRevenue,
      totalDriverEarnings,
      paidCommissions,
      pendingCommissions,
      averageCommissionRate,
      commissionCount: filteredCommissions.length
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total commissions</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {stats.totalCommissions.toLocaleString()} XOF
              </p>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12.5% vs hier</span>
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
              <p className="text-sm text-gray-600">Revenus total</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {stats.totalRevenue.toLocaleString()} XOF
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gains chauffeurs</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {stats.totalDriverEarnings.toLocaleString()} XOF
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux commission</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {stats.averageCommissionRate.toFixed(1)}%
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Payées</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.paidCommissions}</p>
              <div className="text-sm text-gray-600 mt-1">
                {Math.round((stats.paidCommissions / stats.commissionCount) * 100)}% du total
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pendingCommissions}</p>
              <div className="text-sm text-gray-600 mt-1">
                {Math.round((stats.pendingCommissions / stats.commissionCount) * 100)}% du total
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total commissions</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.commissionCount}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Efficacité</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">
                {(stats.totalCommissions / stats.totalRevenue * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <Target className="h-6 w-6 text-indigo-600" />
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
              placeholder="Rechercher par chauffeur, ID course..."
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
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="ALL">Tous les statuts</option>
                <option value="PAID">Payées</option>
                <option value="PENDING">En attente</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </button>
            
            <button 
              onClick={fetchCommissions}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </button>
          </div>
        </div>

        {/* Table des commissions */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chauffeur
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montants
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gains chauffeur
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {paginatedCommissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-mono text-sm text-gray-500">
                      #{commission.rideId.substring(0, 8)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {commission.driverName[0]}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{commission.driverName}</div>
                        <div className="text-sm text-gray-600">ID: {commission.driverId.substring(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {commission.amount.toLocaleString()} XOF
                    </div>
                    <div className="text-sm text-gray-600">Montant course</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="font-medium text-emerald-600">
                        {commission.platformFee.toLocaleString()} XOF
                      </div>
                      <div className="text-sm text-gray-600">
                        {commission.commissionRate}% du total
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-green-600">
                      {commission.driverEarnings.toLocaleString()} XOF
                    </div>
                    <div className="text-sm text-gray-600">
                      ({Math.round((commission.driverEarnings / commission.amount) * 100)}%)
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">
                      {new Date(commission.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(commission.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        commission.status === 'PAID' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {commission.status === 'PAID' ? 'Payée' : 'En attente'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCommissions.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commission trouvée</h3>
            <p className="text-gray-600">Aucune commission ne correspond à vos critères de recherche.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Affichage de {(currentPage - 1) * commissionsPerPage + 1} à {Math.min(currentPage * commissionsPerPage, filteredCommissions.length)} sur {filteredCommissions.length} commissions
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

        {/* Graphiques */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Répartition commissions</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-emerald-500" />
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-green-500" style={{ transform: 'rotate(180deg)' }} />
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {(stats.totalCommissions / stats.totalRevenue * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Taux global</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-600">
                  {stats.totalCommissions.toLocaleString()} XOF
                </div>
                <div className="text-sm text-gray-600">Commissions</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {stats.totalDriverEarnings.toLocaleString()} XOF
                </div>
                <div className="text-sm text-gray-600">Gains chauffeurs</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Top 5 chauffeurs (commissions)</h3>
            <div className="space-y-4">
              {commissions
                .reduce((acc, commission) => {
                  const existing = acc.find(item => item.driverId === commission.driverId)
                  if (existing) {
                    existing.totalCommissions += commission.platformFee
                    existing.totalEarnings += commission.driverEarnings
                  } else {
                    acc.push({
                      driverId: commission.driverId,
                      driverName: commission.driverName,
                      totalCommissions: commission.platformFee,
                      totalEarnings: commission.driverEarnings
                    })
                  }
                  return acc
                }, [] as Array<{driverId: string, driverName: string, totalCommissions: number, totalEarnings: number}>)
                .sort((a, b) => b.totalCommissions - a.totalCommissions)
                .slice(0, 5)
                .map((driver, index) => (
                  <div key={driver.driverId} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center text-white font-semibold ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                        index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                        index === 2 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                        'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{driver.driverName}</div>
                        <div className="text-sm text-gray-600">
                          {driver.totalEarnings.toLocaleString()} XOF gagnés
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-emerald-600">
                        {driver.totalCommissions.toLocaleString()} XOF
                      </div>
                      <div className={`text-sm flex items-center justify-end ${
                        index === 0 ? 'text-yellow-600' :
                        index === 1 ? 'text-gray-600' :
                        index === 2 ? 'text-orange-600' :
                        'text-blue-600'
                      }`}>
                        {index === 0 ? <ChevronUp className="h-4 w-4 mr-1" /> :
                         index === 1 ? <ChevronUp className="h-4 w-4 mr-1" /> :
                         <ChevronUp className="h-4 w-4 mr-1" />}
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Import pour CheckCircle et Clock
import { CheckCircle, Clock } from 'lucide-react'

export default Commissions