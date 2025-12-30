'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MapPin
} from 'lucide-react'
import { DriverProfile, DriverStatus, DriverActivityStatus, UserRole } from '../../../../type'

const DriverList = () => {
  const [drivers, setDrivers] = useState<DriverProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<DriverStatus | 'ALL'>('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const driversPerPage = 10

  useEffect(() => {
    fetchDrivers()
  }, [])

  const fetchDrivers = async () => {
    try {
      // Simulation d'API - utiliser vos types réels
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
            country: 'Côte d\'Ivoire',
            city: 'Abidjan',
            region: 'Abidjan',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          status: DriverStatus.APPROVED,
          licenseNumber: 'AB12345',
          driverType: 'VTC',
          workingHours: '08:00-18:00',
          maxRadius: 50,
          rating: 4.8,
          totalRides: 156,
          totalEarnings: 1250000,
          activityStatus: DriverActivityStatus.ONLINE,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Ajouter plus de chauffeurs...
      ]
      setDrivers(mockDrivers)
    } catch (error) {
      console.error('Error fetching drivers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      driver.user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      driver.user.phone.includes(search) ||
      driver.licenseNumber?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || driver.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage)
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * driversPerPage,
    currentPage * driversPerPage
  )

  const getStatusBadge = (status: DriverStatus) => {
    const statusConfig = {
      [DriverStatus.PENDING]: { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-4 w-4" /> },
      [DriverStatus.APPROVED]: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-4 w-4" /> },
      [DriverStatus.SUSPENDED]: { color: 'bg-red-100 text-red-800', icon: <AlertCircle className="h-4 w-4" /> },
      [DriverStatus.REJECTED]: { color: 'bg-gray-100 text-gray-800', icon: <XCircle className="h-4 w-4" /> }
    }
    return statusConfig[status]
  }

  const getActivityBadge = (status: DriverActivityStatus) => {
    const activityConfig = {
      [DriverActivityStatus.ONLINE]: { color: 'bg-green-100 text-green-800', label: 'En ligne' },
      [DriverActivityStatus.OFFLINE]: { color: 'bg-gray-100 text-gray-800', label: 'Hors ligne' },
      [DriverActivityStatus.ON_RIDE]: { color: 'bg-blue-100 text-blue-800', label: 'En course' }
    }
    return activityConfig[status]
  }

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
              placeholder="Rechercher un chauffeur..."
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as DriverStatus | 'ALL')}
              >
                <option value="ALL">Tous les statuts</option>
                <option value={DriverStatus.PENDING}>En attente</option>
                <option value={DriverStatus.APPROVED}>Approuvé</option>
                <option value={DriverStatus.SUSPENDED}>Suspendu</option>
                <option value={DriverStatus.REJECTED}>Rejeté</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
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
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chauffeur
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activité
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedDrivers.map((driver) => {
              const statusBadge = getStatusBadge(driver.status)
              const activityBadge = getActivityBadge(driver.activityStatus)
              
              return (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 shrink-0 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {driver.user.firstName[0]}{driver.user.lastName[0]}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {driver.user.firstName} {driver.user.lastName}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {driver.user.city}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {driver.user.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {driver.user.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                        {statusBadge.icon}
                        <span className="ml-1.5">{driver.status}</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${activityBadge.color}`}>
                      {activityBadge.label}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">{driver.totalRides}</span>
                        <span className="text-gray-600"> courses</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{driver.rating?.toFixed(1)}/5</span> ★
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Affichage de {(currentPage - 1) * driversPerPage + 1} à {Math.min(currentPage * driversPerPage, filteredDrivers.length)} sur {filteredDrivers.length} chauffeurs
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
    </div>
  )
}

export default DriverList