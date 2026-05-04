'use client'

import React, { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Users,
  Award,
  RefreshCw,
} from 'lucide-react'
import { api } from '@/lib/api'

interface Driver {
  id: string
  status: string
  activityStatus: string
  rating: number
  totalRides: number
  totalEarnings: number
  user: {
    firstName: string
    lastName: string
    phone: string
    email: string
  }
}

interface DriversResponse {
  drivers: Driver[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

const DriverEarnings = () => {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('earnings')

  useEffect(() => {
    fetchDriverEarnings()
  }, [])

  const fetchDriverEarnings = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get<DriversResponse>('/admin/drivers?limit=100&status=APPROVED')
      setDrivers(Array.isArray(res.drivers) ? res.drivers : [])
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement')
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
      case 'earnings': return b.totalEarnings - a.totalEarnings
      case 'rides':    return b.totalRides - a.totalRides
      case 'rating':   return (b.rating || 0) - (a.rating || 0)
      case 'name':     return (a.user?.lastName || '').localeCompare(b.user?.lastName || '')
      default:         return 0
    }
  })

  const totalEarnings = drivers.reduce((s, d) => s + (d.totalEarnings || 0), 0)
  const avgEarnings   = drivers.length > 0 ? totalEarnings / drivers.length : 0
  const totalRides    = drivers.reduce((s, d) => s + (d.totalRides || 0), 0)
  const topDriver     = drivers.length > 0
    ? drivers.reduce((max, d) => (d.totalEarnings > max.totalEarnings ? d : max))
    : null

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600 gap-3">
        <p>{error}</p>
        <button onClick={fetchDriverEarnings} className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200 text-sm font-medium">
          <RefreshCw className="h-4 w-4" /> Réessayer
        </button>
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
                {totalEarnings.toLocaleString()} FCFA
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
              <p className="text-sm text-gray-600">Revenu moyen/chauffeur</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {Math.round(avgEarnings).toLocaleString()} FCFA
              </p>
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
              <p className="text-2xl font-bold text-purple-600 mt-1">{totalRides}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Top chauffeur</p>
              <p className="text-lg font-bold text-orange-600 mt-1">
                {topDriver ? `${topDriver.user?.firstName} ${topDriver.user?.lastName}` : '—'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {topDriver?.totalEarnings?.toLocaleString()} FCFA
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres + table */}
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

          <div className="flex items-center gap-3">
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

            <button
              onClick={fetchDriverEarnings}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              title="Actualiser"
            >
              <RefreshCw className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chauffeur</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenus totaux</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedDrivers.map((driver) => (
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
                        <div className="text-sm text-gray-500">{driver.user?.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      driver.activityStatus === 'ONLINE'   ? 'bg-green-100 text-green-800' :
                      driver.activityStatus === 'ON_RIDE'  ? 'bg-blue-100 text-blue-800'  :
                                                             'bg-gray-100 text-gray-800'
                    }`}>
                      {driver.activityStatus === 'ONLINE'  ? 'En ligne' :
                       driver.activityStatus === 'ON_RIDE' ? 'En course' : 'Hors ligne'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{driver.totalRides}</div>
                    <div className="text-sm text-gray-500">courses</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(star => (
                        <svg key={star} className={`h-4 w-4 ${star <= Math.floor(driver.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm font-medium">{driver.rating?.toFixed(1) ?? '—'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-emerald-600">
                      {(driver.totalEarnings || 0).toLocaleString()} FCFA
                    </div>
                    {driver.totalRides > 0 && (
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        {driver.totalEarnings > 100000
                          ? <TrendingUp className="h-3 w-3 text-green-600" />
                          : <TrendingDown className="h-3 w-3 text-red-600" />}
                        {Math.round(driver.totalEarnings / driver.totalRides).toLocaleString()} FCFA/course
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedDrivers.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun chauffeur trouvé</h3>
            <p className="text-gray-600">Aucun chauffeur approuvé ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DriverEarnings
