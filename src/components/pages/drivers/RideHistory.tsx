'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Navigation,
  TrendingUp,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { api } from '@/lib/api'

type RideStatus = 'ALL' | 'REQUESTED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED'

interface Ride {
  id: string
  status: string
  pickupAddress: string
  destinationAddress: string
  distanceKm: number | null
  durationMinutes: number | null
  totalFare: number
  driverEarnings: number | null
  passengerCount: number
  requestedAt: string | null
  completedAt: string | null
  createdAt: string
  client: {
    id: string
    user: { firstName: string; lastName: string; phone: string; email: string }
  } | null
  driver: {
    id: string
    rating: number
    user: { firstName: string; lastName: string; phone: string }
  } | null
  rating: { score: number; comment: string | null } | null
}

interface RidesResponse {
  rides: Ride[]
  pagination: { total: number; page: number; limit: number; pages: number }
}

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  REQUESTED:   { color: 'bg-blue-100 text-blue-800',   label: 'Demandée' },
  ACCEPTED:    { color: 'bg-purple-100 text-purple-800', label: 'Acceptée' },
  IN_PROGRESS: { color: 'bg-yellow-100 text-yellow-800', label: 'En cours' },
  COMPLETED:   { color: 'bg-green-100 text-green-800',  label: 'Terminée' },
  CANCELED:    { color: 'bg-red-100 text-red-800',      label: 'Annulée' },
}

const RideHistory = () => {
  const [rides, setRides]           = useState<Ride[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [search, setSearch]         = useState('')
  const [statusFilter, setStatusFilter] = useState<RideStatus>('ALL')
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal]           = useState(0)

  const fetchRides = useCallback(async (currentPage = 1) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: '20',
        ...(statusFilter !== 'ALL' ? { status: statusFilter } : {}),
        ...(search.trim() ? { search: search.trim() } : {}),
      })
      const res = await api.get<RidesResponse>(`/admin/dashboard/rides?${params}`)
      setRides(Array.isArray(res.rides) ? res.rides : [])
      setTotalPages(res.pagination?.pages ?? 1)
      setTotal(res.pagination?.total ?? 0)
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des courses')
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search])

  useEffect(() => {
    setPage(1)
    fetchRides(1)
  }, [statusFilter])

  const handleSearch = () => {
    setPage(1)
    fetchRides(1)
  }

  const changePage = (next: number) => {
    setPage(next)
    fetchRides(next)
  }

  const completedRides = rides.filter(r => r.status === 'COMPLETED')
  const totalRevenue   = completedRides.reduce((s, r) => s + (r.totalFare || 0), 0)
  const avgRating      = (() => {
    const rated = rides.filter(r => r.rating?.score != null)
    if (!rated.length) return null
    return rated.reduce((s, r) => s + (r.rating?.score ?? 0), 0) / rated.length
  })()

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
        <button onClick={() => fetchRides(page)} className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200 text-sm font-medium">
          <RefreshCw className="h-4 w-4" /> Réessayer
        </button>
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
              <p className="text-2xl font-bold text-gray-800 mt-1">{total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Terminées (page)</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{completedRides.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenus (page)</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {totalRevenue.toLocaleString()} FCFA
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
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {avgRating != null ? `${avgRating.toFixed(1)}/5` : '—'}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <StarIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par client, adresse..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Chercher
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as RideStatus)}
            >
              <option value="ALL">Tous les statuts</option>
              <option value="REQUESTED">Demandées</option>
              <option value="ACCEPTED">Acceptées</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="COMPLETED">Terminées</option>
              <option value="CANCELED">Annulées</option>
            </select>

            <button
              onClick={() => fetchRides(page)}
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
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chauffeur</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trajet</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détails</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rides.map((ride) => {
                const statusConf = STATUS_CONFIG[ride.status] ?? { color: 'bg-gray-100 text-gray-700', label: ride.status }
                return (
                  <tr key={ride.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-mono text-sm text-gray-500 mb-1">#{ride.id.substring(0, 8)}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {ride.requestedAt
                          ? new Date(ride.requestedAt).toLocaleDateString('fr-FR')
                          : new Date(ride.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {ride.client?.user ? `${ride.client.user.firstName} ${ride.client.user.lastName}` : '—'}
                      </div>
                      <div className="text-sm text-gray-500">{ride.client?.user?.phone ?? ''}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {ride.driver?.user ? `${ride.driver.user.firstName} ${ride.driver.user.lastName}` : '—'}
                      </div>
                      <div className="text-sm text-gray-500">{ride.driver?.user?.phone ?? ''}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-green-500 mt-0.5 mr-1 shrink-0" />
                          <span className="text-sm">{ride.pickupAddress}</span>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-red-500 mt-0.5 mr-1 shrink-0" />
                          <span className="text-sm">{ride.destinationAddress}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Navigation className="h-4 w-4 mr-1 text-gray-400" />
                          {ride.distanceKm != null ? `${Number(ride.distanceKm).toFixed(1)} km` : '—'}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {ride.durationMinutes != null ? `${ride.durationMinutes} min` : '—'}
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1 text-gray-400" />
                          {ride.passengerCount} passager(s)
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {(ride.totalFare || 0).toLocaleString()} FCFA
                      </div>
                      {ride.driverEarnings != null && (
                        <div className="text-sm text-gray-500">
                          Gain: {ride.driverEarnings.toLocaleString()} FCFA
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {ride.rating ? (
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm font-medium">{ride.rating.score}/5</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConf.color}`}>
                        {statusConf.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {rides.length === 0 && (
          <div className="text-center py-12">
            <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune course trouvée</h3>
            <p className="text-gray-600">Aucune course ne correspond à vos critères.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Page {page} sur {totalPages} — {total} courses au total
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => changePage(page - 1)}
                disabled={page <= 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => changePage(page + 1)}
                disabled={page >= totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default RideHistory
