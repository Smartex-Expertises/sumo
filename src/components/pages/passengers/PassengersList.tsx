'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  User,
  Calendar,
  TrendingUp,
  Eye,
  MessageSquare,
  Ban
} from 'lucide-react'
import { User as UserType, UserRole } from '../../../../type'

const PassengersList = () => {
  const [passengers, setPassengers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'rides'>('recent')
  const [currentPage, setCurrentPage] = useState(1)
  const passengersPerPage = 10

  useEffect(() => {
    fetchPassengers()
  }, [])

  const fetchPassengers = async () => {
    try {
      // Simulation d'API
      const mockPassengers: UserType[] = [
        {
          id: '1',
          firstName: 'Jean',
          lastName: 'Dubois',
          phone: '+225 07 00 11 22',
          email: 'jean@example.com',
          passwordHash: '',
          role: UserRole.CLIENT,
          isActive: true,
          country: 'Côte d\'Ivoire',
          city: 'Abidjan',
          region: 'Plateau',
          lastLoginAt: new Date('2024-01-15T08:30:00'),
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date()
        },
        // Ajouter plus de passagers...
      ]
      setPassengers(mockPassengers)
    } catch (error) {
      console.error('Error fetching passengers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPassengers = passengers.filter(passenger => {
    const matchesSearch = 
      passenger.firstName.toLowerCase().includes(search.toLowerCase()) ||
      passenger.lastName.toLowerCase().includes(search.toLowerCase()) ||
      passenger.phone.includes(search) ||
      passenger.email.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = 
      statusFilter === 'ALL' || 
      (statusFilter === 'ACTIVE' && passenger.isActive) ||
      (statusFilter === 'INACTIVE' && !passenger.isActive)

    return matchesSearch && matchesStatus
  })

  const sortedPassengers = [...filteredPassengers].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'name':
        return a.lastName.localeCompare(b.lastName)
      case 'rides':
        // À implémenter avec les vraies données
        return 0
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedPassengers.length / passengersPerPage)
  const paginatedPassengers = sortedPassengers.slice(
    (currentPage - 1) * passengersPerPage,
    currentPage * passengersPerPage
  )

  const handleSuspend = (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir suspendre ce passager ?')) {
      // API call
      console.log('Suspend passenger:', userId)
    }
  }

  const handleActivate = (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir activer ce passager ?')) {
      // API call
      console.log('Activate passenger:', userId)
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header avec filtres */}
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un passager..."
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
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="ALL">Tous les statuts</option>
                <option value="ACTIVE">Actifs</option>
                <option value="INACTIVE">Inactifs</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="recent">Plus récents</option>
                <option value="name">Par nom</option>
                <option value="rides">Par nombre de courses</option>
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
                Passager
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Localisation
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Métriques
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedPassengers.map((passenger) => (
              <tr key={passenger.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center text-white font-semibold ${
                      passenger.isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                        : 'bg-gradient-to-r from-gray-400 to-gray-500'
                    }`}>
                      {passenger.firstName[0]}{passenger.lastName[0]}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {passenger.firstName} {passenger.lastName}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Inscrit le {new Date(passenger.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-900">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {passenger.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {passenger.email}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">{passenger.city}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {passenger.region}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    {passenger.isActive ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                        Actif
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="h-4 w-4 mr-1.5" />
                        Inactif
                      </span>
                    )}
                  </div>
                  {passenger.lastLoginAt && (
                    <div className="text-xs text-gray-500 mt-1">
                      Dernière connexion: {new Date(passenger.lastLoginAt).toLocaleTimeString()}
                    </div>
                  )}
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">156</span>
                      <span className="text-gray-600 ml-1">courses</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 mr-2 text-yellow-400" />
                      <span className="font-medium">4.8</span>
                      <span className="text-gray-600 ml-1">/5</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Voir le profil"
                    >
                      <Eye className="h-4 w-4 text-blue-600" />
                    </button>
                    
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Contacter"
                    >
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    </button>
                    
                    {passenger.isActive ? (
                      <button 
                        onClick={() => handleSuspend(passenger.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Suspendre"
                      >
                        <Ban className="h-4 w-4 text-red-600" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleActivate(passenger.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Activer"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </button>
                    )}
                    
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Affichage de {(currentPage - 1) * passengersPerPage + 1} à {Math.min(currentPage * passengersPerPage, filteredPassengers.length)} sur {filteredPassengers.length} passagers
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

export default PassengersList